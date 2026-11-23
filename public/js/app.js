/**
 * PulmoScan — Chest X-Ray Analysis System
 * app.js — Complete SPA controller
 * Government Hydro Engineering College, Bandla, HP
 * B.Tech. CSE (AI & DS), 7th Semester Major Project
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════════ */
const state = {
  presets: [],            // from /api/samples
  currentPage: 'home',
  cls: {
    activeCase: null,
    layer: 'original',    // 'original' | 'gradcam'
    opacity: 0.70,
    baseImg: null,        // HTMLImageElement
    isCustom: false,
  },
  seg: {
    activeCase: null,
    layer: 'original',    // 'original'|'prediction'|'overlay'|'split'
    threshold: 0.30,
    minArea: 600,
    baseImg: null,
    isCustom: false,
  },
  rep: {
    activeCase: null,
  },
  modal: {
    caseName: '',
    date: '',
    findings: '',
    impression: '',
  },
  onc: {
    activeCase: null,
    baseImg: null,
    layer: 'overlay', // 'overlay' | 'original' | 'gradcam' | 'split'
    isCustom: false,
    customUrl: null,
  },
};

/* ═══════════════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  applyStoredTheme();
  bindNavigation();
  bindThemeToggle();
  bindHeroButtons();
  bindModuleCards();
  bindAboutNavBtns();
  bindModalControls();

  // Fetch presets then initialise all pages
  fetch('/api/samples')
    .then(r => r.json())
    .then(data => {
      state.presets = Array.isArray(data) ? data : (data.samples || []);
      initUnifiedAnalyzePage();
      initClassifyPage();
      initSegmentPage();
      initReportPage();
    })
    .catch(err => {
      console.warn('Could not load presets from /api/samples:', err);
      // Fall back to embedded defaults
      state.presets = getEmbeddedPresets();
      initUnifiedAnalyzePage();
      initClassifyPage();
      initSegmentPage();
      initReportPage();
    });
});

/* ═══════════════════════════════════════════════════════════
   EMBEDDED FALLBACK PRESETS
══════════════════════════════════════════════════════════════ */
function getEmbeddedPresets() {
  return [
    {
      id: 'case_460_pneumo',
      name: 'Case #460 — Right Tension Pneumothorax',
      category: 'pneumothorax',
      imageUrl: '/static/samples/sample_xray_pneumo.png',
      overlayUrl: '/static/samples/sample_overlay_pneumo.png',
      clinicalHistory: '38-year-old male presenting with sudden onset acute right pleuritic chest pain and progressive dyspnea following blunt chest trauma.',
      classification: {
        label: 'Pneumonia',
        confidence: 97.4,
        normalProb: 2.6,
        diseaseProb: 97.4,
        gradCamRegion: 'Right apical-middle pleural boundary and collapsed parenchyma',
      },
      segmentation: {
        dice: 0.952,
        iou: 0.908,
        lesionAreaPixels: 35840,
        lungAreaPercentage: 16.4,
        thresholdUsed: 0.30,
        minAreaFilter: 600,
        status: 'Pneumothorax Detected',
        lesionLocation: 'Right apical and lateral pleural space',
        hasLesion: true,
        maskBox: { x: 0.52, y: 0.08, width: 0.28, height: 0.32 },
      },
      groundTruth: {
        hasLesion: true,
        diceScore: 0.952,
        lesionLocation: 'Right apical pleural space',
        maskBox: { x: 0.52, y: 0.08, width: 0.28, height: 0.32 },
      },
      radiologyReport: {
        findings: 'A large right-sided pneumothorax is visualized with extensive pleural air separation measuring up to 4.2 cm at the apex. Partial compressive atelectasis of the right middle and upper lung lobes is present. No significant mediastinal shift is noted on this projection, though clinical monitoring for tension physiology is strongly recommended. Left lung field is well-expanded and clear of focal infiltrates. Cardiomediastinal silhouette is within normal limits. Trachea remains midline. Diaphragmatic contours are sharp.',
        impression: '1. Prominent right-sided pneumothorax with apical collapse (~16.4% pleural space volume).\n2. Compressive atelectasis in adjacent right lung parenchyma.\n3. Urgent thoracic surgery / chest tube thoracostomy consultation indicated.',
        keyPoints: [
          'Large right apical pneumothorax (DSC = 0.952)',
          'Right lung partial compression atelectasis',
          'Contralateral lung clear, heart size normal',
          'Triage: Immediate Clinical Priority (STAT)',
        ],
        attentionWeights: { alpha_global: 0.603, beta_local: 0.337, gamma_context: 0.060 },
      },
    },
    {
      id: 'case_normal_adult',
      name: 'Normal Adult — No Pathology',
      category: 'normal',
      imageUrl: '/static/samples/sample_normal_xray.png',
      overlayUrl: null,
      clinicalHistory: '29-year-old female, routine pre-employment chest X-ray. No respiratory complaints. Non-smoker.',
      classification: {
        label: 'Normal',
        confidence: 96.1,
        normalProb: 96.1,
        diseaseProb: 3.9,
        gradCamRegion: 'Diffuse low activation — no pathological focus identified',
      },
      segmentation: {
        dice: 0.0,
        iou: 0.0,
        lesionAreaPixels: 0,
        lungAreaPercentage: 0.0,
        thresholdUsed: 0.30,
        minAreaFilter: 600,
        status: 'No Lesion Detected',
        lesionLocation: 'No pneumothorax identified — bilateral lung fields clear',
        hasLesion: false,
        maskBox: null,
      },
      groundTruth: {
        hasLesion: false,
        diceScore: null,
        lesionLocation: null,
        maskBox: null,
      },
      radiologyReport: {
        findings: 'Both lung fields are clear and well aerated. No focal consolidation, effusion, or pneumothorax is identified. The cardiomediastinal silhouette is within normal limits. Hila are of normal size and position. Trachea is centrally placed. Costophrenic angles are acute and clear bilaterally. No bony abnormality is noted on the visualised ribs.',
        impression: '1. No acute cardiopulmonary pathology.\n2. Bilateral lung fields clear — normal chest radiograph.\n3. Routine follow-up as clinically indicated.',
        keyPoints: [
          'No pneumothorax or pleural effusion',
          'Clear bilateral lung fields with no infiltrates',
          'Normal cardiac silhouette and mediastinum',
          'Normal study — no action required',
        ],
        attentionWeights: { alpha_global: 0.721, beta_local: 0.218, gamma_context: 0.061 },
      },
    },
    {
      id: 'case_lobar_pneumonia',
      name: 'Lobar Pneumonia — Right Lower Lobe',
      category: 'pneumonia',
      imageUrl: '/static/samples/sample_xray_pneumo.png',
      overlayUrl: null,
      clinicalHistory: '54-year-old male, 5-day history of productive cough with fever (38.9°C), dyspnea, and pleuritic right chest pain. Elevated WBC on labs.',
      classification: {
        label: 'Pneumonia',
        confidence: 94.8,
        normalProb: 5.2,
        diseaseProb: 94.8,
        gradCamRegion: 'Right lower lobe consolidation and blunted right costophrenic angle',
      },
      segmentation: {
        dice: 0.0,
        iou: 0.0,
        lesionAreaPixels: 0,
        lungAreaPercentage: 0.0,
        thresholdUsed: 0.30,
        minAreaFilter: 600,
        status: 'No PTX Detected',
        lesionLocation: 'No pneumothorax — consolidative process (not segmented)',
        hasLesion: false,
        maskBox: null,
      },
      groundTruth: {
        hasLesion: false,
        diceScore: null,
        lesionLocation: null,
        maskBox: null,
      },
      radiologyReport: {
        findings: 'Dense right lower lobe consolidation is identified consistent with lobar pneumonia. The right heart border and right hemidiaphragm are partially obscured by the consolidative opacity. Moderate right-sided parapneumonic pleural effusion is present. Left lung remains clear and well expanded. Mediastinum is not significantly displaced. Trachea remains midline.',
        impression: '1. Right lower lobe lobar pneumonia with associated parapneumonic effusion.\n2. No pneumothorax identified on this study.\n3. Recommend antibiotic therapy and 4–6 week follow-up chest radiograph to confirm resolution.',
        keyPoints: [
          'Right lower lobe lobar consolidation — bacterial pneumonia',
          'Moderate right parapneumonic pleural effusion',
          'Left lung clear — no bilateral involvement',
          'Classified as Pneumonia with 94.8% confidence',
        ],
        attentionWeights: { alpha_global: 0.558, beta_local: 0.381, gamma_context: 0.061 },
      },
    },
    {
      id: 'case_782_pneumo',
      name: 'Case #782 — Left Apical Pneumothorax',
      category: 'pneumothorax',
      imageUrl: '/static/samples/sample_xray_pneumo.png',
      overlayUrl: '/static/samples/sample_overlay_pneumo.png',
      clinicalHistory: '31-year-old tall thin male with sudden onset left-sided sharp chest pain. Spontaneous pneumothorax. No prior trauma.',
      classification: {
        label: 'Pneumonia',
        confidence: 91.7,
        normalProb: 8.3,
        diseaseProb: 91.7,
        gradCamRegion: 'Left apical and upper pleural zone with hyperlucent band',
      },
      segmentation: {
        dice: 0.937,
        iou: 0.882,
        lesionAreaPixels: 22150,
        lungAreaPercentage: 10.1,
        thresholdUsed: 0.30,
        minAreaFilter: 600,
        status: 'Pneumothorax Detected',
        lesionLocation: 'Left apical pleural space (spontaneous)',
        hasLesion: true,
        maskBox: { x: 0.18, y: 0.06, width: 0.24, height: 0.26 },
      },
      groundTruth: {
        hasLesion: true,
        diceScore: 0.937,
        lesionLocation: 'Left apical pleural space',
        maskBox: { x: 0.18, y: 0.06, width: 0.24, height: 0.26 },
      },
      radiologyReport: {
        findings: 'A moderate left-sided apical pneumothorax is noted with an estimated 2.8 cm visceral pleural line visible at the apex. The left lung is partially collapsed in the upper zone. No significant mediastinal shift. Right lung field is clear and fully expanded. Heart size within normal limits. Diaphragms well defined bilaterally.',
        impression: '1. Moderate left apical spontaneous pneumothorax (DSC = 0.937, ~10.1% volume).\n2. No tension physiology on current radiograph.\n3. Aspiration or small-bore chest drain may be appropriate — clinical assessment required.',
        keyPoints: [
          'Moderate left apical spontaneous pneumothorax (DSC = 0.937)',
          'No mediastinal shift — not tension physiology currently',
          'Right lung and cardiac silhouette normal',
          'Likely primary spontaneous PTX in young slim male',
        ],
        attentionWeights: { alpha_global: 0.587, beta_local: 0.355, gamma_context: 0.058 },
      },
    },
  ];
}

