# 🫁 PulmoVision X-AI
## Explainable Deep Learning System for Chest Radiographs: Multimodal Disease Classification, Lesion Segmentation & Radiology Report Generation

An hospital-grade, explainable clinical decision-support web application for chest radiography interpretation, developed as a Major Project by 7th-Semester B.Tech. CSE (AI & DS) students at Government Hydro Engineering College (GHEC), Bandla, Himachal Pradesh.

---

## 🏛️ Academic & Institutional Details
- **Institute:** Government Hydro Engineering College, Bandla, Bilaspur, Himachal Pradesh (GHEC)
- **Programme:** Bachelor of Technology (B.Tech.) in Computer Science & Engineering (Artificial Intelligence & Data Science)
- **Semester:** 7th Semester (Academic Year 2026)
- **Project Type:** Major Project
- **Project Supervisor:** **Dr. Ravi Kumar**, Assistant Professor, Department of Computer Science & Engineering

### 👥 Project Team
| Member Name | University Roll No. | Key Responsibilities | Professional Profiles |
| :--- | :--- | :--- | :--- |
| **Aman** (Lead) | `23010503008` | Multimodal Deep Learning, Web Architecture, Grad-CAM Pipeline | [LinkedIn](https://www.linkedin.com/in/aman-verma-214ba9304/) • [GitHub](https://github.com/aman5123) • [Email](mailto:amanvrma089@gmail.com) |
| **Samriti** | `23010503053` | UNet++ Architecture, scSE Attention, Threshold Tuning | Department of CSE (AI & DS), GHEC Bandla |
| **Simran** | `23010503064` | Dual-Branch Vision-Language, Report Generation, Attention Gates | Department of CSE (AI & DS), GHEC Bandla |
| **Sparsh Thakur** | `23010503066` | Multi-Source Radiograph Pipelines, Patient Leakage Prevention | Department of CSE (AI & DS), GHEC Bandla |

---

## 🎯 1. Project Aim & Clinical Motivation
In modern clinical practice, thoracic radiographs constitute the most frequently performed diagnostic imaging modality worldwide (>2 billion exams annually). However, critical conditions like acute tension pneumothorax and bacterial pneumonia require rapid diagnosis, yet global shortages of certified thoracic radiologists lead to extensive triage delays and clinician burnout.

Furthermore, traditional medical deep learning models operate as opaque "black boxes", limiting clinical trust. **PulmoVision X-AI** addresses these fundamental challenges by implementing an integrated, tri-fold multimodal deep learning architecture that unifies:
1. **Disease Classification:** Rapid binary screening (Normal vs Pneumonia) with spatial Grad-CAM heatmaps.
2. **Lesion Segmentation:** Sub-millimeter boundary delineation of acute pneumothorax using UNet++ with scSE attention.
3. **Radiology Report Generation:** Natural language medical report synthesis (Findings & Impression) via Dual-Branch Swin-Transformer + Local CNN attention fusion.

---

## 🔬 2. Architecture of the Three Core Modules

### Module 1: Disease Classification (Pneumonia Detection)
- **Backbone:** `EfficientNetV2-S` pretrained on ImageNet and fine-tuned on chest radiographs.
- **Explainability:** Gradient-weighted Class Activation Mapping (`Grad-CAM`) targeted at the top convolutional block.
- **Class Imbalance Remedy:** Fixed stratified 80/10/10 validation split, `WeightedRandomSampler`, and weighted Binary Cross-Entropy loss.
- **Empirical Test Performance (624 Samples):**
  - **Test Accuracy:** `93.11%`
  - **Balanced Accuracy:** `91.58%`
  - **Macro-F1 Score:** `0.9248`
  - **ROC-AUC:** `0.9840`

### Module 2: Lesion Segmentation (Pneumothorax)
- **Architecture:** `UNet++` (Nested UNet) with `EfficientNet-B3` backbone and `scSE` (Spatial and Channel Squeeze & Excitation) decoder attention.
- **Optimization:** Compound loss function:
  $$\mathcal{L}_{\text{compound}} = 0.5 \cdot \mathcal{L}_{\text{Dice}} + 0.5 \cdot \mathcal{L}_{\text{SoftBCE}}$$
- **Post-Processing & Inference:** Horizontal flip Test-Time Augmentation (TTA), validation-tuned optimal threshold ($\tau = 0.30$), and minimum connected component area filter ($600\text{ px}$).
- **Empirical Test Performance (1,068 Images):**
  - **Mean Dice per Image:** `0.8407` (Tuned) vs `0.8249` (Default $\tau=0.50$)
  - **Mean IoU per Image:** `0.8246`
  - **Pixel Specificity:** `0.9993`
  - **Image Specificity:** `0.9771`

### Module 3: Automated Radiology Report Generation
- **Architecture:** Dual-Branch Encoder:
  - *Global Branch:* `Swin-Transformer (Swin-T)` capturing bilateral thoracic cavity symmetry and lung volumes.
  - *Local Branch:* Dense CNN capturing focal opacities, pleural lines, and micro-nodules.
  - *Fusion:* Learned Adaptive Attention Gating:
    $$\mathbf{F}_{\text{fused}} = \alpha \cdot \mathbf{F}_{\text{global}} + \beta \cdot \mathbf{F}_{\text{local}} + \gamma \cdot \mathbf{F}_{\text{context}}$$
  - *Decoder:* `DistilGPT-2` with beam search decoding and n-gram repetition blocking.
- **Empirical Test Performance:**
  - **BLEU-1:** `0.3230` | **BLEU-2:** `0.2043` | **BLEU-3:** `0.1439` | **BLEU-4:** `0.1080`
  - **METEOR:** `0.2899` | **ROUGE-L:** `0.2894`
  - **Mean Gate Weights:** $\alpha = 0.6028$ (Global), $\beta = 0.3375$ (Local), $\gamma = 0.0597$ (Context)

---

## 📊 3. Datasets & Data Engineering

1. **Chest X-Ray Images (Pneumonia) - Cell 2018 (Kermany et al.):**
   - 5,863 pediatric chest X-rays.
   - Refinement: Eliminated the noisy 16-image default validation split by building a clean stratified split with weighted loss.
2. **SIIM-ACR Pneumothorax Segmentation Dataset (vbookshelf):**
   - 12,047 radiographs annotated by thoracic radiologists with pixel-level run-length encoded (RLE) masks.
   - Extreme class imbalance (22.3% positive prevalence) handled via compound loss and morphological area filtering.
3. **Indiana University Chest Radiographs (Open-I / Raddar):**
   - 7,466 paired frontal and lateral radiographs with semi-structured radiology reports.
   - Refinement: De-identification artifact cleaning (regex stripping of age, comparison boilerplate, and repeated `XXXX` placeholders) and patient-level splitting to prevent data leakage.

---

## 🚀 4. How to Run the Web Application

The project includes an ultra-fast, zero-dependency Node.js backend and a modern clinical front-end workstation:

```bash
# 1. Open the project directory
cd "e:\COLLEGE PROJECT\major project\web app"

# 2. Launch the diagnostic server
node server.js
```

Then open your browser at:
👉 **`http://localhost:5000`**

### Features of the Web Workstation:
- **Interactive Radiological Canvas:** Real-time layer toggling between Original, Grad-CAM Heatmap, UNet++ Lesion Mask, Ground-Truth, and Split-Screen.
- **Dynamic Threshold Slider:** Adjust detection threshold from $0.10$ to $0.90$ with instant recalculation of Dice score and lesion pixel area.
- **Grad-CAM Heatmap Tuning:** Customize heatmap opacity ($10\% - 100\%$) and colormaps (*Jet, Turbo, Plasma, Inferno, Viridis*).
- **Preset Clinical Library:** One-click benchmark cases including Acute Right Pneumothorax (#460), Left Apical Pneumothorax (#782), Lobar Pneumonia, and Normal scans.
- **Custom Scan Upload:** Drag-and-drop any standard chest X-ray image for instant triage.
- **Printable Clinical PDF Export:** Generate structured diagnostic summaries with institutional headers.
- **Dark / Light Medical Theme:** Hospital ambient light toggle.

---

## 🔮 5. Future Scope & Translational Pathways
- **Hospital PACS & DICOM Standard Integration:** Direct HL7/FHIR microservice deployment into hospital Picture Archiving and Communication Systems (PACS).
- **3D Volumetric Modalities (CT & MRI):** Expanding UNet++ to 3D volumetric segmentation for High-Resolution Computed Tomography (HRCT).
- **Multilingual Clinical Reporting:** Real-time report translation into Hindi and regional Indian languages to aid rural primary healthcare centers (PHCs).
- **Privacy-Preserving Federated Learning:** Cross-institutional model training without centralizing sensitive patient health information (PHI).
- **Conformal Prediction:** Mathematical certainty bounds with automated escalation of edge cases for mandatory specialist consultation.
