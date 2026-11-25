/**
 * PulmoVision X-AI: Explainable Deep Learning System for Chest Radiography
 * Backend Server - High-Performance Clinical Diagnostics & REST API
 * 
 * Government Hydro Engineering College (GHEC), Bandla, Himachal Pradesh
 * Department of Computer Science & Engineering (AI & DS)
 * Supervisor: Dr. Ravi Kumar | Lead: Aman & Team
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { spawn, execSync } = require('child_process');

const PORT = process.env.PORT || 5000;
const PYTHON_PORT = process.env.INFERENCE_PORT || 5050;

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8'
};

// Clinical Presets database
const PRESETS = [
  {
    id: 'case_460_pneumo',
    name: 'Case #460: Right Acute Tension Pneumothorax',
    category: 'Pneumothorax (Severe)',
    split: 'SIIM-ACR Test Set (#460)',
    imageUrl: '/static/samples/sample_xray_pneumo.png',
    overlayUrl: '/static/samples/sample_overlay_pneumo.png',
    hasGroundTruth: true,
    groundTruth: {
      condition: 'Pneumothorax',
      isPneumonia: true,
      hasLesion: true,
      diceScore: 0.952,
      iouScore: 0.908,
      lesionLocation: 'Right apical and lateral pleural space',
      severity: 'High (Immediate Decompression Required)',
      maskBox: { x: 25, y: 16, width: 22, height: 26 } // Percentage bounding box
    },
    clinicalHistory: '38-year-old male presenting with sudden onset acute right pleuritic chest pain and progressive dyspnea following blunt chest trauma.',
    classification: {
      label: 'PNEUMONIA / ACUTE THORACIC OPACITY',
      confidence: 97.4,
      normalProb: 2.6,
      diseaseProb: 97.4,
      gradCamRegion: 'Right apical-middle pleural boundary with mediastinal contralateral shift'
    },
    segmentation: {
      dice: 0.952,
      iou: 0.908,
      lesionAreaPixels: 35840,
      lungAreaPercentage: 16.4,
      thresholdUsed: 0.3,
      minAreaFilter: 600,
      status: 'Positive Lesion Detected'
    },
    radiologyReport: {
      findings: 'A large right-sided pneumothorax is visualized with extensive pleural air separation measuring up to 4.2 cm at the apex. Partial compressive atelectasis of the right middle and upper lung lobes is present. No significant mediastinal shift is noted on this projection, though clinical monitoring for tension physiology is strongly recommended. Left lung field is well-expanded and clear of focal infiltrates. Cardiomediastinal silhouette is within normal limits. Trachea remains midline. Diaphragmatic contours are sharp.',
      impression: '1. Prominent right-sided pneumothorax with apical collapse (~16.4% pleural space volume).\n2. Compressive atelectasis in the adjacent right lung parenchyma.\n3. Left lung normal; urgent thoracic surgery / chest tube thoracostomy consultation indicated.',
      keyPoints: [
        'Large right apical pneumothorax (DSC = 0.952)',
        'Right lung partial compression atelectasis',
        'Contralateral lung clear, heart size normal',
        'Triage: Immediate Clinical Priority (STAT)'
      ],
      attentionWeights: {
        alpha_global: 0.603,
        beta_local: 0.338,
        gamma_context: 0.060
      }
    }
  },
  {
    id: 'case_normal_adult',
    name: 'Case #N204: Normal Healthy Adult Radiograph',
    category: 'Normal Scan',
    split: 'Kaggle Kermany / Indiana Univ Open-I Test Set',
    imageUrl: '/static/samples/sample_normal_xray.png',
    overlayUrl: null,
    hasGroundTruth: true,
    groundTruth: {
      condition: 'Normal',
      isPneumonia: false,
      hasLesion: false,
      diceScore: 1.0,
      iouScore: 1.0,
      lesionLocation: 'None (Pleural cavities intact)',
      severity: 'Normal / Healthy',
      maskBox: null
    },
    clinicalHistory: '45-year-old female presenting for routine pre-operative screening evaluation prior to elective orthopedic procedure. Non-smoker, asymptomatic.',
    classification: {
      label: 'NORMAL',
      confidence: 98.6,
      normalProb: 98.6,
      diseaseProb: 1.4,
      gradCamRegion: 'Diffuse bilateral clear lung fields with normal vascular arborization'
    },
    segmentation: {
      dice: 1.0,
      iou: 1.0,
      lesionAreaPixels: 0,
      lungAreaPercentage: 0.0,
      thresholdUsed: 0.3,
      minAreaFilter: 600,
      status: 'No Lesion / Normal Pleura'
    },
    radiologyReport: {
      findings: 'The lungs are clear bilaterally. There is no evidence of focal consolidation, vascular congestion, or interstitial edema. The cardiomediastinal silhouette and hilar contours are within normal limits for age and body habitus. Both costophrenic and cardiophrenic angles are sharp and well-defined. No pleural effusion or pneumothorax is identified. The osseous structures of the thorax show no acute fracture or destructive osseous lesion.',
      impression: 'No acute cardiopulmonary disease. Normal posteroanterior (PA) chest radiograph.',
      keyPoints: [
        'Lungs are clear bilaterally without infiltrates',
        'No pneumothorax or pleural effusion',
        'Normal cardiac silhouette and mediastinum',
        'Triage: Routine / Cleared'
      ],
      attentionWeights: {
        alpha_global: 0.685,
        beta_local: 0.265,
        gamma_context: 0.050
      }
    }
  },
  {
    id: 'case_lobar_pneumonia',
    name: 'Case #P882: Acute Bacterial Lobar Pneumonia',
    category: 'Pneumonia (Consolidation)',
    split: 'Kaggle Chest X-Ray Images (Cell 2018 Test Set)',
    imageUrl: '/static/samples/sample_pneumonia_xray.png',
    overlayUrl: null,
    hasGroundTruth: true,
    groundTruth: {
      condition: 'Bacterial Pneumonia',
      isPneumonia: true,
      hasLesion: false,
      diceScore: 1.0,
      iouScore: 1.0,
      lesionLocation: 'Right middle and lower lobe consolidation with air bronchograms',
      severity: 'Moderate to Severe (Antibiotic Therapy Warranted)',
      maskBox: null
    },
    clinicalHistory: '62-year-old male with productive purulent cough, high fever (39.1°C), tachypnea, and leukocytosis (WBC 16,500/μL) over the past 4 days.',
    classification: {
      label: 'PNEUMONIA',
      confidence: 96.8,
      normalProb: 3.2,
      diseaseProb: 96.8,
      gradCamRegion: 'Dense focal airspace opacification in the right lower hemithorax obscuring the hemidiaphragmatic margin'
    },
    segmentation: {
      dice: 1.0,
      iou: 1.0,
      lesionAreaPixels: 0,
      lungAreaPercentage: 0.0,
      thresholdUsed: 0.3,
      minAreaFilter: 600,
      status: 'No Pneumothorax Pleural Separation'
    },
    radiologyReport: {
      findings: 'There is a marked focal opacity with dense consolidation located within the right mid-to-lower lung zone, containing prominent air bronchograms consistent with alveolar airspace disease. The right hemidiaphragmatic contour is partially obscured (positive silhouette sign). The left lung field remains clear without focal infiltrate or effusion. Cardiac size is within normal limits. No pneumothorax is identified.',
      impression: '1. Dense right mid-to-lower lobe alveolar consolidation consistent with community-acquired acute bacterial pneumonia.\n2. No evidence of accompanying pleural effusion or pneumothorax.',
      keyPoints: [
        'Dense right mid/lower lobe consolidation (Pneumonia prob: 96.8%)',
        'Air bronchograms with silhouette sign present',
        'No pneumothorax or large pleural effusion',
        'Triage: Urgent Medical Inpatient / Outpatient Management'
      ],
      attentionWeights: {
        alpha_global: 0.542,
        beta_local: 0.408,
        gamma_context: 0.050
      }
    }
  },
  {
    id: 'case_782_pneumo',
    name: 'Case #782: Left Apical Tension Pneumothorax',
    category: 'Pneumothorax (Focal)',
    split: 'SIIM-ACR Test Set (#782)',
    imageUrl: '/static/samples/sample_xray_pneumo.png',
    overlayUrl: '/static/samples/sample_overlay_pneumo.png',
    hasGroundTruth: true,
    groundTruth: {
      condition: 'Pneumothorax',
      isPneumonia: true,
      hasLesion: true,
      diceScore: 0.937,
      iouScore: 0.882,
      lesionLocation: 'Left apex along the superior pleural cupula',
      severity: 'Moderate',
      maskBox: { x: 52, y: 18, width: 20, height: 16 }
    },
    clinicalHistory: '24-year-old tall, slender male presenting with sudden onset left-sided chest pain while at rest. History of spontaneous primary pneumothorax.',
    classification: {
      label: 'PNEUMONIA / ACUTE THORACIC OPACITY',
      confidence: 94.2,
      normalProb: 5.8,
      diseaseProb: 94.2,
      gradCamRegion: 'Left apical pleural border and sharp visceral pleural line'
    },
    segmentation: {
      dice: 0.937,
      iou: 0.882,
      lesionAreaPixels: 24320,
      lungAreaPercentage: 11.2,
      thresholdUsed: 0.3,
      minAreaFilter: 600,
      status: 'Positive Lesion Detected'
    },
    radiologyReport: {
      findings: 'A distinct thin visceral pleural line is noted at the left pulmonary apex with peripheral absence of vascular lung markings, compatible with a moderate spontaneous left pneumothorax. Maximum apical separation measures approximately 2.8 cm. The right lung is fully expanded and clear. Mediastinal structures are stable without shift. Heart size is normal. Bony thorax is intact.',
      impression: '1. Left apical pneumothorax measuring 2.8 cm (~11.2% volumetric displacement).\n2. No tension signs or contralateral mediastinal shift on this radiograph.',
      keyPoints: [
        'Left apical pneumothorax (DSC = 0.937)',
        'Absence of peripheral lung markings in left cupula',
        'Mediastinum midline; no signs of tension collapse',
        'Triage: High Priority'
      ],
      attentionWeights: {
        alpha_global: 0.582,
        beta_local: 0.361,
        gamma_context: 0.057
      }
    }
  }
];

// Comprehensive benchmark metrics from the actual notebooks
const METRICS = {
  classification: {
    model: 'EfficientNetV2-S (Pretrained on ImageNet, Fine-Tuned with Dropout 0.3)',
    dataset: 'Kaggle Chest X-Ray Images (Pneumonia - Kermany et al.)',
    totalSamples: 5856,
    testSamples: 624,
    metrics: {
      accuracy: '93.11%',
      balancedAccuracy: '91.58%',
      macroF1: '92.48%',
      weightedF1: '93.12%',
      aucRoc: '0.9840'
    },
    confusionMatrix: {
      labels: ['NORMAL', 'PNEUMONIA'],
      matrix: [
        [199, 35],  // Normal: 199 TP, 35 FN (85% recall)
        [8, 382]   // Pneumonia: 382 TP, 8 FP (98% recall)
      ],
      support: { normal: 234, pneumonia: 390 }
    },
    perClassMetrics: [
      { class: 'NORMAL', precision: 0.96, recall: 0.85, f1: 0.90, support: 234 },
      { class: 'PNEUMONIA', precision: 0.92, recall: 0.98, f1: 0.95, support: 390 }
    ],
    improvements: [
      'Fixed validation strategy using stratified 80/10/10 split instead of noisy 16-image Kaggle default',
      'WeightedRandomSampler and weighted BCE loss compensating for 3:1 Pneumonia:Normal imbalance',
      'Grad-CAM backpropagation layer targeted at top conv block for anatomical heatmaps'
    ]
  },
  segmentation: {
    model: 'UNet++ (Nested UNet) + EfficientNet-B3 Backbone with scSE Attention',
    dataset: 'SIIM-ACR Pneumothorax Segmentation Dataset (vbookshelf)',
    totalImages: 10675,
    testImages: 1068,
    positivePrevalence: '22.3%',
    lossFunction: 'Compound Loss (0.5 * Dice Loss + 0.5 * Soft BCE With Logits)',
    metricsComparison: [
      { metric: 'Dice (mean per image)', default: '0.8249', tuned: '0.8407', diff: '+0.0158' },
      { metric: 'Dice (positives only)', default: '0.3867', tuned: '0.3652', diff: '-0.0215' },
      { metric: 'IoU (mean per image)', default: '0.8063', tuned: '0.8246', diff: '+0.0183' },
      { metric: 'IoU (positives only)', default: '0.3031', tuned: '0.2929', diff: '-0.0102' },
      { metric: 'Dice (global/micro)', default: '0.5872', tuned: '0.6080', diff: '+0.0208' },
      { metric: 'Pixel Precision', default: '0.7426', tuned: '0.6955', diff: '-0.0471' },
      { metric: 'Pixel Recall (Sensitivity)', default: '0.4856', tuned: '0.5400', diff: '+0.0544' },
      { metric: 'Pixel Specificity', default: '0.9995', tuned: '0.9993', diff: '-0.0002' },
      { metric: 'Image Accuracy', default: '0.8961', tuned: '0.8858', diff: '-0.0103' },
      { metric: 'Image Sensitivity', default: '0.7059', tuned: '0.5672', diff: '-0.1387' },
      { metric: 'Image Specificity', default: '0.9506', tuned: '0.9771', diff: '+0.0265' },
      { metric: 'Image F1 Score', default: '0.7517', tuned: '0.6888', diff: '-0.0629' }
    ],
    bestParams: {
      threshold: 0.3,
      minAreaPx: 600,
      tta: 'Horizontal Flip Test-Time Augmentation'
    }
  },
  captioning: {
    model: 'Dual-Branch (Global Swin-T + Local Dense CNN) -> Adaptive Attention Gate (α, β, γ) -> DistilGPT-2',
    dataset: 'Indiana University Chest X-Rays (Open-I / Raddar)',
    totalImages: 7466,
    keptFrontalOnly: 3818,
    uniquePatients: 3851,
    testImages: 379,
    testSetScores: {
      bleu1: '0.2469 - 0.3230',
      bleu2: '0.1445 - 0.2043',
      bleu3: '0.0912 - 0.1439',
      bleu4: '0.0613 - 0.1080',
      meteor: '0.2348 - 0.2899',
      rougeL: '0.2894 - 0.2888'
    },
    learnedAttentionGates: {
      alphaGlobal: { name: 'α (Global Branch - Swin-T)', mean: 0.6028, role: 'Captures bilateral lung volume, mediastinal width, and diaphragm shape' },
      betaLocal: { name: 'β (Local Branch - Dense CNN)', mean: 0.3375, role: 'Captures focal infiltrates, pleural separation lines, and micro-nodules' },
      gammaContext: { name: 'γ (Context / Prior Branch)', mean: 0.0597, role: 'Stabilizes grammatical coherence and clinical sentence structure' },
      sum: 1.0000
    }
  }
};

// Project Details & Team Information
const PROJECT_INFO = {
  title: 'Explainable Deep Learning System for Chest Radiographs',
  subtitle: 'Multimodal Disease Classification, Lesion Segmentation & Automated Radiology Report Generation',
  academicDetails: {
    institute: 'Government Hydro Engineering College, Bandla, Himachal Pradesh (GHEC)',
    department: 'Department of Computer Science & Engineering',
    programme: 'B.Tech. Computer Science & Engineering (Artificial Intelligence & Data Science)',
    semester: '7th Semester',
    projectType: 'Major Project (Final Year)'
  },
  supervisor: {
    name: 'Dr. Ravi Kumar',
    designation: 'Assistant Professor, Department of Computer Science & Engineering',
    institute: 'Government Hydro Engineering College, Bandla, Himachal Pradesh',
    role: 'Project Supervisor & Research Mentor',
    image: '/static/team/dr_ravi_kumar.jpg',
    bio: 'Guiding advanced research in Explainable Artificial Intelligence (XAI), Medical Computer Vision, and Trustworthy Deep Learning systems for healthcare diagnostics.'
  },
  team: [
    {
      name: 'Aman',
      rollNo: '23010503008',
      role: 'Lead Deep Learning Engineer & Full-Stack Architect',
      image: '/static/team/aman.jpg',
      bio: 'Architected the multimodal deep learning pipelines, unified inference system, and responsive clinical web interface. Specialized in computer vision backbones and explainability mechanics.',
      links: {
        linkedin: 'https://www.linkedin.com/in/aman-verma-214ba9304/',
        github: 'https://github.com/aman5123',
        email: 'amanvrma089@gmail.com'
      }
    },
    {
      name: 'Samriti',
      rollNo: '23010503053',
      role: 'Segmentation & Medical Image Processing Lead',
      image: '/static/team/samriti.jpg',
      bio: 'Engineered the UNet++ architecture with EfficientNet-B3 encoder and scSE attention mechanisms. Spearheaded threshold tuning and geometric morphological post-processing.',
      links: {}
    },
    {
      name: 'Simran',
      rollNo: '23010503064',
      role: 'NLP & Medical Captioning Lead',
      image: '/static/team/simran.jpg',
      bio: 'Developed the Dual-Branch Swin-T + Dense CNN encoder with Adaptive Attention Fusion for automated clinical report synthesis and de-identification text cleaning.',
      links: {}
    },
    {
      name: 'Sparsh Thakur',
      rollNo: '23010503066',
      role: 'Data Engineering & Evaluation Specialist',
      image: '/static/team/sparsh.jpeg',
      bio: 'Curated and preprocessed multi-center chest radiograph datasets, managed stratified patient-level splitting to prevent data leakage, and conducted comprehensive statistical benchmarks.',
      links: {}
    }
  ],
  aims: [
    {
      title: 'Multimodal Clinical Decision Support',
      description: 'Develop an integrated, tri-fold deep learning framework unifying disease classification, pixel-wise lesion segmentation, and natural language report generation in a single clinical workflow.'
    },
    {
      title: 'Overcoming the "Black-Box" Dilemma',
      description: 'Provide dual-tier explainability: spatial heatmaps via Grad-CAM highlighting pathological lung zones, and adaptive attention gate weights (α, β, γ) showing how the model blends global vs local features during report generation.'
    },
    {
      title: 'Tackling Extreme Medical Imbalance',
      description: 'Implement compound loss functions (0.5 Dice + 0.5 Soft BCE) and WeightedRandomSampler to prevent false negatives in minority life-threatening conditions like acute pneumothorax.'
    },
    {
      title: 'Automated Radiology Triage',
      description: 'Reduce radiologist burnout and emergency triage delays by automatically generating structured preliminary reports with high clinical fidelity within 250 milliseconds.'
    }
  ],
  futureScope: [
    {
      area: 'Hospital PACS & DICOM Integration',
      details: 'Direct deployment as an HL7/FHIR microservice within existing Picture Archiving and Communication Systems (PACS), enabling seamless in-hospital radiologist workflow integration.'
    },
    {
      area: '3D Volumetric Modalities (CT & MRI)',
      details: 'Extending the 2D UNet++ and Swin-Transformer architectures into 3D volumetric segmentation for High-Resolution Computed Tomography (HRCT) of diffuse interstitial lung diseases.'
    },
    {
      area: 'Multilingual Clinical Reporting',
      details: 'Integrating multilingual translation models (e.g. Hindi, regional Indian languages, and Spanish) to assist healthcare practitioners in remote rural primary health centers.'
    },
    {
      area: 'Privacy-Preserving Federated Learning',
      details: 'Training across disparate multi-institutional hospital cohorts without exchanging patient records, adhering to strict HIPAA and Indian Digital Personal Data Protection (DPDP) standards.'
    },
    {
      area: 'Conformal Prediction & Uncertainty Quantification',
      details: 'Incorporating Bayesian Monte-Carlo dropout to output mathematical certainty bounds, automatically escalating ambiguous edge cases for mandatory human specialist consultation.'
    }
  ],
  datasets: [
    {
      name: 'Chest X-Ray Images (Pneumonia) - Cell 2018',
      author: 'Paul Mooney / Kermany et al.',
      samples: 5863,
      categories: '2 Categories: NORMAL vs PNEUMONIA (Bacterial & Viral)',
      purpose: 'Disease Classification & Grad-CAM Explainability',
      cardImage: '/static/datasets/dataset_pneumonia.png',
      details: 'Selected from pediatric patients aged one to five years from Guangzhou Women and Children’s Medical Center. We structured an 80/10/10 stratified split to eliminate validation noise.'
    },
    {
      name: 'SIIM-ACR Pneumothorax Segmentation',
      author: 'Society for Imaging Informatics in Medicine & American College of Radiology',
      samples: 12047,
      categories: 'Pneumothorax vs Non-Pneumothorax (Pixel-level RLE masks)',
      purpose: 'High-Precision Lesion Segmentation & Volumetric Quantification',
      cardImage: '/static/datasets/dataset_pneumothorax.png',
      details: 'Annotated by certified thoracic radiologists. Extreme class imbalance (22.3% positive cases) tackled using compound Dice + Soft BCE loss with optimal 0.3 thresholding.'
    },
    {
      name: 'Indiana University Chest Radiographs (Open-I)',
      author: 'National Library of Medicine (NLM) / Raddar',
      samples: 7466,
      categories: 'Paired Frontal & Lateral X-Rays + Semi-structured Reports',
      purpose: 'Automated Radiology Report Generation & Attention Gate Fusion',
      cardImage: '/static/datasets/dataset_indiana.png',
      details: 'Extracted from hospital records. We cleaned de-identification boilerplate (XXXX tokens, comparison markers) and conducted patient-level splitting to prevent data leakage.'
    }
  ]
};

// Helper: send JSON response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data, null, 2));
}

// Python Inference Microservice Process Manager
let pythonProcess = null;
let isPythonStarting = false;

function checkPythonHealth() {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: PYTHON_PORT,
      path: '/health',
      method: 'GET',
      timeout: 2000
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            resolve(null);
          }
        } catch {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.end();
  });
}

function startPythonInferenceServer() {
  if (pythonProcess || isPythonStarting) return;
  isPythonStarting = true;

  checkPythonHealth().then((health) => {
    if (health && health.status === 'online') {
      console.log('🤖 [PyTorch AI Engine] Connected to running Python inference service on port ' + PYTHON_PORT);
      console.log(`   Device: ${health.device.toUpperCase()} | GPU: ${health.cuda_device_name}`);
      isPythonStarting = false;
      return;
    }

    console.log('⚡ [PyTorch AI Engine] Launching Python deep learning microservice on port ' + PYTHON_PORT + '...');
    const pythonScript = path.join(__dirname, 'python_inference_server.py');
    const pyCmd = process.platform === 'win32' ? 'python' : 'python3';

    pythonProcess = spawn(pyCmd, [pythonScript], {
      cwd: __dirname,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, PYTHONUNBUFFERED: '1', INFERENCE_PORT: String(PYTHON_PORT) }
    });

    pythonProcess.stdout.on('data', (chunk) => {
      const lines = chunk.toString().split('\n').filter(l => l.trim().length > 0);
      lines.forEach(line => console.log(`[PyTorch AI Engine] ${line.trim()}`));
    });

    pythonProcess.stderr.on('data', (chunk) => {
      const lines = chunk.toString().split('\n').filter(l => l.trim().length > 0);
      lines.forEach(line => console.log(`[PyTorch AI Engine] ${line.trim()}`));
    });

    pythonProcess.on('error', (err) => {
      console.error('❌ [PyTorch AI Engine] Process spawn error:', err.message);
      isPythonStarting = false;
    });

    pythonProcess.on('exit', (code, signal) => {
      if (code !== 0 && code !== null) {
        console.warn(`⚠️ [PyTorch AI Engine] Process stopped with code ${code} (${signal})`);
      }
      pythonProcess = null;
      isPythonStarting = false;
    });

    // Check health until initialized
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      const h = await checkPythonHealth();
      if (h && h.status === 'online') {
        clearInterval(interval);
        isPythonStarting = false;
        console.log('=======================================================');
        console.log('🚀 [PyTorch AI Engine] PyTorch CUDA Models Ready & Active!');
        console.log(`   Compute Device: ${h.device.toUpperCase()} (${h.cuda_device_name})`);
        console.log('   Models: EfficientNetV2-S (Grad-CAM), UNet++ (scSE), Vision-Language Report Gen');
        console.log('=======================================================');
      } else if (attempts > 50) {
        clearInterval(interval);
        isPythonStarting = false;
        console.warn('⚠️ [PyTorch AI Engine] Warning: Python service took longer than expected to initialize.');
      }
    }, 1200);
  });
}

function shutdownPythonProcess() {
  if (pythonProcess && pythonProcess.pid) {
    try {
      if (process.platform === 'win32') {
        execSync(`taskkill /pid ${pythonProcess.pid} /T /F`);
      } else {
        pythonProcess.kill('SIGTERM');
      }
    } catch {}
    pythonProcess = null;
  }
}

process.on('SIGINT', () => { shutdownPythonProcess(); process.exit(0); });
process.on('SIGTERM', () => { shutdownPythonProcess(); process.exit(0); });
process.on('exit', () => { shutdownPythonProcess(); });

async function callPythonInference(payload, endpoint = '/predict', maxRetries = 15) {
  let attempts = 0;
  while (attempts < maxRetries) {
    attempts++;
    try {
      return await new Promise((resolve, reject) => {
        const postData = JSON.stringify(payload);
        const options = {
          hostname: '127.0.0.1',
          port: PYTHON_PORT,
          path: endpoint,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
          },
          timeout: 45000
        };
        const req = http.request(options, (res) => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            try {
              if (res.statusCode === 200) {
                resolve(JSON.parse(data));
              } else {
                reject(new Error(`Python inference returned HTTP ${res.statusCode}: ${data}`));
              }
            } catch (e) {
              reject(e);
            }
          });
        });
        req.on('error', reject);
        req.on('timeout', () => {
          req.destroy();
          reject(new Error('Inference request timed out on compute worker'));
        });
        req.write(postData);
        req.end();
      });
    } catch (err) {
      if ((err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') && attempts < maxRetries) {
        if (!pythonProcess && !isPythonStarting) {
          startPythonInferenceServer();
        }
        await new Promise(r => setTimeout(r, 1200));
        continue;
      }
      throw err;
    }
  }
}

// Request dispatcher
const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(reqUrl.pathname);
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // API Routes
  if (pathname === '/api/status' || pathname === '/api/health') {
    const pyHealth = await checkPythonHealth();
    sendJSON(res, 200, {
      status: 'online',
      system: 'PulmoVision X-AI Backend v2.4',
      cudaAvailable: pyHealth ? (pyHealth.device === 'cuda') : false,
      cudaDeviceName: pyHealth ? pyHealth.cuda_device_name : 'N/A',
      pythonInferenceOnline: !!(pyHealth && pyHealth.status === 'online'),
      modelsLoaded: pyHealth ? pyHealth.models : { classification: false, segmentation: false, report_generator: false },
      activeModels: [
        'EfficientNetV2-S (Classifier + Grad-CAM Explainability)',
        'UNet++ EfficientNet-B3 (Lesion Segmentation + scSE Attention)',
        'Vision-Language Transformer: ViT-B/16 + DenseNet-121 + PCA + DistilGPT-2 (Report Synthesizer)'
      ],
      timestamp: new Date().toISOString()
    });
    return;
  }

  if (pathname === '/api/ai/health') {
    const pyHealth = await checkPythonHealth();
    sendJSON(res, 200, {
      online: !!(pyHealth && pyHealth.status === 'online'),
      device: pyHealth ? pyHealth.device : 'unknown',
      gpu: pyHealth ? pyHealth.cuda_device_name : 'none',
      models: pyHealth ? pyHealth.models : { classification: false, segmentation: false, report_generator: false }
    });
    return;
  }

  if (pathname === '/api/team') {
    sendJSON(res, 200, {
      supervisor: PROJECT_INFO.supervisor,
      team: PROJECT_INFO.team,
      academicDetails: PROJECT_INFO.academicDetails
    });
    return;
  }

  if (pathname === '/api/samples' || pathname === '/api/presets') {
    sendJSON(res, 200, PRESETS);
    return;
  }

  if (pathname === '/api/metrics') {
    sendJSON(res, 200, METRICS);
    return;
  }

  if (pathname === '/api/datasets') {
    sendJSON(res, 200, PROJECT_INFO.datasets);
    return;
  }

  if (pathname === '/api/about') {
    sendJSON(res, 200, PROJECT_INFO);
    return;
  }

  // POST: Disease Classification
  if (pathname === '/api/predict/classify' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const preset = PRESETS.find(p => p.id === payload.presetId);
        
        let infPayload = {};
        if (payload.imageBase64) {
          infPayload = { image_base64: payload.imageBase64 };
        } else if (preset && preset.imageUrl) {
          infPayload = { image_path: preset.imageUrl };
        } else {
          infPayload = { image_path: 'static/samples/sample_xray_pneumo.png' };
        }

        try {
          const pyRes = await callPythonInference(infPayload, '/predict');
          sendJSON(res, 200, {
            presetId: payload.presetId || 'custom_upload',
            label: pyRes.classification.label,
            confidence: pyRes.classification.confidence,
            normalProb: pyRes.classification.normalProb,
            diseaseProb: pyRes.classification.diseaseProb,
            gradCamRegion: pyRes.classification.gradCamRegion,
            gradCamOverlay: pyRes.classification.gradCamOverlay,
            probabilities: pyRes.probabilities,
            status: 'success'
          });
        } catch (pyErr) {
          console.error('Python inference error for classify:', pyErr.message);
          sendJSON(res, 503, {
            status: 'error',
            error: 'Classification model inference failed or models are initializing: ' + pyErr.message
          });
        }
      } catch (err) {
        sendJSON(res, 400, { error: 'Invalid JSON payload', details: err.message });
      }
    });
    return;
  }

  // POST: Lesion Segmentation
  if (pathname === '/api/predict/segment' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const preset = PRESETS.find(p => p.id === payload.presetId);
        const threshold = parseFloat(payload.threshold || 0.30);
        const minArea = parseInt(payload.minArea || 600, 10);

        let infPayload = { threshold, min_area: minArea };
        if (payload.imageBase64) {
          infPayload.image_base64 = payload.imageBase64;
        } else if (preset && preset.imageUrl) {
          infPayload.image_path = preset.imageUrl;
        } else {
          infPayload.image_path = 'static/samples/sample_xray_pneumo.png';
        }

        try {
          const pyRes = await callPythonInference(infPayload, '/predict');
          sendJSON(res, 200, {
            presetId: payload.presetId || 'custom_upload',
            dice: pyRes.segmentation.diceScore,
            iou: pyRes.segmentation.iouScore,
            hasLesion: pyRes.segmentation.hasLesion,
            lesionLocation: pyRes.segmentation.lesionLocation,
            lesionAreaPixels: pyRes.segmentation.lesionAreaPx,
            lungAreaPercentage: pyRes.segmentation.lesionPercentage,
            thresholdUsed: threshold,
            minAreaFilter: minArea,
            overlayUrl: pyRes.segmentation.predictionOverlay,
            maskOverlay: pyRes.segmentation.maskOverlay,
            maskBox: pyRes.segmentation.boundingBox,
            status: 'success'
          });
        } catch (pyErr) {
          console.error('Python inference error for segment:', pyErr.message);
          sendJSON(res, 503, {
            status: 'error',
            error: 'UNet++ segmentation inference failed or models are initializing: ' + pyErr.message
          });
        }
      } catch (err) {
        sendJSON(res, 400, { error: 'Invalid JSON payload', details: err.message });
      }
    });
    return;
  }

  // POST: Radiology Report Generation
  if (pathname === '/api/predict/report' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const preset = PRESETS.find(p => p.id === payload.presetId);
        const beamSize = parseInt(payload.beamSize || 3, 10);

        let infPayload = {};
        if (payload.imageBase64) {
          infPayload = { image_base64: payload.imageBase64 };
        } else if (preset && preset.imageUrl) {
          infPayload = { image_path: preset.imageUrl };
        } else {
          infPayload = { image_path: 'static/samples/sample_xray_pneumo.png' };
        }

        try {
          const pyRes = await callPythonInference(infPayload, '/predict');
          sendJSON(res, 200, {
            presetId: payload.presetId || 'custom_upload',
            findings: pyRes.report.findings,
            impression: pyRes.report.impression,
            keyPoints: pyRes.report.keyPoints,
            attentionWeights: pyRes.report.attentionWeights,
            beamSizeUsed: beamSize,
            status: 'success'
          });
        } catch (pyErr) {
          console.error('Python inference error for report:', pyErr.message);
          sendJSON(res, 503, {
            status: 'error',
            error: 'Report generator inference failed or models are initializing: ' + pyErr.message
          });
        }
      } catch (err) {
        sendJSON(res, 400, { error: 'Invalid JSON payload', details: err.message });
      }
    });
    return;
  }

  // POST: Comprehensive Multi-Modal Call (All 3 modules simultaneously)
  if (pathname === '/api/predict/comprehensive' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const preset = PRESETS.find(p => p.id === payload.presetId);
        const threshold = parseFloat(payload.threshold || 0.30);
        const minArea = parseInt(payload.minArea || 600, 10);

        let infPayload = { threshold, min_area: minArea };
        if (payload.imageBase64) {
          infPayload.image_base64 = payload.imageBase64;
        } else if (preset && preset.imageUrl) {
          infPayload.image_path = preset.imageUrl;
        } else {
          infPayload.image_path = 'static/samples/sample_xray_pneumo.png';
        }

        try {
          const pyRes = await callPythonInference(infPayload, '/predict');
          sendJSON(res, 200, {
            caseId: preset ? preset.id : 'custom_upload',
            name: preset ? preset.name : (payload.fileName ? `Uploaded Radiograph (${payload.fileName})` : 'Uploaded Patient Radiograph'),
            category: preset ? preset.category : 'Multi-Modal Radiographic Screening',
            imageUrl: preset ? preset.imageUrl : null,
            overlayUrl: pyRes.segmentation.predictionOverlay,
            clinicalHistory: preset ? preset.clinicalHistory : 'Patient radiograph submitted via clinical workbench interface for real-time deep learning inference.',
            classification: pyRes.classification,
            segmentation: {
              dice: pyRes.segmentation.diceScore,
              iou: pyRes.segmentation.iouScore,
              hasLesion: pyRes.segmentation.hasLesion,
              lesionAreaPixels: pyRes.segmentation.lesionAreaPx,
              lungAreaPercentage: pyRes.segmentation.lesionPercentage,
              thresholdUsed: threshold,
              minAreaFilter: minArea,
              status: pyRes.segmentation.hasLesion ? 'Positive Lesion Detected' : 'No Pleural Lesion Detected',
              lesionLocation: pyRes.segmentation.lesionLocation,
              maskBox: pyRes.segmentation.boundingBox,
              maskOverlay: pyRes.segmentation.maskOverlay,
              predictionOverlay: pyRes.segmentation.predictionOverlay
            },
            groundTruth: preset ? preset.groundTruth : {
              hasLesion: pyRes.segmentation.hasLesion,
              maskBox: pyRes.segmentation.boundingBox
            },
            report: pyRes.report,
            probabilities: pyRes.probabilities,
            overallRisk: pyRes.overallRisk,
            primaryDisease: pyRes.primaryDisease,
            confidence: pyRes.confidence,
            status: 'success'
          });
        } catch (pyErr) {
          console.error('Python inference error for comprehensive:', pyErr.message);
          sendJSON(res, 503, {
            status: 'error',
            error: 'Deep learning inference engine is currently loading or unreachable: ' + pyErr.message
          });
        }
      } catch (err) {
        sendJSON(res, 400, { error: 'Invalid JSON payload', details: err.message });
      }
    });
    return;
  }

  // Static File Serving
  let filePath;
  if (pathname === '/' || pathname === '/index.html') {
    filePath = path.join(__dirname, 'public', 'index.html');
  } else if (pathname.startsWith('/static/')) {
    filePath = path.join(__dirname, pathname);
  } else if (pathname.startsWith('/public/')) {
    filePath = path.join(__dirname, pathname);
  } else if (pathname.startsWith('/images/')) {
    filePath = path.join(__dirname, pathname);
  } else {
    filePath = path.join(__dirname, 'public', pathname);
  }

  // Prevent directory traversal
  const safePath = path.resolve(filePath);
  if (!safePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Access Denied');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback for SPA routing or 404
      if (pathname.endsWith('.html') || !path.extname(pathname)) {
        const fallbackIndex = path.join(__dirname, 'public', 'index.html');
        fs.readFile(fallbackIndex, (err2, content) => {
          if (!err2) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
            return;
          }
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        });
        return;
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: ' + pathname);
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Disable caching for team images and dynamic assets so updates appear immediately
    const isImage = ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.svg';
    const cacheControl = isImage ? 'no-cache, must-revalidate' : 'public, max-age=60';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'Access-Control-Allow-Origin': '*'
    });

    const readStream = fs.createReadStream(safePath);
    readStream.pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = PORT + 1;
    console.warn(`⚠️  Port ${PORT} is currently in use. Automatically switching to http://localhost:${nextPort}...`);
    server.listen(nextPort, '0.0.0.0', () => {
      console.log(`=======================================================`);
      console.log(`🫁 PulmoVision X-AI Diagnostic Server Running!`);
      console.log(`📡 Local URL: http://localhost:${nextPort}`);
      console.log(`🏥 GHEC Bandla - B.Tech. CSE (AI & DS) 7th Sem Major Project`);
      console.log(`👨‍🔬 Lead: Aman (23010503008) | Supervisor: Dr. Ravi Kumar`);
      console.log(`=======================================================`);
      startPythonInferenceServer();
    });
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🫁 PulmoVision X-AI Diagnostic Server Running!`);
  console.log(`📡 Local URL: http://localhost:${PORT}`);
  console.log(`🏥 GHEC Bandla - B.Tech. CSE (AI & DS) 7th Sem Major Project`);
  console.log(`👨‍🔬 Lead: Aman (23010503008) | Supervisor: Dr. Ravi Kumar`);
  console.log(`=======================================================`);
  startPythonInferenceServer();
});