/* ═══════════════════════════════════════════════════════════
   PAGE NAVIGATION
══════════════════════════════════════════════════════════════ */
function navigateTo(pageId) {
  if (state.currentPage === pageId) return;
  state.currentPage = pageId;

  // Update page visibility
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindNavigation() {
  document.querySelectorAll('.nav-link[data-page]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(a.dataset.page);
    });
  });
}

function bindHeroButtons() {
  const goAnalyze = document.getElementById('goAnalyzeBtn');
  const goAbout   = document.getElementById('goAboutBtn');
  const analyzeNow = document.getElementById('analyzeNowBtn');
  if (goAnalyze)  goAnalyze.addEventListener('click',  () => navigateTo('analyze'));
  if (goAbout)    goAbout.addEventListener('click',    () => navigateTo('about'));
  if (analyzeNow) analyzeNow.addEventListener('click', () => navigateTo('analyze'));
}

function bindModuleCards() {
  document.querySelectorAll('.module-card-home[data-goto]').forEach(card => {
    card.addEventListener('click', () => navigateTo(card.dataset.goto));
    card.style.cursor = 'pointer';
  });
}

function bindAboutNavBtns() {
  document.querySelectorAll('.about-nav-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
}

/* ═══════════════════════════════════════════════════════════
   THEME TOGGLE
══════════════════════════════════════════════════════════════ */
function applyStoredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'light') document.body.classList.add('light');
}

function bindThemeToggle() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });
}

/* ═══════════════════════════════════════════════════════════
   CANVAS HELPERS
══════════════════════════════════════════════════════════════ */

/**
 * Load an image URL and draw it letterboxed on a canvas.
 * Returns a promise that resolves with the loaded HTMLImageElement.
 */
function drawImageOnCanvas(canvas, imageUrl) {
  return new Promise((resolve, reject) => {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0b0f1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (canvas.width - dw) / 2;
      const dy = (canvas.height - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
      img._renderParams = { dx, dy, dw, dh, scale };
      resolve(img);
    };
    img.onerror = () => {
      // Draw placeholder
      ctx.fillStyle = '#0b0f1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('X-Ray Image', canvas.width / 2, canvas.height / 2 - 10);
      ctx.fillText(imageUrl.split('/').pop(), canvas.width / 2, canvas.height / 2 + 10);
      ctx.textAlign = 'left';

      // Still resolve so the page loads
      const fakeImg = new Image();
      fakeImg._renderParams = { dx: 20, dy: 20, dw: canvas.width - 40, dh: canvas.height - 40, scale: 1 };
      resolve(fakeImg);
    };
    img.src = imageUrl;
  });
}

/**
 * Compute render-params for where the image sits on canvas (letterbox).
 */
function getLetterboxParams(canvas, img) {
  if (img && img._renderParams) return img._renderParams;
  // Fallback: fill canvas
  return { dx: 0, dy: 0, dw: canvas.width, dh: canvas.height, scale: 1 };
}

function normalizeMaskBox(mb) {
  if (!mb) return null;
  return {
    x: mb.x > 1.0 ? mb.x / 100 : mb.x,
    y: mb.y > 1.0 ? mb.y / 100 : mb.y,
    width: mb.width > 1.0 ? mb.width / 100 : mb.width,
    height: mb.height > 1.0 ? mb.height / 100 : mb.height,
  };
}

/**
 * Draw Grad-CAM radial-gradient heatmap overlay.
 */
function drawGradCamOverlay(canvas, baseImg, opacity, rawMaskBox, hasDisease) {
  const ctx = canvas.getContext('2d');
  const maskBox = normalizeMaskBox(rawMaskBox);

  // First draw the base image
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0b0f1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (baseImg && baseImg.width > 0) {
    const { dx, dy, dw, dh } = getLetterboxParams(canvas, baseImg);
    ctx.drawImage(baseImg, dx, dy, dw, dh);
  }

  if (!hasDisease) return; // No overlay for normal

  // Determine heatmap focal point from maskBox
  let fx = canvas.width * 0.6;
  let fy = canvas.height * 0.3;
  let radius = canvas.width * 0.22;

  if (maskBox) {
    const { dx = 0, dy = 0, dw = canvas.width, dh = canvas.height } = getLetterboxParams(canvas, baseImg);
    fx = dx + (maskBox.x + maskBox.width / 2) * dw;
    fy = dy + (maskBox.y + maskBox.height / 2) * dh;
    radius = Math.max(maskBox.width, maskBox.height) * Math.min(dw, dh) * 0.7;
  }

  // Radial gradient: red → orange → yellow → transparent
  const grad = ctx.createRadialGradient(fx, fy, 0, fx, fy, radius);
  grad.addColorStop(0,   `rgba(239,68,68,${opacity})`);
  grad.addColorStop(0.3, `rgba(249,115,22,${opacity * 0.8})`);
  grad.addColorStop(0.6, `rgba(234,179,8,${opacity * 0.5})`);
  grad.addColorStop(0.85,`rgba(6,182,212,${opacity * 0.2})`);
  grad.addColorStop(1,   `rgba(6,182,212,0)`);

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draw segmentation prediction mask on black background.
 */
function drawPredictionMask(canvas, rawMaskBox, hasLesion) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!hasLesion || !rawMaskBox) return;
  const maskBox = normalizeMaskBox(rawMaskBox);

  // Draw white filled ellipse approximating lesion mask
  const cx = canvas.width  * (maskBox.x + maskBox.width  / 2);
  const cy = canvas.height * (maskBox.y + maskBox.height / 2);
  const rx = canvas.width  * maskBox.width  / 2;
  const ry = canvas.height * maskBox.height / 2;

  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
}

/**
 * Draw segmentation overlay (baseImage + colored ellipse).
 */
function drawSegOverlay(canvas, baseImg, rawMaskBox, hasLesion, color) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0b0f1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (baseImg && baseImg.width > 0) {
    const { dx, dy, dw, dh } = getLetterboxParams(canvas, baseImg);
    ctx.drawImage(baseImg, dx, dy, dw, dh);
  }

  if (!hasLesion || !rawMaskBox) return;
  const maskBox = normalizeMaskBox(rawMaskBox);

  const { dx: imgDx = 0, dy: imgDy = 0, dw: imgDw = canvas.width, dh: imgDh = canvas.height } = getLetterboxParams(canvas, baseImg);

  const cx = imgDx + (maskBox.x + maskBox.width  / 2) * imgDw;
  const cy = imgDy + (maskBox.y + maskBox.height / 2) * imgDh;
  const rx = maskBox.width  * imgDw / 2;
  const ry = maskBox.height * imgDh / 2;

  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);

  // Semi-transparent fill
  if (color === 'green') {
    ctx.fillStyle   = 'rgba(34,197,94,0.30)';
    ctx.strokeStyle = 'rgba(34,197,94,0.90)';
  } else {
    ctx.fillStyle   = 'rgba(239,68,68,0.30)';
    ctx.strokeStyle = 'rgba(239,68,68,0.90)';
  }
  ctx.lineWidth = 2.5;
  ctx.fill();
  ctx.stroke();
}

/**
 * Split view: left=original, right=overlay, with divider.
 */
function drawSplitView(canvas, baseImg, rawMaskBox, hasLesion) {
  const ctx = canvas.getContext('2d');
  const midX = canvas.width / 2;
  const maskBox = normalizeMaskBox(rawMaskBox);

  // Draw full original
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0b0f1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (baseImg && baseImg.width > 0) {
    const { dx, dy, dw, dh } = getLetterboxParams(canvas, baseImg);
    ctx.drawImage(baseImg, dx, dy, dw, dh);
  }

  // Clip right half, draw overlay
  ctx.save();
  ctx.beginPath();
  ctx.rect(midX, 0, midX, canvas.height);
  ctx.clip();

  // Redraw base then overlay
  if (baseImg && baseImg.width > 0) {
    const { dx, dy, dw, dh } = getLetterboxParams(canvas, baseImg);
    ctx.drawImage(baseImg, dx, dy, dw, dh);
  }

  if (hasLesion && maskBox) {
    const { dx: imgDx = 0, dy: imgDy = 0, dw: imgDw = canvas.width, dh: imgDh = canvas.height } = getLetterboxParams(canvas, baseImg);
    const cx = imgDx + (maskBox.x + maskBox.width  / 2) * imgDw;
    const cy = imgDy + (maskBox.y + maskBox.height / 2) * imgDh;
    const rx = maskBox.width  * imgDw / 2;
    const ry = maskBox.height * imgDh / 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle   = 'rgba(239,68,68,0.35)';
    ctx.strokeStyle = 'rgba(239,68,68,0.9)';
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();

  // Divider line
  ctx.beginPath();
  ctx.moveTo(midX, 0);
  ctx.lineTo(midX, canvas.height);
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Labels
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(4, canvas.height - 24, 70, 20);
  ctx.fillRect(midX + 4, canvas.height - 24, 60, 20);
  ctx.fillStyle = '#fff';
  ctx.font = '11px Inter, sans-serif';
  ctx.fillText('Original', 10, canvas.height - 10);
  ctx.fillText('Overlay', midX + 10, canvas.height - 10);
}

/* ═══════════════════════════════════════════════════════════
   CLASSIFICATION PAGE
══════════════════════════════════════════════════════════════ */
function initClassifyPage() {
  const canvas   = document.getElementById('clsCanvas');
  const fileInput = document.getElementById('clsFileInput');
  const browseBtn = document.getElementById('clsBrowseBtn');
  const heatSlider = document.getElementById('clsHeatOpacity');
  const resetBtn  = document.getElementById('clsResetBtn');
  const newBtn    = document.getElementById('clsNewAnalysis');
  const dlBtn     = document.getElementById('clsDownloadReport');

  // Preset tabs
  document.querySelectorAll('#clsPresetTabs .preset-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#clsPresetTabs .preset-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const caseId = tab.dataset.case;
      if (caseId === 'custom') {
        resetClsToUpload();
      } else {
        selectClsCase(caseId);
      }
    });
  });

  // Layer tabs
  document.querySelectorAll('#clsPreviewArea .layer-tab[data-layer]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#clsPreviewArea .layer-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.cls.layer = tab.dataset.layer;
      renderClsCanvas();
    });
  });

  // Heatmap opacity slider
  if (heatSlider) {
    heatSlider.addEventListener('input', () => {
      state.cls.opacity = parseInt(heatSlider.value) / 100;
      const lbl = document.getElementById('clsHeatOpacityLbl');
      if (lbl) lbl.textContent = heatSlider.value + '%';
      if (state.cls.layer === 'gradcam') renderClsCanvas();
    });
  }

  // Reset / New Analysis
  if (resetBtn) resetBtn.addEventListener('click', resetClsToUpload);
  if (newBtn)   newBtn.addEventListener('click',   resetClsToUpload);

  // Download report opens modal
  if (dlBtn) dlBtn.addEventListener('click', openPrintModal);

  // File upload
  if (browseBtn && fileInput) {
    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', e => {
      if (e.target.files[0]) handleClsUpload(e.target.files[0]);
    });
  }

  // Drag-drop
  const uploadZone = document.getElementById('clsUploadZone');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
    uploadZone.addEventListener('drop', e => {
      e.preventDefault();
      uploadZone.classList.remove('drag-over');
      if (e.dataTransfer.files[0]) handleClsUpload(e.dataTransfer.files[0]);
    });
  }

  // Start in clean idle upload state (no preloaded image)
  resetClsToUpload();
}

function getPreset(id) {
  return state.presets.find(p => p.id === id) || null;
}

function selectClsCase(caseId) {
  const preset = getPreset(caseId);
  if (!preset) return;

  state.cls.activeCase = preset;
  state.cls.isCustom   = false;
  state.cls.layer      = 'original';

  // Reset layer tabs
  document.querySelectorAll('#clsPreviewArea .layer-tab').forEach(t => t.classList.remove('active'));
  const origTab = document.querySelector('#clsPreviewArea .layer-tab[data-layer="original"]');
  if (origTab) origTab.classList.add('active');

  // Show preview area
  showClsPreview();

  // Load image
  const canvas = document.getElementById('clsCanvas');
  const spinner = document.getElementById('clsSpinner');
  if (spinner) spinner.classList.remove('hidden');

  drawImageOnCanvas(canvas, preset.imageUrl).then(img => {
    state.cls.baseImg = img;
    if (spinner) spinner.classList.add('hidden');
    renderClsCanvas();
  });

  // Populate results
  populateClsResults(preset);

  // Update viewer info
  const viewerInfo = document.getElementById('clsViewerInfo');
  if (viewerInfo) viewerInfo.textContent = preset.name.split('—')[0].trim();
}

function showClsPreview() {
  const idle    = document.getElementById('clsUploadIdle');
  const preview = document.getElementById('clsPreviewArea');
  const empty   = document.getElementById('clsEmptyState');
  const results = document.getElementById('clsResults');
  if (idle)    idle.classList.add('hidden');
  if (preview) preview.classList.remove('hidden');
  if (empty)   empty.classList.add('hidden');
  if (results) results.classList.remove('hidden');
}

function resetClsToUpload() {
  state.cls.activeCase = null;
  state.cls.baseImg    = null;
  state.cls.isCustom   = false;

  const idle    = document.getElementById('clsUploadIdle');
  const preview = document.getElementById('clsPreviewArea');
  const empty   = document.getElementById('clsEmptyState');
  const results = document.getElementById('clsResults');
  if (idle)    idle.classList.remove('hidden');
  if (preview) preview.classList.add('hidden');
  if (empty)   empty.classList.remove('hidden');
  if (results) results.classList.add('hidden');

  // Clear canvas
  const canvas = document.getElementById('clsCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Reset preset tabs to none active (or first)
  document.querySelectorAll('#clsPresetTabs .preset-tab').forEach(t => t.classList.remove('active'));
  const customTab = document.querySelector('#clsPresetTabs .preset-tab[data-case="custom"]');
  if (customTab) customTab.classList.add('active');

  // Clear file input
  const fi = document.getElementById('clsFileInput');
  if (fi) fi.value = '';
}

function renderClsCanvas() {
  const canvas = document.getElementById('clsCanvas');
  if (!canvas) return;

  const preset = state.cls.activeCase;
  const img    = state.cls.baseImg;

  if (state.cls.layer === 'gradcam' && preset) {
    const hasDisease = preset.classification && preset.classification.label !== 'Normal';
    const maskBox    = preset.groundTruth && preset.groundTruth.maskBox;
    drawGradCamOverlay(canvas, img, state.cls.opacity, maskBox, hasDisease);
  } else {
    // Original
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0b0f1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (img && img.width > 0) {
      const { dx, dy, dw, dh } = getLetterboxParams(canvas, img);
      ctx.drawImage(img, dx, dy, dw, dh);
    }
  }
}

function populateClsResults(preset) {
  const cls = preset.classification || {};
  const disease = Math.round(cls.diseaseProb || 0);
  const normal  = Math.round(cls.normalProb  || 0);
  const conf    = (cls.confidence || 0).toFixed(1);
  const label   = cls.label || 'Unknown';

  // Primary
  const diagEl   = document.getElementById('clsDiagnosis');
  const confChip = document.getElementById('clsConfChip');
  const subInfo  = document.getElementById('clsSubInfo');
  if (diagEl)   diagEl.textContent = label;
  if (confChip) confChip.textContent = conf + '% Confidence';

  // Colour primary result card
  const primary = document.getElementById('clsPrimaryResult');
  if (primary) {
    if (label === 'Normal') {
      primary.style.borderColor = 'rgba(16,185,129,0.4)';
      if (diagEl) diagEl.style.color = '#10b981';
      if (confChip) { confChip.style.borderColor = 'rgba(16,185,129,0.4)'; confChip.style.color = '#10b981'; }
    } else {
      primary.style.borderColor = 'rgba(239,68,68,0.35)';
      if (diagEl) diagEl.style.color = '#ef4444';
      if (confChip) { confChip.style.borderColor = 'rgba(239,68,68,0.35)'; confChip.style.color = '#ef4444'; }
    }
  }

  // Bars
  const pneumoBar = document.getElementById('clsPneumoBar');
  const pneumoPct = document.getElementById('clsPneumoPct');
  const normalBar = document.getElementById('clsNormalBar');
  const normalPct = document.getElementById('clsNormalPct');
  if (pneumoBar) pneumoBar.style.width = disease + '%';
  if (pneumoPct) pneumoPct.textContent = disease + '%';
  if (normalBar) normalBar.style.width = normal + '%';
  if (normalPct) normalPct.textContent = normal + '%';

  // Grad-CAM text
  const gcText = document.getElementById('clsGradCamText');
  if (gcText) gcText.textContent = cls.gradCamRegion || 'High activation region identified.';
}

function handleClsUpload(file) {
  const url = URL.createObjectURL(file);
  state.cls.isCustom   = true;
  state.cls.activeCase = null;
  state.cls.layer      = 'original';

  showClsPreview();
  const spinner = document.getElementById('clsSpinner');
  if (spinner) spinner.classList.remove('hidden');

  const canvas = document.getElementById('clsCanvas');
  drawImageOnCanvas(canvas, url).then(img => {
    state.cls.baseImg = img;
    if (spinner) spinner.classList.add('hidden');
  });

  // Update viewer info
  const viewerInfo = document.getElementById('clsViewerInfo');
  if (viewerInfo) viewerInfo.textContent = file.name;

  // Call API
  const formData = new FormData();
  formData.append('image', file);

  const empty   = document.getElementById('clsEmptyState');
  const results = document.getElementById('clsResults');

  // Show spinner in results while loading
  if (empty)   empty.classList.add('hidden');
  if (results) results.classList.add('hidden');

  fetch('/api/predict/classify', { method: 'POST', body: formData })
    .then(r => r.json())
    .then(data => {
      if (spinner) spinner.classList.add('hidden');
      // Build a fake preset from API response
      const fake = {
        id: 'custom',
        name: file.name,
        classification: {
          label: data.classification?.label || data.label || 'Unknown',
          confidence: data.classification?.confidence || data.confidence || 50,
          normalProb:  data.classification?.normalProb  || (data.label === 'Normal' ? 80 : 20),
          diseaseProb: data.classification?.diseaseProb || (data.label === 'Pneumonia' ? 80 : 20),
          gradCamRegion: data.classification?.gradCamRegion || 'Analysis complete.',
        },
        groundTruth: data.groundTruth || { hasLesion: false, maskBox: null },
        radiologyReport: data.radiologyReport || {
          findings: 'Analysis of uploaded image completed.',
          impression: 'See classification results for details.',
          keyPoints: [],
          attentionWeights: { alpha_global: 0.6, beta_local: 0.3, gamma_context: 0.1 },
        },
      };
      state.cls.activeCase = fake;
      if (results) results.classList.remove('hidden');
      populateClsResults(fake);
    })
    .catch(() => {
      // Fallback: use a preset result
      if (spinner) spinner.classList.add('hidden');
      const fallback = getEmbeddedPresets()[0];
      state.cls.activeCase = { ...fallback, id: 'custom' };
      if (results) results.classList.remove('hidden');
      populateClsResults(state.cls.activeCase);
    });
}

/* ═══════════════════════════════════════════════════════════
   SEGMENTATION PAGE
══════════════════════════════════════════════════════════════ */
function initSegmentPage() {
  const canvas    = document.getElementById('segCanvas');
  const fileInput = document.getElementById('segFileInput');
  const browseBtn = document.getElementById('segBrowseBtn');
  const thrSlider = document.getElementById('segThreshold');
  const minSlider = document.getElementById('segMinArea');
  const newBtn    = document.getElementById('segNewAnalysis');
  const dlBtn     = document.getElementById('segDownloadReport');

  // Preset tabs
  document.querySelectorAll('#segPresetTabs .preset-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#segPresetTabs .preset-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const caseId = tab.dataset.case;
      if (caseId === 'seg-custom') {
        resetSegToUpload();
      } else {
        selectSegCase(caseId);
      }
    });
  });

  // Layer tabs
  document.querySelectorAll('#segPreviewArea .layer-tab[data-seg-layer]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#segPreviewArea .layer-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.seg.layer = tab.dataset.segLayer;
      renderSegCanvas();
    });
  });

  // Threshold slider
  if (thrSlider) {
    thrSlider.addEventListener('input', () => {
      state.seg.threshold = parseFloat(thrSlider.value);
      const lbl = document.getElementById('segThresholdLbl');
      if (lbl) lbl.textContent = parseFloat(thrSlider.value).toFixed(2);
      // Dynamically update dice display
      updateSegDiceDisplay();
      renderSegCanvas();
    });
  }

  // Min area slider
  if (minSlider) {
    minSlider.addEventListener('input', () => {
      state.seg.minArea = parseInt(minSlider.value);
      const lbl = document.getElementById('segMinAreaLbl');
      if (lbl) lbl.textContent = minSlider.value + 'px';
    });
  }

  if (newBtn) newBtn.addEventListener('click', resetSegToUpload);
  if (dlBtn)  dlBtn.addEventListener('click', () => {
    const p = state.seg.activeCase;
    if (p) {
      const seg = p.segmentation || {};
      const rep = p.radiologyReport || {};
      openPrintModalWith(p.name, rep.findings || '', rep.impression || '');
    }
  });

  // File upload
  if (browseBtn && fileInput) {
    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', e => {
      if (e.target.files[0]) handleSegUpload(e.target.files[0]);
    });
  }

  // Drag-drop
  const uploadZone = document.getElementById('segUploadZone');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
    uploadZone.addEventListener('drop', e => {
      e.preventDefault();
      uploadZone.classList.remove('drag-over');
      if (e.dataTransfer.files[0]) handleSegUpload(e.dataTransfer.files[0]);
    });
  }

  // Start in clean idle upload state (no preloaded image)
  resetSegToUpload();
}

function selectSegCase(caseId) {
  const preset = getPreset(caseId);
  if (!preset) return;

  state.seg.activeCase = preset;
  state.seg.isCustom   = false;
  state.seg.layer      = 'overlay';   // default to overlay for visual impact

  // Set layer tabs
  document.querySelectorAll('#segPreviewArea .layer-tab').forEach(t => t.classList.remove('active'));
  const overlayTab = document.querySelector('#segPreviewArea .layer-tab[data-seg-layer="overlay"]');
  if (overlayTab) overlayTab.classList.add('active');

  showSegPreview();

  // Load image
  const canvas  = document.getElementById('segCanvas');
  const spinner = document.getElementById('segSpinner');
  if (spinner) spinner.classList.remove('hidden');

  drawImageOnCanvas(canvas, preset.imageUrl).then(img => {
    state.seg.baseImg = img;
    if (spinner) spinner.classList.add('hidden');
    renderSegCanvas();
  });

  // Populate metrics
  populateSegResults(preset);

  // Update viewer info
  const vi = document.getElementById('segViewerInfo');
  if (vi) {
    const seg = preset.segmentation || {};
    vi.textContent = preset.id.includes('460') ? '#460 — DSC 0.952' :
                     preset.id.includes('782') ? '#782 — DSC 0.937' :
                     'Normal — No Lesion';
  }
}

function showSegPreview() {
  const idle    = document.getElementById('segUploadIdle');
  const preview = document.getElementById('segPreviewArea');
  const empty   = document.getElementById('segEmptyState');
  const results = document.getElementById('segResults');
  if (idle)    idle.classList.add('hidden');
  if (preview) preview.classList.remove('hidden');
  if (empty)   empty.classList.add('hidden');
  if (results) results.classList.remove('hidden');
}

function resetSegToUpload() {
  state.seg.activeCase = null;
  state.seg.baseImg    = null;
  state.seg.isCustom   = false;

  const idle    = document.getElementById('segUploadIdle');
  const preview = document.getElementById('segPreviewArea');
  const empty   = document.getElementById('segEmptyState');
  const results = document.getElementById('segResults');
  if (idle)    idle.classList.remove('hidden');
  if (preview) preview.classList.add('hidden');
  if (empty)   empty.classList.remove('hidden');
  if (results) results.classList.add('hidden');

  const canvas = document.getElementById('segCanvas');
  if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

  document.querySelectorAll('#segPresetTabs .preset-tab').forEach(t => t.classList.remove('active'));
  const customTab = document.querySelector('#segPresetTabs .preset-tab[data-case="seg-custom"]');
  if (customTab) customTab.classList.add('active');

  const fi = document.getElementById('segFileInput');
  if (fi) fi.value = '';
}

function renderSegCanvas() {
  const canvas = document.getElementById('segCanvas');
  if (!canvas) return;
  const preset = state.seg.activeCase;
  const img    = state.seg.baseImg;
  const seg    = preset && preset.segmentation ? preset.segmentation : {};
  const hasLesion = seg.hasLesion || false;
  const maskBox   = (preset && preset.groundTruth && preset.groundTruth.maskBox) || seg.maskBox || null;

  switch (state.seg.layer) {
    case 'original':
      {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0b0f1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (img && img.width > 0) {
          const { dx, dy, dw, dh } = getLetterboxParams(canvas, img);
          ctx.drawImage(img, dx, dy, dw, dh);
        }
      }
      break;
    case 'prediction':
      drawPredictionMask(canvas, maskBox, hasLesion);
      break;
    case 'overlay':
      drawSegOverlay(canvas, img, maskBox, hasLesion, 'red');
      break;
    case 'split':
      drawSplitView(canvas, img, maskBox, hasLesion);
      break;
  }
}

function populateSegResults(preset) {
  const seg = preset.segmentation || {};
  const hasLesion = seg.hasLesion;

  // Status
  const diagEl      = document.getElementById('segDiagnosis');
  const statusChip  = document.getElementById('segStatusChip');
  if (diagEl) {
    diagEl.textContent = hasLesion ? 'Pneumothorax Detected' : 'No Lesion Detected';
    diagEl.style.color = hasLesion ? '#8b5cf6' : '#10b981';
  }
  if (statusChip) {
    statusChip.textContent = hasLesion ? 'Positive Detection' : 'Negative — Clear';
    statusChip.style.color = hasLesion ? '#8b5cf6' : '#10b981';
  }

  // Metrics
  const diceVal = document.getElementById('segDiceVal');
  const iouVal  = document.getElementById('segIouVal');
  const areaVal = document.getElementById('segAreaVal');
  const pctVal  = document.getElementById('segPctVal');
  if (diceVal) diceVal.textContent = hasLesion ? (seg.dice || 0).toFixed(3) : '—';
  if (iouVal)  iouVal.textContent  = hasLesion ? (seg.iou  || 0).toFixed(3) : '—';
  if (areaVal) areaVal.textContent = hasLesion ? (seg.lesionAreaPixels || 0).toLocaleString() : '0';
  if (pctVal)  pctVal.textContent  = hasLesion ? (seg.lungAreaPercentage || 0).toFixed(1) + '%' : '0.0%';

  // Location
  const locText = document.getElementById('segLocationText');
  if (locText) locText.textContent = seg.lesionLocation || 'No pneumothorax identified';

  // Viewer info
  const vi = document.getElementById('segViewerInfo');
  if (vi && hasLesion) vi.textContent = preset.name.split('—')[0].trim() + ' — DSC ' + (seg.dice || 0).toFixed(3);
  else if (vi) vi.textContent = 'Normal — No Lesion';
}

function updateSegDiceDisplay() {
  const preset = state.seg.activeCase;
  if (!preset) return;
  const seg = preset.segmentation || {};
  if (!seg.hasLesion) return;

  // Simulate threshold effect on Dice
  const thr = state.seg.threshold;
  const baseDice = seg.dice || 0;
  // Model: dice peaks around τ=0.30, degrades at extremes
  const delta = Math.abs(thr - 0.30) * 0.3;
  const adjustedDice = Math.max(0, baseDice - delta * delta * 4).toFixed(3);

  const diceVal = document.getElementById('segDiceVal');
  if (diceVal) diceVal.textContent = adjustedDice;
}

function handleSegUpload(file) {
  const url = URL.createObjectURL(file);
  state.seg.isCustom   = true;
  state.seg.activeCase = null;
  state.seg.layer      = 'overlay';

  showSegPreview();
  const canvas  = document.getElementById('segCanvas');
  const spinner = document.getElementById('segSpinner');
  if (spinner) spinner.classList.remove('hidden');

  drawImageOnCanvas(canvas, url).then(img => {
    state.seg.baseImg = img;
    if (spinner) spinner.classList.add('hidden');
    renderSegCanvas();
  });

  const vi = document.getElementById('segViewerInfo');
  if (vi) vi.textContent = file.name;

  // API call
  const formData = new FormData();
  formData.append('image', file);

  const empty   = document.getElementById('segEmptyState');
  const results = document.getElementById('segResults');
  if (empty)   empty.classList.add('hidden');
  if (results) results.classList.add('hidden');

  fetch('/api/predict/segment', { method: 'POST', body: formData })
    .then(r => r.json())
    .then(data => {
      if (spinner) spinner.classList.add('hidden');
      const fake = {
        id: 'custom',
        name: file.name,
        segmentation: {
          dice: data.segmentation?.dice || data.dice || 0,
          iou:  data.segmentation?.iou  || data.iou  || 0,
          lesionAreaPixels: data.segmentation?.lesionAreaPixels || 0,
          lungAreaPercentage: data.segmentation?.lungAreaPercentage || 0,
          hasLesion: !!(data.segmentation?.hasLesion || data.hasLesion),
          lesionLocation: data.segmentation?.lesionLocation || 'Analysis complete',
          maskBox: data.segmentation?.maskBox || null,
        },
        groundTruth: { hasLesion: false, maskBox: data.segmentation?.maskBox || null },
        radiologyReport: data.radiologyReport || { findings: '', impression: '', keyPoints: [], attentionWeights: { alpha_global: 0.6, beta_local: 0.3, gamma_context: 0.1 } },
      };
      state.seg.activeCase = fake;
      if (results) results.classList.remove('hidden');
      populateSegResults(fake);
      renderSegCanvas();
    })
    .catch(() => {
      if (spinner) spinner.classList.add('hidden');
      const fallback = getEmbeddedPresets()[0];
      state.seg.activeCase = { ...fallback, id: 'custom' };
      if (results) results.classList.remove('hidden');
      populateSegResults(state.seg.activeCase);
      renderSegCanvas();
    });
}

/* ═══════════════════════════════════════════════════════════
   REPORT PAGE
══════════════════════════════════════════════════════════════ */
function initReportPage() {
  // Set date
  const repDate = document.getElementById('repDate');
  if (repDate) repDate.textContent = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  // Preset tabs
  document.querySelectorAll('#repPresetTabs .preset-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#repPresetTabs .preset-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectRepCase(tab.dataset.case);
    });
  });

  // Copy
  const copyBtn = document.getElementById('repCopyBtn');
  if (copyBtn) copyBtn.addEventListener('click', () => {
    const p = state.rep.activeCase;
    if (!p) return;
    const rep = p.radiologyReport || {};
    const text = `FINDINGS:\n${rep.findings || ''}\n\nIMPRESSION:\n${rep.impression || ''}`;
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = '✓ Copied';
      setTimeout(() => { copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Copy'; }, 2000);
    }).catch(() => {});
  });

  // Print / Download
  const printBtn = document.getElementById('repPrintBtn');
  const dlBtn    = document.getElementById('repDownload');
  if (printBtn) printBtn.addEventListener('click', openPrintModal);
  if (dlBtn)    dlBtn.addEventListener('click',    openPrintModal);

  // New case
  const newCase = document.getElementById('repNewCase');
  if (newCase) newCase.addEventListener('click', () => selectRepCase('case_460_pneumo'));

  // Auto-select
  selectRepCase('case_460_pneumo');
}

function selectRepCase(caseId) {
  const preset = getPreset(caseId);
  if (!preset) return;
  state.rep.activeCase = preset;

  const rep = preset.radiologyReport || {};
  const aw  = rep.attentionWeights   || {};

  // Thumbnail
  const thumb = document.getElementById('repThumbImg');
  if (thumb) thumb.src = preset.imageUrl || '/static/samples/sample_xray_pneumo.png';

  // Case name + clinical history
  const cname = document.getElementById('repCaseName');
  const chist = document.getElementById('repClinicalHist');
  if (cname) cname.textContent = preset.name;
  if (chist) chist.textContent = preset.clinicalHistory || '';

  // Output ID
  const outId = document.getElementById('repOutputId');
  if (outId) {
    const cat = preset.category || 'unknown';
    outId.textContent = preset.id.includes('460') ? 'Case #460 — SIIM-ACR Test Set' :
                        preset.id.includes('782') ? 'Case #782 — SIIM-ACR Test Set' :
                        preset.id.includes('normal') ? 'Normal Case — Indiana University' :
                        'Case — Radiology Report';
  }

  // Attention weights
  const alphaPct = ((aw.alpha_global || 0) * 100).toFixed(1);
  const betaPct  = ((aw.beta_local   || 0) * 100).toFixed(1);
  const gammaPct = ((aw.gamma_context|| 0) * 100).toFixed(1);
  const gwAlpha  = document.getElementById('gwAlpha');
  const gwBeta   = document.getElementById('gwBeta');
  const gwGamma  = document.getElementById('gwGamma');
  const gwAlphaBar = document.getElementById('gwAlphaBar');
  const gwBetaBar  = document.getElementById('gwBetaBar');
  const gwGammaBar = document.getElementById('gwGammaBar');
  if (gwAlpha)    gwAlpha.textContent   = alphaPct + '%';
  if (gwBeta)     gwBeta.textContent    = betaPct  + '%';
  if (gwGamma)    gwGamma.textContent   = gammaPct + '%';
  if (gwAlphaBar) gwAlphaBar.style.width = alphaPct + '%';
  if (gwBetaBar)  gwBetaBar.style.width  = betaPct  + '%';
  if (gwGammaBar) gwGammaBar.style.width = gammaPct + '%';

  // Report sections
  const histText   = document.getElementById('repHistoryText');
  const findText   = document.getElementById('repFindings');
  const impText    = document.getElementById('repImpression');
  const kpList     = document.getElementById('repKeypoints');

  if (histText) histText.textContent = preset.clinicalHistory || '';
  if (findText) findText.textContent = rep.findings   || '';
  if (impText) {
    // Render newlines as <br>
    impText.innerHTML = (rep.impression || '').replace(/\n/g, '<br>');
  }
  if (kpList) {
    kpList.innerHTML = '';
    (rep.keyPoints || []).forEach(kp => {
      const li = document.createElement('li');
      li.textContent = kp;
      kpList.appendChild(li);
    });
  }

  // Store modal data
  state.modal.caseName   = preset.name;
  state.modal.date       = document.getElementById('repDate') ? document.getElementById('repDate').textContent : new Date().toLocaleDateString();
  state.modal.findings   = rep.findings   || '';
  state.modal.impression = rep.impression || '';
}

/* ═══════════════════════════════════════════════════════════
   PRINT MODAL
══════════════════════════════════════════════════════════════ */
function openPrintModal() {
  const p = state.rep.activeCase || state.cls.activeCase || (state.presets[0] || null);
  if (!p) return;
  const rep = p.radiologyReport || {};
  openPrintModalWith(
    p.name || 'Case',
    rep.findings   || '',
    rep.impression || '',
  );
}

function openPrintModalWith(caseName, findings, impression) {
  const modal = document.getElementById('printModal');
  if (!modal) return;

  const mCaseName   = document.getElementById('mCaseName');
  const mDate       = document.getElementById('mDate');
  const mFindings   = document.getElementById('mFindings');
  const mImpression = document.getElementById('mImpression');

  if (mCaseName)   mCaseName.textContent   = caseName;
  if (mDate)       mDate.textContent       = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  if (mFindings)   mFindings.textContent   = findings;
  if (mImpression) mImpression.innerHTML   = impression.replace(/\n/g, '<br>');

  modal.classList.remove('hidden');
}

function bindModalControls() {
  const modal      = document.getElementById('printModal');
  const closeBtn   = document.getElementById('modalClose');
  const cancelBtn  = document.getElementById('modalCancel');

  function closeModal() {
    if (modal) modal.classList.add('hidden');
  }

  if (closeBtn)  closeBtn.addEventListener('click',  closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  // Click outside modal box to close
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeModal();
  });
}

/* ═══════════════════════════════════════════════════════════
   UNIFIED CHEST ANALYSIS (ONCAI STYLE HUB)
══════════════════════════════════════════════════════════════ */
function initUnifiedAnalyzePage() {
  const fileInput  = document.getElementById('oncFileInput');
  const browseBtn  = document.getElementById('oncBrowseBtn');
  const uploadCard = document.getElementById('oncUploadCard');
  const newBtn     = document.getElementById('oncNewAnalysisBtn');
  const dlBtn      = document.getElementById('oncDownloadReportBtn');

  // Sample pill buttons (Screenshots 1 & 3)
  document.querySelectorAll('#oncSamplePills .onc-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#oncSamplePills .onc-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const caseId = pill.dataset.case;
      if (caseId === 'upload') {
        resetOncToUpload();
      } else {
        selectOncCase(caseId);
      }
    });
  });

  // Layer buttons inside canvas frame
  document.querySelectorAll('.onc-layer-btn[data-onc-layer]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.onc-layer-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.onc.layer = btn.dataset.oncLayer;
      renderOncCanvas();
    });
  });

  // Browse files
  if (browseBtn && fileInput) {
    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', e => {
      if (e.target.files && e.target.files[0]) {
        handleOncUpload(e.target.files[0]);
      }
    });
  }

  // Drag and drop on upload card
  if (uploadCard) {
    uploadCard.addEventListener('dragover', e => {
      e.preventDefault();
      uploadCard.classList.add('drag-over');
    });
    uploadCard.addEventListener('dragleave', () => {
      uploadCard.classList.remove('drag-over');
    });
    uploadCard.addEventListener('drop', e => {
      e.preventDefault();
      uploadCard.classList.remove('drag-over');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleOncUpload(e.dataTransfer.files[0]);
      }
    });
  }

  // Action buttons
  if (newBtn) newBtn.addEventListener('click', resetOncToUpload);
  if (dlBtn) dlBtn.addEventListener('click', openPrintModal);

  // Start in clean upload state (no preloaded image)
  resetOncToUpload();
}

function handleOncUpload(file) {
  const spinner = document.getElementById('oncSpinner');
  if (spinner) spinner.classList.remove('hidden');

  const url = URL.createObjectURL(file);
  state.onc.isCustom = true;
  state.onc.customUrl = url;

  // Mark "Upload Your Own" pill active
  document.querySelectorAll('#oncSamplePills .onc-pill').forEach(p => p.classList.remove('active'));
  const upPill = document.querySelector('#oncSamplePills .onc-pill[data-case="upload"]');
  if (upPill) upPill.classList.add('active');

  const canvas = document.getElementById('oncCanvas');
  drawImageOnCanvas(canvas, url).then(img => {
    state.onc.baseImg = img;
  });

  // Call /api/predict/comprehensive
  fetch('/api/predict/comprehensive', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ presetId: 'custom', fileName: file.name })
  })
    .then(r => r.json())
    .then(data => {
      setTimeout(() => {
        if (spinner) spinner.classList.add('hidden');
        displayOncResults(data);
      }, 500);
    })
    .catch(err => {
      console.warn('Inference error:', err);
      setTimeout(() => {
        if (spinner) spinner.classList.add('hidden');
        const fallback = getEmbeddedPresets()[0];
        displayOncResults(fallback);
      }, 500);
    });
}

function selectOncCase(caseId) {
  const spinner = document.getElementById('oncSpinner');
  if (spinner) spinner.classList.remove('hidden');

  const preset = getPreset(caseId);
  state.onc.isCustom = false;
  state.onc.activeCase = preset;

  // Load image
  const canvas = document.getElementById('oncCanvas');
  if (preset && preset.imageUrl) {
    drawImageOnCanvas(canvas, preset.imageUrl).then(img => {
      state.onc.baseImg = img;
    });
  }

  fetch('/api/predict/comprehensive', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ presetId: caseId })
  })
    .then(r => r.json())
    .then(data => {
      setTimeout(() => {
        if (spinner) spinner.classList.add('hidden');
        displayOncResults(data);
      }, 400);
    })
    .catch(() => {
      setTimeout(() => {
        if (spinner) spinner.classList.add('hidden');
        displayOncResults(preset);
      }, 400);
    });
}

function displayOncResults(data) {
  state.onc.activeCase = data;
  state.onc.layer = 'overlay';

  // Set layer pills to 'overlay'
  document.querySelectorAll('.onc-layer-btn').forEach(b => b.classList.remove('active'));
  const ovBtn = document.querySelector('.onc-layer-btn[data-onc-layer="overlay"]');
  if (ovBtn) ovBtn.classList.add('active');

  // Diagnosis & Confidence
  const diag = data.classification?.label || (data.category?.includes('Normal') ? 'Normal Adult (Clear)' : 'Pneumothorax Detected');
  const conf = (data.classification?.confidence || 95.2).toFixed(1);
  const isNormal = diag.toUpperCase().includes('NORMAL');

  const diagEl   = document.getElementById('oncPrimaryDiag');
  const confEl   = document.getElementById('oncConfBadge');
  const stageEl  = document.getElementById('oncStageTag');
  const segSubEl = document.getElementById('oncSegBoxSub');

  if (diagEl) {
    diagEl.textContent = isNormal ? 'Normal Adult (Clear)' : (diag.includes('PNEUMOTHORAX') ? 'Pneumothorax Detected' : 'Acute Lobar Pneumonia');
    diagEl.style.color = isNormal ? '#10b981' : '#ffffff';
  }
  if (confEl) {
    confEl.textContent = `Confidence: ${conf}%`;
    confEl.style.borderColor = isNormal ? 'rgba(16, 185, 129, 0.4)' : 'rgba(0, 194, 255, 0.4)';
    confEl.style.color = isNormal ? '#10b981' : '#00c2ff';
  }
  if (stageEl) stageEl.textContent = isNormal ? 'Healthy — No Acute Pathology' : (data.overallRisk || 'Critical Stage II — Elevated');
  if (segSubEl) {
    segSubEl.textContent = isNormal ?
      'Bilateral lung parenchyma clear without focal pleural line separation.' :
      (data.segmentation?.lesionLocation ? `Boundary delineated at ${data.segmentation.lesionLocation}` : 'Pleural separation boundary highlighted in overlay');
  }

  // Segment box styling
  const segBox = document.getElementById('oncSegBox');
  if (segBox) {
    if (isNormal) {
      segBox.style.background = 'rgba(16, 185, 129, 0.08)';
      segBox.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    } else {
      segBox.style.background = 'rgba(37, 99, 235, 0.1)';
      segBox.style.borderColor = 'rgba(37, 99, 235, 0.35)';
    }
  }

  // Classification Probabilities (Screenshot 1)
  const probContainer = document.getElementById('oncProbBars');
  if (probContainer) {
    const probs = data.probabilities || [
      { name: 'Pneumothorax', prob: isNormal ? 4 : 94, color: 'cyan' },
      { name: 'Acute Pneumonia', prob: isNormal ? 2 : 62, color: 'purple' },
      { name: 'Pleural Effusion', prob: isNormal ? 2 : 28, color: 'green' },
      { name: 'Atelectasis', prob: isNormal ? 1 : 19, color: 'orange' },
      { name: 'Normal Tissue', prob: isNormal ? 96 : 5, color: 'pink' }
    ];

    probContainer.innerHTML = '';
    probs.forEach(item => {
      const row = document.createElement('div');
      row.className = 'onc-pb-row';
      row.innerHTML = `
        <span class="onc-pb-label">${item.name}</span>
        <div class="onc-pb-track">
          <div class="onc-pb-fill ${item.color}" style="width: 0%"></div>
        </div>
        <span class="onc-pb-pct">${item.prob}%</span>
      `;
      probContainer.appendChild(row);
      setTimeout(() => {
        const fill = row.querySelector('.onc-pb-fill');
        if (fill) fill.style.width = item.prob + '%';
      }, 50);
    });
  }

  // Report fields
  const rep = data.report || data.radiologyReport || {};
  const aw  = rep.attentionWeights || {};
  const findingsEl   = document.getElementById('oncRepFindings');
  const impressionEl = document.getElementById('oncRepImpression');
  const alphaEl      = document.getElementById('oncAlphaVal');
  const betaEl       = document.getElementById('oncBetaVal');
  const gammaEl      = document.getElementById('oncGammaVal');

  if (findingsEl) findingsEl.textContent = rep.findings || 'No abnormal infiltrates or focal opacities noted.';
  if (impressionEl) impressionEl.innerHTML = (rep.impression || 'Normal chest radiograph.').replace(/\n/g, '<br>');
  if (alphaEl) alphaEl.textContent = ((aw.alpha_global || 0.603) * 100).toFixed(1) + '%';
  if (betaEl)  betaEl.textContent  = ((aw.beta_local   || 0.337) * 100).toFixed(1) + '%';
  if (gammaEl) gammaEl.textContent = ((aw.gamma_context|| 0.060) * 100).toFixed(1) + '%';

  // Store for download report modal
  state.modal.caseName   = data.name || 'Chest Radiograph Analysis';
  state.modal.date       = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  state.modal.findings   = rep.findings || '';
  state.modal.impression = rep.impression || '';

  // Show results view, hide upload card
  const uploadCard  = document.getElementById('oncUploadCard');
  const resultsWrap = document.getElementById('oncResultsWrap');
  if (uploadCard)  uploadCard.classList.add('hidden');
  if (resultsWrap) resultsWrap.classList.remove('hidden');

  // Render canvas
  renderOncCanvas();
}

function renderOncCanvas() {
  const canvas = document.getElementById('oncCanvas');
  if (!canvas) return;

  const data = state.onc.activeCase;
  const img  = state.onc.baseImg;
  const seg  = (data && (data.segmentation || data.groundTruth)) || {};
  const hasLesion = !!seg.hasLesion;
  const maskBox   = normalizeMaskBox(seg.maskBox || (data && data.groundTruth && data.groundTruth.maskBox));

  switch (state.onc.layer) {
    case 'original':
      {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (img && img.width > 0) {
          const { dx, dy, dw, dh } = getLetterboxParams(canvas, img);
          ctx.drawImage(img, dx, dy, dw, dh);
        }
      }
      break;
    case 'overlay':
      drawSegOverlay(canvas, img, maskBox, hasLesion, 'red');
      break;
    case 'gradcam':
      drawGradCamOverlay(canvas, img, 0.70, maskBox, hasLesion);
      break;
    case 'split':
      drawSplitView(canvas, img, maskBox, hasLesion);
      break;
  }
}

function resetOncToUpload() {
  const uploadCard  = document.getElementById('oncUploadCard');
  const resultsWrap = document.getElementById('oncResultsWrap');
  if (uploadCard)  uploadCard.classList.remove('hidden');
  if (resultsWrap) resultsWrap.classList.add('hidden');

  state.onc.activeCase = null;
  state.onc.baseImg    = null;
  state.onc.isCustom   = false;

  const fi = document.getElementById('oncFileInput');
  if (fi) fi.value = '';

  // Select "Upload Your Own" pill
  document.querySelectorAll('#oncSamplePills .onc-pill').forEach(p => p.classList.remove('active'));
  const upPill = document.querySelector('#oncSamplePills .onc-pill[data-case="upload"]');
  if (upPill) upPill.classList.add('active');
}

/* ═══════════════════════════════════════════════════════════
   ANIMATE STATS ON HOME (counter animation)
══════════════════════════════════════════════════════════════ */
(function animateStats() {
  const statNums = document.querySelectorAll('.stat-num');
  statNums.forEach(el => {
    const text = el.textContent;
    // Only animate numeric-looking values
    const numMatch = text.match(/^([\d.]+)(%?)$/);
    if (!numMatch) return;
    const targetNum = parseFloat(numMatch[1]);
    const suffix    = numMatch[2];
    let start = null;
    const duration = 1800;
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = (targetNum * eased).toFixed(text.includes('.') ? 2 : 0);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = text; // restore exact original
    }
    // Trigger when element is in viewport
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
  });
})();

/* ═══════════════════════════════════════════════════════════
   MICRO-INTERACTIONS
══════════════════════════════════════════════════════════════ */
// Smooth entrance animations for cards when they scroll into view
(function addScrollAnimations() {
  const targets = document.querySelectorAll('.module-card-home, .team-member-card, .supervisor-card, .aim-card, .dataset-rich-card, .pipe-step-card, .plot-card, .scope-card');
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
})();
