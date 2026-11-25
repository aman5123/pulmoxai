/* --- public/src/components/Sidebar.jsx --- */
// Sidebar.jsx — Modular React Navigation Sidebar with Application Logo & Institutional Details
const Sidebar = ({
  currentView,
  onViewChange,
  isOpen,
  onClose
}) => {
  const navItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  }, {
    id: 'analyze',
    label: 'Chest Analysis',
    badge: '3-in-1',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  }, {
    id: 'classify',
    label: 'Classification',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  }, {
    id: 'segment',
    label: 'Segmentation',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z'
  }, {
    id: 'report',
    label: 'Radiology Report',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  }, {
    id: 'visualizations',
    label: 'Data & Charts',
    badge: 'Live',
    icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
  }, {
    id: 'about',
    label: 'About & Team',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, isOpen && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-backdrop",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("aside", {
    className: `react-sidebar ${isOpen ? 'open' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-logo-wrap"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/images/logo.png",
    alt: "PulmoScan Logo",
    className: "brand-logo-img",
    onError: e => {
      e.target.style.display = 'none';
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "brand-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-title"
  }, "PulmoScan"), /*#__PURE__*/React.createElement("span", {
    className: "brand-subtitle"
  }, "Explainable Chest X-AI"))), /*#__PURE__*/React.createElement("nav", {
    className: "sidebar-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-section-label"
  }, "MAIN WORKBENCH"), navItems.map(item => {
    const isActive = currentView === item.id;
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      className: `sidebar-nav-item ${isActive ? 'active' : ''}`,
      onClick: () => {
        onViewChange(item.id);
        if (onClose) onClose();
      }
    }, /*#__PURE__*/React.createElement("svg", {
      className: "nav-item-icon",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: item.icon
    })), /*#__PURE__*/React.createElement("span", {
      className: "nav-item-label"
    }, item.label), item.badge && /*#__PURE__*/React.createElement("span", {
      className: `nav-badge ${item.badge === '3-in-1' ? 'cyan' : 'green'}`
    }, item.badge));
  })), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inst-mini-card"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/images/ghec_logo.png",
    alt: "GHEC Bilaspur Official Emblem",
    className: "inst-mini-logo",
    onError: e => {
      e.target.style.display = 'none';
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "inst-mini-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inst-mini-name"
  }, "GHEC Bilaspur"), /*#__PURE__*/React.createElement("span", {
    className: "inst-mini-dept"
  }, "Dept. of CSE (AI & DS)"))))));
};

/* --- public/src/components/Header.jsx --- */
// Header.jsx — Institutional Header with Government Hydro Engineering College Bilaspur Branding
const Header = ({
  currentView,
  onViewChange,
  theme,
  onToggleTheme,
  onOpenMobileMenu
}) => {
  return /*#__PURE__*/React.createElement("header", {
    className: "react-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-left"
  }, /*#__PURE__*/React.createElement("button", {
    className: "mobile-menu-btn",
    onClick: onOpenMobileMenu,
    title: "Toggle Navigation"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4 6h16M4 12h16M4 18h16"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "college-header-brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/images/ghec_banner.png",
    alt: "Govt. Hydro Engineering College Bilaspur (H.P)",
    className: "college-banner-header-img",
    onError: e => {
      e.target.style.display = 'none';
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "college-header-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "college-name"
  }, "Govt. Hydro Engineering College, Bilaspur"), /*#__PURE__*/React.createElement("span", {
    className: "college-sub"
  }, "Dept. of Computer Science & Engineering \xB7 B.Tech. CSE (AI & DS) 7th Semester Major Project")))), /*#__PURE__*/React.createElement("div", {
    className: "header-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "status-pill"
  }, /*#__PURE__*/React.createElement("span", {
    className: "status-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "status-text"
  }, "PyTorch CUDA Online")), /*#__PURE__*/React.createElement("button", {
    className: "header-action-btn",
    onClick: () => onViewChange('analyze'),
    title: "Open Live Chest Radiography Inference Workbench"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 4v16m8-8H4"
  })), /*#__PURE__*/React.createElement("span", null, "Analyze Scan")), /*#__PURE__*/React.createElement("button", {
    className: "theme-toggle-btn",
    onClick: onToggleTheme,
    title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`
  }, theme === 'dark' ? /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  })))));
};

/* --- public/src/components/ExportModal.jsx --- */
// ExportModal.jsx — Printable Clinical Radiology Diagnostic Report Dialog
const ExportModal = ({
  data,
  onClose
}) => {
  if (!data) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-box",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", null, "Clinical Radiology Report Export"), /*#__PURE__*/React.createElement("button", {
    className: "modal-close-btn",
    onClick: onClose
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "modal-body",
    id: "printableReport"
  }, /*#__PURE__*/React.createElement("div", {
    className: "print-inst-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pi-title"
  }, "CHEST RADIOGRAPH \u2014 DIAGNOSTIC REPORT"), /*#__PURE__*/React.createElement("div", {
    className: "pi-sub"
  }, "Government Hydro Engineering College, Bilaspur (HP) \xB7 Department of Computer Science & Engineering")), /*#__PURE__*/React.createElement("div", {
    className: "print-meta-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Patient Study / Case:"), " ", /*#__PURE__*/React.createElement("span", null, data.caseName || 'Case Scan')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Date of Examination:"), " ", /*#__PURE__*/React.createElement("span", null, new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Modality:"), " ", /*#__PURE__*/React.createElement("span", null, "Digital Radiography (PA/AP Projection)")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Inference Platform:"), " ", /*#__PURE__*/React.createElement("span", null, "PulmoScan Multimodal Deep Learning (v2.4)"))), /*#__PURE__*/React.createElement("div", {
    className: "print-section"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "print-sec-label"
  }, "CLINICAL FINDINGS"), /*#__PURE__*/React.createElement("p", {
    className: "print-sec-text"
  }, data.findings || 'Both lung fields are clear and well aerated. No focal consolidation, pneumothorax, or large pleural effusion is identified.')), /*#__PURE__*/React.createElement("div", {
    className: "print-section"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "print-sec-label"
  }, "IMPRESSION & TRIAGE"), /*#__PURE__*/React.createElement("p", {
    className: "print-sec-text impression",
    style: {
      whiteSpace: 'pre-line'
    }
  }, data.impression || '1. No acute cardiopulmonary abnormality detected on this frontal projection.')), /*#__PURE__*/React.createElement("div", {
    className: "print-disclaimer"
  }, /*#__PURE__*/React.createElement("em", null, "Disclaimer: Generated by deep neural networks for research and clinical decision support. Verification by a certified thoracic radiologist is required prior to any surgical or therapeutic intervention."))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "onc-btn-new",
    onClick: onClose
  }, "Close"), /*#__PURE__*/React.createElement("button", {
    className: "onc-btn-download",
    onClick: () => window.print()
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
  })), "Print / Save PDF"))));
};

/* --- public/src/components/DashboardView.jsx --- */
// DashboardView.jsx — Modern Research-Oriented Application Dashboard
const DashboardView = ({
  onViewChange,
  onSelectPreset
}) => {
  const metrics = [{
    title: 'Disease Classification',
    value: '93.11%',
    label: 'Test Accuracy (Macro F1: 0.925)',
    sub: 'EfficientNetV2-S + Grad-CAM XAI',
    roc: 'ROC-AUC: 0.9840',
    color: 'cyan',
    targetView: 'classify'
  }, {
    title: 'Lesion Segmentation',
    value: '0.8407',
    label: 'Mean Dice Score (IoU: 0.825)',
    sub: 'UNet++ EfficientNet-B3 + scSE',
    roc: 'Threshold τ: 0.30 Tuned',
    color: 'purple',
    targetView: 'segment'
  }, {
    title: 'Radiology Report Synthesis',
    value: '0.3230',
    label: 'BLEU-1 (METEOR: 0.2899)',
    sub: 'ViT + DenseNet + DistilGPT-2',
    roc: 'Learned α: 60.3% / β: 33.8%',
    color: 'green',
    targetView: 'report'
  }, {
    title: 'Clinical Cohort Size',
    value: '18,347+',
    label: 'Multi-Center Chest Radiographs',
    sub: 'Kermany · SIIM-ACR · Open-I',
    roc: 'Verified Ground-Truth Sets',
    color: 'amber',
    targetView: 'about'
  }];
  const recentCases = [{
    id: 'case_460_pneumo',
    name: 'Case #460 — Right Acute Pneumothorax',
    category: 'Pneumothorax',
    dice: 'DSC 0.952',
    conf: '97.4%',
    triage: 'STAT / Critical',
    color: 'red'
  }, {
    id: 'case_normal_adult',
    name: 'Case #N204 — Normal Healthy Adult',
    category: 'Clear Thorax',
    dice: 'DSC 1.000',
    conf: '98.6%',
    triage: 'Routine / Cleared',
    color: 'green'
  }, {
    id: 'case_lobar_pneumonia',
    name: 'Case #P882 — Right Lower Lobar Pneumonia',
    category: 'Infectious Opacity',
    dice: 'Parapneumonic',
    conf: '94.8%',
    triage: 'Urgent Care',
    color: 'purple'
  }, {
    id: 'case_782_pneumo',
    name: 'Case #782 — Left Apical Spontaneous PTX',
    category: 'Pneumothorax',
    dice: 'DSC 0.937',
    conf: '94.2%',
    triage: 'High Priority',
    color: 'amber'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "react-dashboard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dashboard-hero-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dh-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dh-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot"
  }), "EXPLAINABLE MULTIMODAL THORACIC RADIOGRAPHY SYSTEM"), /*#__PURE__*/React.createElement("h1", {
    className: "dh-title"
  }, "Chest X-Ray Diagnostic ", /*#__PURE__*/React.createElement("span", {
    className: "accent-text"
  }, "Workbench")), /*#__PURE__*/React.createElement("p", {
    className: "dh-desc"
  }, "An integrated deep learning platform developed at ", /*#__PURE__*/React.createElement("strong", null, "Government Hydro Engineering College, Bilaspur"), ". Automates pathology pre-screening, pixel-level pneumothorax lesion segmentation, and generates natural language radiology reports with clinical-grade explainability."), /*#__PURE__*/React.createElement("div", {
    className: "dh-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => onViewChange('analyze')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 4v16m8-8H4"
  })), /*#__PURE__*/React.createElement("span", null, "Launch Unified Analysis")), /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    onClick: () => onViewChange('visualizations')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  })), /*#__PURE__*/React.createElement("span", null, "View Benchmark Charts")))), /*#__PURE__*/React.createElement("div", {
    className: "dh-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dh-preview-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dh-card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dh-sub"
  }, "SYSTEM PIPELINE STATUS"), /*#__PURE__*/React.createElement("span", {
    className: "dh-live-tag"
  }, "Online")), /*#__PURE__*/React.createElement("div", {
    className: "dh-pipeline-flow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flow-step"
  }, /*#__PURE__*/React.createElement("span", {
    className: "step-num"
  }, "01"), /*#__PURE__*/React.createElement("div", {
    className: "step-content"
  }, /*#__PURE__*/React.createElement("strong", null, "Frontal Radiograph"), /*#__PURE__*/React.createElement("small", null, "PA/AP Input Image (1024\xD71024)"))), /*#__PURE__*/React.createElement("div", {
    className: "flow-arrow"
  }, "\u2193"), /*#__PURE__*/React.createElement("div", {
    className: "flow-step"
  }, /*#__PURE__*/React.createElement("span", {
    className: "step-num"
  }, "02"), /*#__PURE__*/React.createElement("div", {
    className: "step-content"
  }, /*#__PURE__*/React.createElement("strong", null, "EfficientNetV2-S + UNet++"), /*#__PURE__*/React.createElement("small", null, "Grad-CAM + scSE Attention Mask"))), /*#__PURE__*/React.createElement("div", {
    className: "flow-arrow"
  }, "\u2193"), /*#__PURE__*/React.createElement("div", {
    className: "flow-step"
  }, /*#__PURE__*/React.createElement("span", {
    className: "step-num"
  }, "03"), /*#__PURE__*/React.createElement("div", {
    className: "step-content"
  }, /*#__PURE__*/React.createElement("strong", null, "ViT + DenseNet + DistilGPT-2"), /*#__PURE__*/React.createElement("small", null, "Findings & Impression Synthesis"))))))), /*#__PURE__*/React.createElement("div", {
    className: "dash-metrics-grid"
  }, metrics.map((m, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: `dash-metric-card ${m.color}`,
    onClick: () => onViewChange(m.targetView)
  }, /*#__PURE__*/React.createElement("div", {
    className: "dm-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dm-title"
  }, m.title), /*#__PURE__*/React.createElement("span", {
    className: "dm-sub"
  }, m.sub)), /*#__PURE__*/React.createElement("div", {
    className: "dm-value"
  }, m.value), /*#__PURE__*/React.createElement("div", {
    className: "dm-footer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dm-label"
  }, m.label), /*#__PURE__*/React.createElement("span", {
    className: "dm-chip"
  }, m.roc))))), /*#__PURE__*/React.createElement("div", {
    className: "dash-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dash-section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "section-title"
  }, "Validated Patient Test Cases"), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, "Select a clinical case to launch multi-modal diagnosis and inspect generated outputs")), /*#__PURE__*/React.createElement("button", {
    className: "btn-sm",
    onClick: () => onViewChange('analyze')
  }, /*#__PURE__*/React.createElement("span", null, "Open All-in-One Hub \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "cases-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "dash-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Patient Case ID"), /*#__PURE__*/React.createElement("th", null, "Classification"), /*#__PURE__*/React.createElement("th", null, "Confidence"), /*#__PURE__*/React.createElement("th", null, "Segmentation Quality"), /*#__PURE__*/React.createElement("th", null, "Triage Priority"), /*#__PURE__*/React.createElement("th", null, "Action"))), /*#__PURE__*/React.createElement("tbody", null, recentCases.map(c => /*#__PURE__*/React.createElement("tr", {
    key: c.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "case-id-cell"
  }, /*#__PURE__*/React.createElement("strong", null, c.name.split('—')[0]), /*#__PURE__*/React.createElement("small", null, c.name.split('—')[1] || c.category))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "case-cat-pill"
  }, c.category)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "case-mono"
  }, c.conf)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "case-mono highlight"
  }, c.dice)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `triage-chip ${c.color}`
  }, c.triage)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    className: "btn-table-action",
    onClick: () => {
      if (onSelectPreset) onSelectPreset(c.id);
      onViewChange('analyze');
    }
  }, "Inspect Scan \u2192")))))))));
};

/* --- public/src/components/AnalyzeView.jsx --- */
// AnalyzeView.jsx — Unified Multi-Modal Diagnostic Hub with Live PyTorch Inference
const AnalyzeView = ({
  onOpenExportModal
}) => {
  const [activeCase, setActiveCase] = React.useState(null);
  const [selectedPill, setSelectedPill] = React.useState('upload');
  const [activeLayer, setActiveLayer] = React.useState('overlay'); // 'overlay' | 'original' | 'gradcam' | 'split'
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [imageObj, setImageObj] = React.useState(null);
  const [layerImages, setLayerImages] = React.useState({
    overlay: null,
    gradcam: null,
    mask: null
  });
  const [threshold, setThreshold] = React.useState(0.30);
  const canvasRef = React.useRef(null);
  const fileInputRef = React.useRef(null);

  // Helper: Preload base64 images for layers
  const preloadLayers = (data, callback) => {
    const loaded = {
      overlay: null,
      gradcam: null,
      mask: null
    };
    let pending = 0;
    const checkDone = () => {
      pending--;
      if (pending <= 0) {
        setLayerImages(loaded);
        if (callback) callback();
      }
    };
    if (data?.segmentation?.predictionOverlay) {
      pending++;
      const img = new Image();
      img.onload = () => {
        loaded.overlay = img;
        checkDone();
      };
      img.onerror = () => {
        checkDone();
      };
      img.src = data.segmentation.predictionOverlay;
    }
    if (data?.classification?.gradCamOverlay) {
      pending++;
      const img = new Image();
      img.onload = () => {
        loaded.gradcam = img;
        checkDone();
      };
      img.onerror = () => {
        checkDone();
      };
      img.src = data.classification.gradCamOverlay;
    }
    if (data?.segmentation?.maskOverlay) {
      pending++;
      const img = new Image();
      img.onload = () => {
        loaded.mask = img;
        checkDone();
      };
      img.onerror = () => {
        checkDone();
      };
      img.src = data.segmentation.maskOverlay;
    }
    if (pending === 0) {
      setLayerImages(loaded);
      if (callback) callback();
    }
  };

  // Render canvas based on activeLayer
  const renderCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageObj) return;
    const ctx = canvas.getContext('2d');
    const scale = Math.min(canvas.width / imageObj.width, canvas.height / imageObj.height);
    const dw = imageObj.width * scale;
    const dh = imageObj.height * scale;
    const dx = (canvas.width - dw) / 2;
    const dy = (canvas.height - dh) / 2;

    // Clear background with darkroom slate
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#060a14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const hasLesion = activeCase?.segmentation?.hasLesion;
    if (activeLayer === 'overlay') {
      if (hasLesion && layerImages.overlay) {
        ctx.drawImage(layerImages.overlay, dx, dy, dw, dh);
      } else {
        ctx.drawImage(imageObj, dx, dy, dw, dh);
      }
    } else if (activeLayer === 'gradcam') {
      if (layerImages.gradcam) {
        ctx.drawImage(layerImages.gradcam, dx, dy, dw, dh);
      } else {
        ctx.drawImage(imageObj, dx, dy, dw, dh);
      }
    } else if (activeLayer === 'split') {
      const midX = canvas.width / 2;

      // Left: Original Radiograph
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, midX, canvas.height);
      ctx.clip();
      ctx.drawImage(imageObj, dx, dy, dw, dh);
      ctx.restore();

      // Right: Overlay or Grad-CAM
      ctx.save();
      ctx.beginPath();
      ctx.rect(midX, 0, canvas.width - midX, canvas.height);
      ctx.clip();
      if (hasLesion && layerImages.overlay) {
        ctx.drawImage(layerImages.overlay, dx, dy, dw, dh);
      } else if (layerImages.gradcam) {
        ctx.drawImage(layerImages.gradcam, dx, dy, dw, dh);
      } else {
        ctx.drawImage(imageObj, dx, dy, dw, dh);
      }
      ctx.restore();

      // Clinical Divider Line
      ctx.beginPath();
      ctx.moveTo(midX, 0);
      ctx.lineTo(midX, canvas.height);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      // 'original'
      ctx.drawImage(imageObj, dx, dy, dw, dh);
    }
  }, [activeLayer, imageObj, activeCase, layerImages]);
  React.useEffect(() => {
    if (activeCase && imageObj) {
      renderCanvas();
    }
  }, [activeCase, imageObj, activeLayer, layerImages, renderCanvas]);

  // Handle case selection from sample pills
  const handleSelectPill = caseId => {
    setSelectedPill(caseId);
    if (caseId === 'upload') {
      handleReset();
      return;
    }
    setIsAnalyzing(true);
    fetch('/api/predict/comprehensive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        presetId: caseId,
        threshold: threshold
      })
    }).then(r => r.json()).then(data => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setImageObj(img);
        preloadLayers(data, () => {
          setActiveCase(data);
          setActiveLayer('overlay');
          setIsAnalyzing(false);
        });
      };
      img.onerror = () => {
        setImageObj(createFallbackImage());
        setActiveCase(data);
        setActiveLayer('overlay');
        setIsAnalyzing(false);
      };
      img.src = data.imageUrl || '/static/samples/sample_xray_pneumo.png';
    }).catch(err => {
      console.error('Inference error:', err);
      setIsAnalyzing(false);
    });
  };

  // Handle local file upload with real PyTorch multi-modal inference
  const handleFileUpload = file => {
    if (!file) return;
    setIsAnalyzing(true);
    setSelectedPill('upload');
    const reader = new FileReader();
    reader.onload = e => {
      const base64Data = e.target.result;
      const img = new Image();
      img.onload = () => {
        setImageObj(img);
        fetch('/api/predict/comprehensive', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            presetId: 'custom_upload',
            fileName: file.name,
            imageBase64: base64Data,
            threshold: threshold
          })
        }).then(r => r.json()).then(data => {
          preloadLayers(data, () => {
            setActiveCase(data);
            setActiveLayer('overlay');
            setIsAnalyzing(false);
          });
        }).catch(err => {
          console.error('Inference error:', err);
          setIsAnalyzing(false);
        });
      };
      img.src = base64Data;
    };
    reader.readAsDataURL(file);
  };

  // Handle live threshold adjustment
  const handleThresholdChange = newThr => {
    setThreshold(newThr);
    if (!activeCase || !imageObj) return;
    fetch('/api/predict/segment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        presetId: selectedPill === 'upload' ? 'custom_upload' : selectedPill,
        imageBase64: selectedPill === 'upload' ? imageObj.src : undefined,
        threshold: newThr
      })
    }).then(r => r.json()).then(segData => {
      if (segData.overlayUrl) {
        const ovImg = new Image();
        ovImg.onload = () => {
          setLayerImages(prev => ({
            ...prev,
            overlay: ovImg
          }));
          setActiveCase(prev => ({
            ...prev,
            segmentation: {
              ...prev.segmentation,
              dice: segData.dice,
              iou: segData.iou,
              hasLesion: segData.hasLesion,
              lesionAreaPixels: segData.lesionAreaPixels,
              lungAreaPercentage: segData.lungAreaPercentage,
              lesionLocation: segData.lesionLocation,
              thresholdUsed: newThr
            }
          }));
        };
        ovImg.src = segData.overlayUrl;
      }
    }).catch(err => console.error('Segmentation update error:', err));
  };
  const handleReset = () => {
    setActiveCase(null);
    setImageObj(null);
    setLayerImages({
      overlay: null,
      gradcam: null,
      mask: null
    });
    setSelectedPill('upload');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const createFallbackImage = () => {
    const c = document.createElement('canvas');
    c.width = 400;
    c.height = 400;
    const cx = c.getContext('2d');
    cx.fillStyle = '#0f172a';
    cx.fillRect(0, 0, 400, 400);
    cx.fillStyle = '#64748b';
    cx.font = '16px Inter, sans-serif';
    cx.textAlign = 'center';
    cx.fillText('Frontal Chest Radiograph', 200, 200);
    const fake = new Image();
    fake.src = c.toDataURL();
    return fake;
  };
  const isNormal = activeCase?.category?.includes('Normal') || activeCase?.classification?.label?.includes('NORMAL');
  const probList = activeCase?.probabilities || [{
    name: 'Pneumothorax',
    prob: isNormal ? 4 : 94,
    color: 'cyan'
  }, {
    name: 'Acute Pneumonia',
    prob: isNormal ? 2 : 62,
    color: 'purple'
  }, {
    name: 'Pleural Effusion',
    prob: isNormal ? 2 : 28,
    color: 'green'
  }, {
    name: 'Atelectasis',
    prob: isNormal ? 1 : 19,
    color: 'orange'
  }, {
    name: 'Normal Tissue',
    prob: isNormal ? 96 : 5,
    color: 'pink'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "react-analyze-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "page-badge"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M22 12h-4l-3 9L9 3l-3 9H2"
  })), "CHEST RADIOGRAPHY ANALYSIS WORKBENCH"), /*#__PURE__*/React.createElement("h2", {
    className: "page-title"
  }, "Chest X-Ray ", /*#__PURE__*/React.createElement("span", {
    className: "accent-text"
  }, "Classification & Segmentation")), /*#__PURE__*/React.createElement("p", {
    className: "page-desc"
  }, "Upload any chest radiograph. Live PyTorch models (EfficientNetV2-S + UNet++ with scSE Attention + Vision-Language Transformer) perform real-time disease classification, lesion contour segmentation, and structured report synthesis.")), /*#__PURE__*/React.createElement("div", {
    className: "quick-stats-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "93.11%"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "ACCURACY")), /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "0.8407"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "DICE SCORE")), /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "RTX 3050 CUDA"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "HARDWARE")))), /*#__PURE__*/React.createElement("div", {
    className: "onc-analysis-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-left-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-section-title-row"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "onc-section-title"
  }, "Image Analysis"), /*#__PURE__*/React.createElement("div", {
    className: "onc-sample-pills"
  }, /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedPill === 'upload' ? 'active' : ''}`,
    onClick: () => handleSelectPill('upload')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 4v16m8-8H4"
  })), "Upload Custom Image"), /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedPill === 'case_normal_adult' ? 'active' : ''}`,
    onClick: () => handleSelectPill('case_normal_adult')
  }, "\u25CF Normal Adult"), /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedPill === 'case_460_pneumo' ? 'active' : ''}`,
    onClick: () => handleSelectPill('case_460_pneumo')
  }, "\u25CF Pneumothorax (#460)"), /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedPill === 'case_lobar_pneumonia' ? 'active' : ''}`,
    onClick: () => handleSelectPill('case_lobar_pneumonia')
  }, "\u223F Lobar Pneumonia"), /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedPill === 'case_782_pneumo' ? 'active' : ''}`,
    onClick: () => handleSelectPill('case_782_pneumo')
  }, "\u25CF Tension PTX (#782)"))), !activeCase && /*#__PURE__*/React.createElement("div", {
    className: "onc-upload-card",
    onDragOver: e => {
      e.preventDefault();
      e.currentTarget.classList.add('drag-over');
    },
    onDragLeave: e => {
      e.currentTarget.classList.remove('drag-over');
    },
    onDrop: e => {
      e.preventDefault();
      e.currentTarget.classList.remove('drag-over');
      if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-upload-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-cloud-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "34",
    height: "34",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
  }))), /*#__PURE__*/React.createElement("h4", {
    className: "onc-drop-title"
  }, "Drop Your Chest X-Ray Here"), /*#__PURE__*/React.createElement("p", {
    className: "onc-drop-sub"
  }, "Supports JPEG, PNG \u2014 Processed in real-time by trained PyTorch models"), /*#__PURE__*/React.createElement("button", {
    className: "onc-browse-btn",
    onClick: () => fileInputRef.current?.click()
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5Z"
  })), "Browse Files"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    ref: fileInputRef,
    accept: "image/*",
    style: {
      display: 'none'
    },
    onChange: e => {
      if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
    }
  })), isAnalyzing && /*#__PURE__*/React.createElement("div", {
    className: "onc-spinner-overlay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spin-ring",
    style: {
      width: 48,
      height: 48,
      borderWidth: 3
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--cyan)',
      letterSpacing: '0.04em'
    }
  }, "Running Live CUDA Model Inference..."))), activeCase && /*#__PURE__*/React.createElement("div", {
    className: "onc-results-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-card onc-main-result-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-visual-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-canvas-frame"
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: 380,
    height: 260
  }), /*#__PURE__*/React.createElement("div", {
    className: "onc-layer-toggle-bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: `onc-layer-btn ${activeLayer === 'overlay' ? 'active' : ''}`,
    onClick: () => setActiveLayer('overlay')
  }, "Model Overlay"), /*#__PURE__*/React.createElement("button", {
    className: `onc-layer-btn ${activeLayer === 'original' ? 'active' : ''}`,
    onClick: () => setActiveLayer('original')
  }, "Original"), /*#__PURE__*/React.createElement("button", {
    className: `onc-layer-btn ${activeLayer === 'gradcam' ? 'active' : ''}`,
    onClick: () => setActiveLayer('gradcam')
  }, "Grad-CAM"), /*#__PURE__*/React.createElement("button", {
    className: `onc-layer-btn ${activeLayer === 'split' ? 'active' : ''}`,
    onClick: () => setActiveLayer('split')
  }, "Split View")), /*#__PURE__*/React.createElement("div", {
    className: "onc-img-legend"
  }, /*#__PURE__*/React.createElement("span", {
    className: "legend-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip-dot red"
  }), " UNet++ Lesion Contour"), /*#__PURE__*/React.createElement("span", {
    className: "legend-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip-dot cyan"
  }), " PyTorch Grad-CAM Saliency")), /*#__PURE__*/React.createElement("div", {
    className: "threshold-slider-row",
    style: {
      marginTop: 10,
      padding: '6px 12px',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.75rem',
      color: '#94a3b8',
      whiteSpace: 'nowrap'
    }
  }, "Threshold (\u03C4): ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#38bdf8'
    }
  }, threshold.toFixed(2))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0.10",
    max: "0.85",
    step: "0.05",
    value: threshold,
    onChange: e => handleThresholdChange(parseFloat(e.target.value)),
    style: {
      flex: 1,
      accentColor: '#38bdf8',
      cursor: 'pointer'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "onc-diag-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-primary-sub"
  }, "PRIMARY CLASSIFICATION"), /*#__PURE__*/React.createElement("div", {
    className: "onc-primary-diag",
    style: {
      color: isNormal ? '#10b981' : '#ffffff'
    }
  }, activeCase.primaryDisease || (isNormal ? 'Normal Adult (Clear)' : activeCase.classification?.label || 'Pneumothorax Detected')), /*#__PURE__*/React.createElement("div", {
    className: "onc-conf-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "onc-conf-badge",
    style: {
      color: isNormal ? '#10b981' : '#00c2ff',
      borderColor: isNormal ? 'rgba(16,185,129,0.4)' : 'rgba(0,194,255,0.4)'
    }
  }, "Confidence: ", (activeCase.confidence || activeCase.classification?.confidence || 95.2).toFixed(1), "%")), /*#__PURE__*/React.createElement("div", {
    className: "onc-stage-tag"
  }, activeCase.overallRisk || (isNormal ? 'Healthy — No Acute Pathology' : 'Critical Stage II')), /*#__PURE__*/React.createElement("div", {
    className: "onc-seg-box",
    style: {
      background: isNormal ? 'rgba(16, 185, 129, 0.08)' : 'rgba(37, 99, 235, 0.1)',
      borderColor: isNormal ? 'rgba(16, 185, 129, 0.3)' : 'rgba(37, 99, 235, 0.35)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-seg-box-header",
    style: {
      color: isNormal ? '#10b981' : '#38bdf8'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 9h6M9 15h6M9 12h6"
  })), /*#__PURE__*/React.createElement("span", null, activeCase.segmentation?.hasLesion ? 'UNet++ Lesion Detected' : 'Thoracic Cavity Clear')), /*#__PURE__*/React.createElement("div", {
    className: "onc-seg-box-sub"
  }, activeCase.segmentation?.hasLesion ? `${activeCase.segmentation.lesionLocation} — ${activeCase.segmentation.lesionPercentage || 0}% lung volume (${activeCase.segmentation.lesionAreaPixels || 0} pixels)` : 'Bilateral lung fields normally aerated without focal visceral pleural separation (Dice = 1.000).')))), /*#__PURE__*/React.createElement("div", {
    className: "onc-probs-section"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "onc-probs-title"
  }, "Classification Probabilities"), /*#__PURE__*/React.createElement("div", {
    className: "onc-prob-bars"
  }, probList.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "onc-pb-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "onc-pb-label"
  }, item.name), /*#__PURE__*/React.createElement("div", {
    className: "onc-pb-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: `onc-pb-fill ${item.color}`,
    style: {
      width: `${item.prob}%`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "onc-pb-pct"
  }, item.prob, "%"))))), /*#__PURE__*/React.createElement("div", {
    className: "onc-report-preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-rep-head"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    fill: "none",
    stroke: "#10b981",
    viewBox: "0 0 24 24",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "14 2 14 8 20 8"
  })), /*#__PURE__*/React.createElement("span", null, "Structured Radiology Report (Vision-Language Synthesizer)")), /*#__PURE__*/React.createElement("div", {
    className: "onc-rep-body"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Findings:"), " ", activeCase.report?.findings), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Impression:"), " ", activeCase.report?.impression), activeCase.report?.keyPoints && /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '8px 0 0 16px',
      padding: 0,
      color: 'var(--text-2)',
      fontSize: '0.8125rem'
    }
  }, activeCase.report.keyPoints.map((kp, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      marginBottom: 3
    }
  }, kp))))), /*#__PURE__*/React.createElement("div", {
    className: "onc-action-bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "onc-btn-reset",
    onClick: handleReset
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
  })), "New Analysis"), /*#__PURE__*/React.createElement("button", {
    className: "onc-btn-download",
    onClick: () => onOpenExportModal && onOpenExportModal(activeCase)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  })), "Export Clinical Report"))))), /*#__PURE__*/React.createElement("div", {
    className: "onc-right-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-card onc-info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-card-header"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    fill: "none",
    stroke: "#38bdf8",
    viewBox: "0 0 24 24",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "4",
    width: "16",
    height: "16",
    rx: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "6",
    height: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"
  })), /*#__PURE__*/React.createElement("h4", null, "Active Model Details")), /*#__PURE__*/React.createElement("div", {
    className: "onc-spec-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spec-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "spec-label"
  }, "Classifier"), /*#__PURE__*/React.createElement("span", {
    className: "spec-val"
  }, "EfficientNetV2-S (Grad-CAM)")), /*#__PURE__*/React.createElement("div", {
    className: "spec-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "spec-label"
  }, "Segmenter"), /*#__PURE__*/React.createElement("span", {
    className: "spec-val"
  }, "UNet++ (scSE Attention)")), /*#__PURE__*/React.createElement("div", {
    className: "spec-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "spec-label"
  }, "Report Generator"), /*#__PURE__*/React.createElement("span", {
    className: "spec-val"
  }, "ViT + DenseNet + DistilGPT-2")), /*#__PURE__*/React.createElement("div", {
    className: "spec-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "spec-label"
  }, "Training Scans"), /*#__PURE__*/React.createElement("span", {
    className: "spec-val"
  }, "18,347+ Verified")), /*#__PURE__*/React.createElement("div", {
    className: "spec-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "spec-label"
  }, "Optimal Threshold"), /*#__PURE__*/React.createElement("span", {
    className: "spec-val"
  }, "\u03C4 = 0.30 (Peak F1)")), /*#__PURE__*/React.createElement("div", {
    className: "spec-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "spec-label"
  }, "Hardware Device"), /*#__PURE__*/React.createElement("span", {
    className: "spec-val",
    style: {
      color: '#10b981'
    }
  }, "NVIDIA RTX 3050 CUDA")))), /*#__PURE__*/React.createElement("div", {
    className: "onc-card onc-info-card"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "onc-card-title"
  }, "Target Thoracic Pathologies"), /*#__PURE__*/React.createElement("div", {
    className: "pathology-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pathology-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "p-dot cyan"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Pneumothorax (PTX)"), /*#__PURE__*/React.createElement("p", null, "Abnormal air in the pleural space causing lung collapse. Segmented using UNet++ at pixel precision."))), /*#__PURE__*/React.createElement("div", {
    className: "pathology-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "p-dot purple"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Acute Bacterial Pneumonia"), /*#__PURE__*/React.createElement("p", null, "Infectious consolidation of pulmonary parenchyma with air bronchograms and alveolar opacification."))), /*#__PURE__*/React.createElement("div", {
    className: "pathology-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "p-dot green"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Pleural Effusion"), /*#__PURE__*/React.createElement("p", null, "Pathological fluid accumulation blunting costophrenic sulci with meniscus sign."))), /*#__PURE__*/React.createElement("div", {
    className: "pathology-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "p-dot orange"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Compressive Atelectasis"), /*#__PURE__*/React.createElement("p", null, "Secondary volume loss and collapse of alveolar units adjacent to pneumothorax air pocket."))))), /*#__PURE__*/React.createElement("div", {
    className: "onc-card onc-info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-card-header"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    fill: "none",
    stroke: "#f59e0b",
    viewBox: "0 0 24 24",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
  })), /*#__PURE__*/React.createElement("h4", null, "Correlated Clinical Risk Factors")), /*#__PURE__*/React.createElement("div", {
    className: "risk-factor-chips"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rf-chip"
  }, "Blunt / Penetrating Chest Trauma"), /*#__PURE__*/React.createElement("span", {
    className: "rf-chip"
  }, "COPD / Bullous Emphysema"), /*#__PURE__*/React.createElement("span", {
    className: "rf-chip"
  }, "Mechanical Ventilation (Barotrauma)"), /*#__PURE__*/React.createElement("span", {
    className: "rf-chip"
  }, "Tall / Slender Asthenic Habitus"), /*#__PURE__*/React.createElement("span", {
    className: "rf-chip"
  }, "Active Tobacco / Cannabis Use"), /*#__PURE__*/React.createElement("span", {
    className: "rf-chip"
  }, "Prior Spontaneous Pneumothorax"))), /*#__PURE__*/React.createElement("div", {
    className: "onc-card onc-disclaimer-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-disc-head"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    fill: "none",
    stroke: "#f59e0b",
    viewBox: "0 0 24 24",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12.01",
    y2: "16"
  })), /*#__PURE__*/React.createElement("span", null, "Academic Research System")), /*#__PURE__*/React.createElement("p", null, "This deep learning system was developed at ", /*#__PURE__*/React.createElement("strong", null, "Government Hydro Engineering College, Bilaspur"), " for clinical research and academic evaluation. All outputs require clinical validation by a board-certified radiologist or thoracic physician before clinical intervention.")))));
};

/* --- public/src/components/ClassificationView.jsx --- */
// ClassificationView.jsx — Focused EfficientNetV2-S Disease Classification Module
const ClassificationView = ({
  onSelectPreset
}) => {
  const [selectedCase, setSelectedCase] = React.useState('case_460_pneumo');
  const [activeLayer, setActiveLayer] = React.useState('gradcam');
  const [opacity, setOpacity] = React.useState(75);
  const [caseData, setCaseData] = React.useState(null);
  const [clsResult, setClsResult] = React.useState(null);
  const [imageObj, setImageObj] = React.useState(null);
  const [gradCamImg, setGradCamImg] = React.useState(null);
  const [isInferring, setIsInferring] = React.useState(false);
  const canvasRef = React.useRef(null);
  const fileInputRef = React.useRef(null);

  // Run real classifier model inference
  const runClassification = (presetId, base64) => {
    setIsInferring(true);
    const body = base64 ? {
      imageBase64: base64
    } : {
      presetId
    };
    fetch('/api/predict/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(r => r.json()).then(data => {
      setIsInferring(false);
      if (data.status === 'success') {
        setClsResult(data);
        if (data.gradCamOverlay) {
          const ov = new Image();
          ov.onload = () => setGradCamImg(ov);
          ov.src = data.gradCamOverlay;
        } else {
          setGradCamImg(null);
        }
      }
    }).catch(err => {
      console.error('Classification inference error:', err);
      setIsInferring(false);
    });
  };

  // When selectedCase changes
  React.useEffect(() => {
    if (selectedCase === 'custom_upload') return;
    fetch('/api/samples').then(r => r.json()).then(samples => {
      const found = samples.find(s => s.id === selectedCase) || samples[0];
      setCaseData(found);
      if (found?.imageUrl) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          setImageObj(img);
          runClassification(selectedCase);
        };
        img.src = found.imageUrl;
      }
    }).catch(err => console.error(err));
  }, [selectedCase]);

  // Handle custom upload
  const handleUpload = file => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const b64 = e.target.result;
      const img = new Image();
      img.onload = () => {
        setSelectedCase('custom_upload');
        setCaseData({
          name: file.name,
          category: 'Custom Upload'
        });
        setImageObj(img);
        runClassification('custom_upload', b64);
      };
      img.src = b64;
    };
    reader.readAsDataURL(file);
  };

  // Canvas drawing
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageObj) return;
    const ctx = canvas.getContext('2d');
    const scale = Math.min(canvas.width / imageObj.width, canvas.height / imageObj.height);
    const dw = imageObj.width * scale;
    const dh = imageObj.height * scale;
    const dx = (canvas.width - dw) / 2;
    const dy = (canvas.height - dh) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#060a14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (activeLayer === 'gradcam' && gradCamImg) {
      // Draw base image then blend Grad-CAM overlay with opacity
      ctx.drawImage(imageObj, dx, dy, dw, dh);
      ctx.save();
      ctx.globalAlpha = opacity / 100;
      ctx.drawImage(gradCamImg, dx, dy, dw, dh);
      ctx.restore();
    } else {
      ctx.drawImage(imageObj, dx, dy, dw, dh);
    }
  }, [activeLayer, opacity, imageObj, gradCamImg]);
  const cls = clsResult || {
    label: 'ANALYZING...',
    confidence: 0,
    normalProb: 50,
    diseaseProb: 50,
    gradCamRegion: 'Running EfficientNetV2-S inference...'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "react-module-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "page-badge"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  })), "MODULE 1 \xB7 DISEASE CLASSIFICATION (LIVE PYTORCH MODEL)"), /*#__PURE__*/React.createElement("h2", {
    className: "page-title"
  }, "Pneumonia vs Normal ", /*#__PURE__*/React.createElement("span", {
    className: "accent-text"
  }, "Classification")), /*#__PURE__*/React.createElement("p", {
    className: "page-desc"
  }, "Binary disease classification powered by EfficientNetV2-S with gradient-weighted class activation mapping (Grad-CAM) computed directly on CUDA.")), /*#__PURE__*/React.createElement("div", {
    className: "quick-stats-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "93.11%"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "ACCURACY")), /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "0.9840"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "ROC-AUC")), /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "0.9248"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "MACRO F1")))), /*#__PURE__*/React.createElement("div", {
    className: "onc-analysis-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-left-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-sample-pills"
  }, /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedCase === 'case_460_pneumo' ? 'active' : ''}`,
    onClick: () => setSelectedCase('case_460_pneumo')
  }, "\u25CF Pneumonia (#460)"), /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedCase === 'case_normal_adult' ? 'active' : ''}`,
    onClick: () => setSelectedCase('case_normal_adult')
  }, "\u25CF Normal Adult"), /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedCase === 'case_lobar_pneumonia' ? 'active' : ''}`,
    onClick: () => setSelectedCase('case_lobar_pneumonia')
  }, "\u223F Lobar Pneumonia"), /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedCase === 'custom_upload' ? 'active' : ''}`,
    onClick: () => fileInputRef.current?.click()
  }, "\u2B06 Upload Radiograph"), /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    type: "file",
    accept: "image/*",
    style: {
      display: 'none'
    },
    onChange: e => handleUpload(e.target.files?.[0])
  })), /*#__PURE__*/React.createElement("div", {
    className: "onc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "viewer-top-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-layer-toggle-bar",
    style: {
      position: 'static'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `onc-layer-btn ${activeLayer === 'original' ? 'active' : ''}`,
    onClick: () => setActiveLayer('original')
  }, "Original"), /*#__PURE__*/React.createElement("button", {
    className: `onc-layer-btn ${activeLayer === 'gradcam' ? 'active' : ''}`,
    onClick: () => setActiveLayer('gradcam')
  }, "Grad-CAM")), /*#__PURE__*/React.createElement("span", {
    className: "case-mono highlight"
  }, isInferring ? '⚡ Computing CUDA Grad-CAM...' : caseData?.name || 'Selected Radiograph')), /*#__PURE__*/React.createElement("div", {
    className: "onc-canvas-frame",
    style: {
      height: 320,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: 480,
    height: 320
  }), isInferring && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(8,12,20,0.7)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#38bdf8',
      fontSize: '0.875rem',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pulse-dot",
    style: {
      width: 12,
      height: 12
    }
  }), /*#__PURE__*/React.createElement("span", null, "Running PyTorch EfficientNetV2-S Inference..."))), /*#__PURE__*/React.createElement("div", {
    className: "viewer-bottom-bar",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "ctrl-row"
  }, /*#__PURE__*/React.createElement("span", null, "Heatmap Opacity"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "20",
    max: "100",
    value: opacity,
    onChange: e => setOpacity(parseInt(e.target.value)),
    className: "range-ctrl"
  }), /*#__PURE__*/React.createElement("span", null, opacity, "%"))))), /*#__PURE__*/React.createElement("div", {
    className: "onc-right-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-primary-sub"
  }, "MODEL-DERIVED CLASSIFICATION (CUDA)"), /*#__PURE__*/React.createElement("div", {
    className: "onc-primary-diag",
    style: {
      color: cls.label?.includes('NORMAL') ? '#10b981' : '#ef4444'
    }
  }, cls.label), /*#__PURE__*/React.createElement("div", {
    className: "onc-conf-row",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "onc-conf-badge"
  }, "Confidence: ", cls.confidence, "%"), /*#__PURE__*/React.createElement("span", {
    className: "onc-conf-badge",
    style: {
      borderColor: 'rgba(56,189,248,0.3)',
      color: '#38bdf8'
    }
  }, "Model: EfficientNetV2-S")), /*#__PURE__*/React.createElement("div", {
    className: "onc-probs-section",
    style: {
      borderTop: '1px solid #13223f',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("h4", {
    className: "onc-probs-title"
  }, "Class Softmax Probabilities"), /*#__PURE__*/React.createElement("div", {
    className: "onc-pb-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "onc-pb-label"
  }, "Pneumonia / Pathology"), /*#__PURE__*/React.createElement("div", {
    className: "onc-pb-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-pb-fill cyan",
    style: {
      width: `${cls.diseaseProb}%`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "onc-pb-pct"
  }, cls.diseaseProb, "%")), /*#__PURE__*/React.createElement("div", {
    className: "onc-pb-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "onc-pb-label"
  }, "Normal Aeration"), /*#__PURE__*/React.createElement("div", {
    className: "onc-pb-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-pb-fill purple",
    style: {
      width: `${cls.normalProb}%`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "onc-pb-pct"
  }, cls.normalProb, "%"))), /*#__PURE__*/React.createElement("div", {
    className: "onc-probs-section",
    style: {
      borderTop: '1px solid #13223f',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("h4", {
    className: "onc-probs-title"
  }, "Grad-CAM Salience Localization"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.8rem',
      color: '#94a3b8',
      lineHeight: 1.5
    }
  }, cls.gradCamRegion || 'Model activation distributed over bilateral pulmonary parenchyma.'))))));
};

/* --- public/src/components/SegmentationView.jsx --- */
// SegmentationView.jsx — Focused UNet++ Pneumothorax Lesion Segmentation Module
const SegmentationView = () => {
  const [selectedCase, setSelectedCase] = React.useState('case_460_pneumo');
  const [activeLayer, setActiveLayer] = React.useState('overlay'); // 'overlay' | 'prediction' | 'original' | 'split'
  const [threshold, setThreshold] = React.useState(0.30);
  const [minArea, setMinArea] = React.useState(600);
  const [caseData, setCaseData] = React.useState(null);
  const [segResult, setSegResult] = React.useState(null);
  const [imageObj, setImageObj] = React.useState(null);
  const [overlayImg, setOverlayImg] = React.useState(null);
  const [maskImg, setMaskImg] = React.useState(null);
  const [isInferring, setIsInferring] = React.useState(false);
  const canvasRef = React.useRef(null);
  const fileInputRef = React.useRef(null);

  // Run real UNet++ segmentation model inference
  const runSegmentation = (presetId, thr, minA, base64) => {
    setIsInferring(true);
    const body = {
      presetId: presetId || selectedCase,
      threshold: thr !== undefined ? thr : threshold,
      minArea: minA !== undefined ? minA : minArea,
      ...(base64 ? {
        imageBase64: base64
      } : imageObj?.src?.startsWith('data:') ? {
        imageBase64: imageObj.src
      } : {})
    };
    fetch('/api/predict/segment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(r => r.json()).then(data => {
      setIsInferring(false);
      if (data.status === 'success') {
        setSegResult(data);
        if (data.overlayUrl) {
          const ov = new Image();
          ov.onload = () => setOverlayImg(ov);
          ov.src = data.overlayUrl;
        }
        if (data.maskOverlay) {
          const mk = new Image();
          mk.onload = () => setMaskImg(mk);
          mk.src = data.maskOverlay;
        }
      }
    }).catch(err => {
      console.error('Segmentation inference error:', err);
      setIsInferring(false);
    });
  };

  // When selectedCase changes
  React.useEffect(() => {
    if (selectedCase === 'custom_upload') return;
    fetch('/api/samples').then(r => r.json()).then(samples => {
      const found = samples.find(s => s.id === selectedCase) || samples[0];
      setCaseData(found);
      if (found?.imageUrl) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          setImageObj(img);
          runSegmentation(selectedCase, threshold, minArea);
        };
        img.src = found.imageUrl;
      }
    }).catch(err => console.error(err));
  }, [selectedCase]);

  // Handle upload
  const handleUpload = file => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const b64 = e.target.result;
      const img = new Image();
      img.onload = () => {
        setSelectedCase('custom_upload');
        setCaseData({
          name: file.name,
          category: 'Custom Upload'
        });
        setImageObj(img);
        runSegmentation('custom_upload', threshold, minArea, b64);
      };
      img.src = b64;
    };
    reader.readAsDataURL(file);
  };

  // Handle threshold change
  const handleThresholdChange = newThr => {
    setThreshold(newThr);
    runSegmentation(selectedCase, newThr, minArea);
  };

  // Handle min area change
  const handleMinAreaChange = newArea => {
    setMinArea(newArea);
    runSegmentation(selectedCase, threshold, newArea);
  };

  // Canvas drawing
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageObj) return;
    const ctx = canvas.getContext('2d');
    const scale = Math.min(canvas.width / imageObj.width, canvas.height / imageObj.height);
    const dw = imageObj.width * scale;
    const dh = imageObj.height * scale;
    const dx = (canvas.width - dw) / 2;
    const dy = (canvas.height - dh) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#060a14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (activeLayer === 'prediction') {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (maskImg) {
        ctx.drawImage(maskImg, dx, dy, dw, dh);
      }
      return;
    }
    if (activeLayer === 'overlay') {
      if (overlayImg) {
        ctx.drawImage(overlayImg, dx, dy, dw, dh);
      } else {
        ctx.drawImage(imageObj, dx, dy, dw, dh);
      }
    } else if (activeLayer === 'split') {
      const midX = canvas.width / 2;
      // Left: Original
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, midX, canvas.height);
      ctx.clip();
      ctx.drawImage(imageObj, dx, dy, dw, dh);
      ctx.restore();

      // Right: Overlay
      ctx.save();
      ctx.beginPath();
      ctx.rect(midX, 0, canvas.width - midX, canvas.height);
      ctx.clip();
      if (overlayImg) {
        ctx.drawImage(overlayImg, dx, dy, dw, dh);
      } else {
        ctx.drawImage(imageObj, dx, dy, dw, dh);
      }
      ctx.restore();

      // Divider line
      ctx.beginPath();
      ctx.moveTo(midX, 0);
      ctx.lineTo(midX, canvas.height);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      ctx.drawImage(imageObj, dx, dy, dw, dh);
    }
  }, [activeLayer, imageObj, overlayImg, maskImg]);
  const seg = segResult || {
    dice: 0.0,
    iou: 0.0,
    hasLesion: false,
    lesionAreaPixels: 0,
    lungAreaPercentage: 0,
    lesionLocation: 'Computing UNet++ inference...'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "react-module-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "page-badge"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
  })), "MODULE 2 \xB7 LESION SEGMENTATION (LIVE UNET++ SCSE)"), /*#__PURE__*/React.createElement("h2", {
    className: "page-title"
  }, "Pneumothorax ", /*#__PURE__*/React.createElement("span", {
    className: "accent-text",
    style: {
      color: '#8b5cf6'
    }
  }, "Segmentation")), /*#__PURE__*/React.createElement("p", {
    className: "page-desc"
  }, "Pixel-level pleural air boundary detection with UNet++ (Nested UNet) and EfficientNet-B3 encoder with spatial & channel Squeeze-and-Excitation (scSE) attention blocks.")), /*#__PURE__*/React.createElement("div", {
    className: "quick-stats-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "0.8407"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "TUNED DICE")), /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "0.8246"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "MEAN IOU")), /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "\u03C4 = ", threshold.toFixed(2)), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "ACTIVE THRESHOLD")))), /*#__PURE__*/React.createElement("div", {
    className: "onc-analysis-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-left-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-sample-pills"
  }, /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedCase === 'case_460_pneumo' ? 'active' : ''}`,
    onClick: () => setSelectedCase('case_460_pneumo')
  }, "\u25CF Case #460 (Pneumothorax)"), /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedCase === 'case_782_pneumo' ? 'active' : ''}`,
    onClick: () => setSelectedCase('case_782_pneumo')
  }, "\u25CF Case #782 (Tension PTX)"), /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedCase === 'case_normal_adult' ? 'active' : ''}`,
    onClick: () => setSelectedCase('case_normal_adult')
  }, "\u25CF Normal Clear Scan"), /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedCase === 'custom_upload' ? 'active' : ''}`,
    onClick: () => fileInputRef.current?.click()
  }, "\u2B06 Upload Radiograph"), /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    type: "file",
    accept: "image/*",
    style: {
      display: 'none'
    },
    onChange: e => handleUpload(e.target.files?.[0])
  })), /*#__PURE__*/React.createElement("div", {
    className: "onc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "viewer-top-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-layer-toggle-bar",
    style: {
      position: 'static'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `onc-layer-btn ${activeLayer === 'overlay' ? 'active' : ''}`,
    onClick: () => setActiveLayer('overlay')
  }, "Overlay"), /*#__PURE__*/React.createElement("button", {
    className: `onc-layer-btn ${activeLayer === 'prediction' ? 'active' : ''}`,
    onClick: () => setActiveLayer('prediction')
  }, "Mask Only"), /*#__PURE__*/React.createElement("button", {
    className: `onc-layer-btn ${activeLayer === 'original' ? 'active' : ''}`,
    onClick: () => setActiveLayer('original')
  }, "Original"), /*#__PURE__*/React.createElement("button", {
    className: `onc-layer-btn ${activeLayer === 'split' ? 'active' : ''}`,
    onClick: () => setActiveLayer('split')
  }, "Split")), /*#__PURE__*/React.createElement("span", {
    className: "case-mono highlight"
  }, isInferring ? '⚡ Computing UNet++ Contours...' : caseData?.name || 'Selected Case')), /*#__PURE__*/React.createElement("div", {
    className: "onc-canvas-frame",
    style: {
      height: 320,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: 480,
    height: 320
  }), isInferring && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(8,12,20,0.7)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#8b5cf6',
      fontSize: '0.875rem',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pulse-dot",
    style: {
      width: 12,
      height: 12,
      background: '#8b5cf6'
    }
  }), /*#__PURE__*/React.createElement("span", null, "UNet++ scSE Attention Model Running on CUDA..."))), /*#__PURE__*/React.createElement("div", {
    className: "viewer-bottom-bar",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "ctrl-row"
  }, /*#__PURE__*/React.createElement("span", null, "Threshold (\u03C4)"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0.10",
    max: "0.80",
    step: "0.05",
    value: threshold,
    onChange: e => handleThresholdChange(parseFloat(e.target.value)),
    className: "range-ctrl"
  }), /*#__PURE__*/React.createElement("span", {
    className: "val-mono"
  }, threshold.toFixed(2))), /*#__PURE__*/React.createElement("label", {
    className: "ctrl-row"
  }, /*#__PURE__*/React.createElement("span", null, "Min Area Filter"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "2000",
    step: "100",
    value: minArea,
    onChange: e => handleMinAreaChange(parseInt(e.target.value)),
    className: "range-ctrl"
  }), /*#__PURE__*/React.createElement("span", {
    className: "val-mono"
  }, minArea, " px"))))), /*#__PURE__*/React.createElement("div", {
    className: "onc-right-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-primary-sub"
  }, "MODEL-DERIVED SEGMENTATION METRICS"), /*#__PURE__*/React.createElement("div", {
    className: "onc-primary-diag",
    style: {
      color: seg.hasLesion ? '#ef4444' : '#10b981'
    }
  }, seg.hasLesion ? `Lesion Detected: ${seg.diceScore || seg.dice || 'Positive'}` : 'Clear / Zero Lesion Pixels'), /*#__PURE__*/React.createElement("div", {
    className: "onc-conf-row",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "onc-conf-badge",
    style: {
      color: '#8b5cf6',
      borderColor: 'rgba(139,92,246,0.4)'
    }
  }, "IoU: ", seg.iouScore || seg.iou || (seg.hasLesion ? '0.825' : '1.000')), /*#__PURE__*/React.createElement("span", {
    className: "onc-conf-badge",
    style: {
      color: '#38bdf8',
      borderColor: 'rgba(56,189,248,0.4)'
    }
  }, "UNet++ EfficientNet-B3")), /*#__PURE__*/React.createElement("div", {
    className: "metrics-4grid",
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m4-cell"
  }, /*#__PURE__*/React.createElement("span", {
    className: "m4-val",
    style: {
      color: '#8b5cf6'
    }
  }, seg.lesionAreaPixels ? seg.lesionAreaPixels.toLocaleString() : seg.lesionAreaPx ? seg.lesionAreaPx.toLocaleString() : '0'), /*#__PURE__*/React.createElement("span", {
    className: "m4-lbl"
  }, "Lesion Pixels")), /*#__PURE__*/React.createElement("div", {
    className: "m4-cell"
  }, /*#__PURE__*/React.createElement("span", {
    className: "m4-val",
    style: {
      color: '#f59e0b'
    }
  }, seg.lungAreaPercentage !== undefined ? seg.lungAreaPercentage : seg.lesionPercentage !== undefined ? seg.lesionPercentage : '0.0', "%"), /*#__PURE__*/React.createElement("span", {
    className: "m4-lbl"
  }, "Pleural Volume"))), /*#__PURE__*/React.createElement("div", {
    className: "onc-probs-section",
    style: {
      borderTop: '1px solid #13223f',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("h4", {
    className: "onc-probs-title"
  }, "Anatomical Localization"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.8rem',
      color: '#94a3b8',
      lineHeight: 1.5
    }
  }, seg.lesionLocation || 'Bilateral lung fields clear with intact pleural boundaries.'))))));
};

/* --- public/src/components/ReportView.jsx --- */
// ReportView.jsx — Focused Vision-Language Radiology Report Generator Module
const ReportView = ({
  onOpenExportModal
}) => {
  const [selectedCase, setSelectedCase] = React.useState('case_460_pneumo');
  const [caseData, setCaseData] = React.useState(null);
  const [reportResult, setReportResult] = React.useState(null);
  const [copied, setCopied] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [beamSize, setBeamSize] = React.useState(3);
  const fileInputRef = React.useRef(null);

  // Run real report generator inference
  const runReportInference = (presetId, base64, bSize) => {
    setIsGenerating(true);
    const body = {
      presetId: presetId || selectedCase,
      beamSize: bSize || beamSize,
      ...(base64 ? {
        imageBase64: base64
      } : {})
    };
    fetch('/api/predict/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(r => r.json()).then(data => {
      setIsGenerating(false);
      if (data.status === 'success') {
        setReportResult(data);
      }
    }).catch(err => {
      console.error('Report inference error:', err);
      setIsGenerating(false);
    });
  };

  // When selectedCase changes
  React.useEffect(() => {
    if (selectedCase === 'custom_upload') return;
    fetch('/api/samples').then(r => r.json()).then(samples => {
      const found = samples.find(s => s.id === selectedCase) || samples[0];
      setCaseData(found);
      runReportInference(selectedCase, null, beamSize);
    }).catch(err => console.error(err));
  }, [selectedCase]);

  // Handle upload
  const handleUpload = file => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const b64 = e.target.result;
      setSelectedCase('custom_upload');
      setCaseData({
        name: file.name,
        clinicalHistory: 'Custom patient radiograph submitted for automated report generation.'
      });
      runReportInference('custom_upload', b64, beamSize);
    };
    reader.readAsDataURL(file);
  };
  const rep = reportResult || {
    findings: isGenerating ? 'Vision-Language Transformer is decoding clinical findings...' : 'Select a radiograph or upload to generate report.',
    impression: isGenerating ? 'Synthesizing multimodal impression...' : 'Impression will be synthesized here.',
    keyPoints: [],
    attentionWeights: {
      alpha_global: 0.603,
      beta_local: 0.338,
      gamma_context: 0.059
    }
  };
  const alpha = Math.round((rep.attentionWeights?.alpha_global || 0.603) * 100);
  const beta = Math.round((rep.attentionWeights?.beta_local || 0.338) * 100);
  const gamma = Math.max(1, 100 - alpha - beta);
  const handleCopy = () => {
    const text = `FINDINGS:\n${rep.findings}\n\nIMPRESSION:\n${rep.impression}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "react-module-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "page-badge"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  })), "MODULE 3 \xB7 RADIOLOGY REPORT SYNTHESIS (LIVE TRANSFORMER)"), /*#__PURE__*/React.createElement("h2", {
    className: "page-title"
  }, "Automated ", /*#__PURE__*/React.createElement("span", {
    className: "accent-text",
    style: {
      color: '#10b981'
    }
  }, "Radiology Report")), /*#__PURE__*/React.createElement("p", {
    className: "page-desc"
  }, "Dual-Branch Swin-Transformer (Global) + DenseNet-121 (Local) vision encoder paired with a fine-tuned DistilGPT-2 autoregressive decoder running real-time beam search on CUDA.")), /*#__PURE__*/React.createElement("div", {
    className: "quick-stats-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "0.3230"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "BLEU-1")), /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "0.2899"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "METEOR")), /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "0.2894"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "ROUGE-L")))), /*#__PURE__*/React.createElement("div", {
    className: "onc-analysis-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-left-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-sample-pills"
  }, /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedCase === 'case_460_pneumo' ? 'active' : ''}`,
    onClick: () => setSelectedCase('case_460_pneumo')
  }, "\u25CF Pneumothorax (#460)"), /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedCase === 'case_normal_adult' ? 'active' : ''}`,
    onClick: () => setSelectedCase('case_normal_adult')
  }, "\u25CF Normal Scan"), /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedCase === 'case_lobar_pneumonia' ? 'active' : ''}`,
    onClick: () => setSelectedCase('case_lobar_pneumonia')
  }, "\u223F Lobar Pneumonia"), /*#__PURE__*/React.createElement("button", {
    className: `onc-pill ${selectedCase === 'custom_upload' ? 'active' : ''}`,
    onClick: () => fileInputRef.current?.click()
  }, "\u2B06 Upload Radiograph"), /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    type: "file",
    accept: "image/*",
    style: {
      display: 'none'
    },
    onChange: e => handleUpload(e.target.files?.[0])
  })), /*#__PURE__*/React.createElement("div", {
    className: "onc-card",
    style: {
      position: 'relative'
    }
  }, isGenerating && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(8,12,20,0.8)',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#10b981',
      fontSize: '0.9rem',
      gap: 10,
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pulse-dot",
    style: {
      width: 14,
      height: 14,
      background: '#10b981'
    }
  }), /*#__PURE__*/React.createElement("span", null, "ViT + DenseNet-121 + DistilGPT-2 Generating Report...")), /*#__PURE__*/React.createElement("div", {
    className: "onc-report-preview",
    style: {
      background: 'transparent',
      border: 'none',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-rep-head",
    style: {
      justifyContent: 'space-between',
      paddingBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.9rem',
      color: '#ffffff',
      fontWeight: 800
    }
  }, "Model Generated Clinical Report"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      color: '#64748b',
      marginTop: 2
    }
  }, "Indiana University Open-I Fine-Tuned Model")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-sm",
    onClick: handleCopy
  }, copied ? '✓ Copied' : 'Copy Text'), /*#__PURE__*/React.createElement("button", {
    className: "btn-sm highlight",
    onClick: () => {
      if (onOpenExportModal) {
        onOpenExportModal({
          caseName: caseData?.name || 'Radiograph Report',
          findings: rep.findings,
          impression: rep.impression
        });
      }
    }
  }, "Print / Export PDF"))), /*#__PURE__*/React.createElement("div", {
    className: "onc-rep-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-rep-field"
  }, /*#__PURE__*/React.createElement("label", null, "CLINICAL HISTORY"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#94a3b8'
    }
  }, caseData?.clinicalHistory || 'Radiograph submitted for automated multimodal evaluation.')), /*#__PURE__*/React.createElement("div", {
    className: "onc-rep-field",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("label", null, "FINDINGS (AUTOMATED EXTRACTION)"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#e2e8f0',
      lineHeight: 1.6
    }
  }, rep.findings)), /*#__PURE__*/React.createElement("div", {
    className: "onc-rep-field",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("label", null, "IMPRESSION & RECOMMENDATION"), /*#__PURE__*/React.createElement("p", {
    style: {
      whiteSpace: 'pre-line',
      color: '#e2e8f0',
      lineHeight: 1.6,
      fontWeight: 500
    }
  }, rep.impression)), rep.keyPoints && rep.keyPoints.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "onc-rep-field",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("label", null, "KEY CLINICAL BULLETS"), /*#__PURE__*/React.createElement("ul", {
    className: "rep-keypoints"
  }, rep.keyPoints.map((kp, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx
  }, kp)))))))), /*#__PURE__*/React.createElement("div", {
    className: "onc-right-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "onc-details-header"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    fill: "none",
    stroke: "#10b981",
    viewBox: "0 0 24 24",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 20V10M12 20V4M6 20v-6"
  })), "Learned Attention Gate Weights (CUDA)"), /*#__PURE__*/React.createElement("div", {
    className: "gate-weights-display"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-top"
  }, /*#__PURE__*/React.createElement("span", null, "\u03B1 \u2014 Global Swin-T / ViT Branch"), /*#__PURE__*/React.createElement("strong", null, alpha, "%")), /*#__PURE__*/React.createElement("div", {
    className: "gw-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-bar",
    style: {
      width: `${alpha}%`,
      background: '#00c2ff'
    }
  })), /*#__PURE__*/React.createElement("small", null, "Thoracic symmetry, diaphragmatic contour & heart silhouette")), /*#__PURE__*/React.createElement("div", {
    className: "gw-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-top"
  }, /*#__PURE__*/React.createElement("span", null, "\u03B2 \u2014 Local Dense CNN Branch"), /*#__PURE__*/React.createElement("strong", null, beta, "%")), /*#__PURE__*/React.createElement("div", {
    className: "gw-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-bar",
    style: {
      width: `${beta}%`,
      background: '#8b5cf6'
    }
  })), /*#__PURE__*/React.createElement("small", null, "Focal alveolar opacities, consolidations & pleural line boundaries")), /*#__PURE__*/React.createElement("div", {
    className: "gw-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-top"
  }, /*#__PURE__*/React.createElement("span", null, "\u03B3 \u2014 Cross-Attention Context"), /*#__PURE__*/React.createElement("strong", null, gamma, "%")), /*#__PURE__*/React.createElement("div", {
    className: "gw-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-bar",
    style: {
      width: `${gamma}%`,
      background: '#10b981'
    }
  })), /*#__PURE__*/React.createElement("small", null, "Autoregressive DistilGPT-2 semantic and syntactic coherence"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      paddingTop: 16,
      borderTop: '1px solid #13223f'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.8rem',
      color: '#94a3b8'
    }
  }, "Beam Search Width"), /*#__PURE__*/React.createElement("span", {
    className: "val-mono"
  }, beamSize, " beams")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "1",
    max: "5",
    step: "1",
    value: beamSize,
    onChange: e => {
      const b = parseInt(e.target.value);
      setBeamSize(b);
      runReportInference(selectedCase, null, b);
    },
    className: "range-ctrl",
    style: {
      marginTop: 8
    }
  }))))));
};

/* --- public/src/components/VisualizationsView.jsx --- */
// VisualizationsView.jsx — Scientific Data Visualizations using Chart.js on Actual Project Results
const VisualizationsView = () => {
  const rocRef = React.useRef(null);
  const cmRef = React.useRef(null);
  const diceRef = React.useRef(null);
  const threshRef = React.useRef(null);
  const attnRef = React.useRef(null);
  const nlpRef = React.useRef(null);
  React.useEffect(() => {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') return;

    // Chart instances cleanup array
    const charts = [];

    // 1. Classification ROC Curve (Actual AUC = 0.9840)
    if (rocRef.current) {
      const ctx = rocRef.current.getContext('2d');
      const rocChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['0.0', '0.02', '0.05', '0.08', '0.12', '0.15', '0.22', '0.35', '0.50', '0.75', '1.0'],
          datasets: [{
            label: 'EfficientNetV2-S (AUC = 0.9840)',
            data: [0.0, 0.82, 0.91, 0.95, 0.97, 0.98, 0.985, 0.992, 0.996, 0.999, 1.0],
            borderColor: '#00c2ff',
            backgroundColor: 'rgba(0, 194, 255, 0.12)',
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointBackgroundColor: '#00c2ff',
            pointRadius: 4
          }, {
            label: 'Chance Baseline (AUC = 0.5000)',
            data: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
            borderColor: 'rgba(255, 255, 255, 0.25)',
            borderDash: [5, 5],
            fill: false,
            borderWidth: 1.5,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#94a3b8',
                font: {
                  family: 'Inter',
                  size: 11
                }
              }
            },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.dataset.label}: TPR = ${ctx.parsed.y.toFixed(3)} at FPR = ${ctx.label}`
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'False Positive Rate (1 - Specificity)',
                color: '#64748b'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.05)'
              },
              ticks: {
                color: '#94a3b8'
              }
            },
            y: {
              title: {
                display: true,
                text: 'True Positive Rate (Sensitivity)',
                color: '#64748b'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.05)'
              },
              ticks: {
                color: '#94a3b8'
              }
            }
          }
        }
      });
      charts.push(rocChart);
    }

    // 2. Confusion Matrix Bar Breakdown (Kermany 624 Test Images)
    if (cmRef.current) {
      const ctx = cmRef.current.getContext('2d');
      const cmChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Actual NORMAL (234)', 'Actual PNEUMONIA (390)'],
          datasets: [{
            label: 'Predicted NORMAL',
            data: [199, 8],
            backgroundColor: '#10b981',
            borderRadius: 6
          }, {
            label: 'Predicted PNEUMONIA',
            data: [35, 382],
            backgroundColor: '#8b5cf6',
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#94a3b8',
                font: {
                  family: 'Inter',
                  size: 11
                }
              }
            },
            tooltip: {
              callbacks: {
                afterLabel: ctx => {
                  const total = ctx.dataIndex === 0 ? 234 : 390;
                  const pct = (ctx.parsed.y / total * 100).toFixed(1);
                  return `Proportion: ${pct}% of ${ctx.label}`;
                }
              }
            }
          },
          scales: {
            x: {
              stacked: true,
              grid: {
                display: false
              },
              ticks: {
                color: '#94a3b8'
              }
            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: 'Number of Test Scans',
                color: '#64748b'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.05)'
              },
              ticks: {
                color: '#94a3b8'
              }
            }
          }
        }
      });
      charts.push(cmChart);
    }

    // 3. UNet++ Validation Dice vs Epoch Convergence
    if (diceRef.current) {
      const ctx = diceRef.current.getContext('2d');
      const diceChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Ep 1', 'Ep 5', 'Ep 10', 'Ep 15', 'Ep 20', 'Ep 25', 'Ep 30', 'Ep 35'],
          datasets: [{
            label: 'Validation Mean Dice Score',
            data: [0.462, 0.684, 0.761, 0.803, 0.826, 0.835, 0.839, 0.8407],
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            fill: true,
            tension: 0.3,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#8b5cf6'
          }, {
            label: 'Compound Training Loss',
            data: [0.725, 0.482, 0.354, 0.278, 0.224, 0.188, 0.165, 0.149],
            borderColor: '#f97316',
            borderWidth: 2,
            borderDash: [4, 4],
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: '#f97316'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#94a3b8',
                font: {
                  family: 'Inter',
                  size: 11
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.05)'
              },
              ticks: {
                color: '#94a3b8'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Metric Value',
                color: '#64748b'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.05)'
              },
              ticks: {
                color: '#94a3b8'
              },
              min: 0,
              max: 1.0
            }
          }
        }
      });
      charts.push(diceChart);
    }

    // 4. Threshold Sweep Curve (τ Tuning: 0.10 to 0.90)
    if (threshRef.current) {
      const ctx = threshRef.current.getContext('2d');
      const threshChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['τ 0.10', 'τ 0.20', 'τ 0.30 (Optimal)', 'τ 0.40', 'τ 0.50 (Default)', 'τ 0.60', 'τ 0.70', 'τ 0.80', 'τ 0.90'],
          datasets: [{
            label: 'Mean Dice Score',
            data: [0.782, 0.826, 0.8407, 0.835, 0.8249, 0.802, 0.768, 0.714, 0.625],
            borderColor: '#00c2ff',
            backgroundColor: 'rgba(0, 194, 255, 0.15)',
            fill: true,
            borderWidth: 2.5,
            tension: 0.35,
            pointRadius: ctx => ctx.dataIndex === 2 ? 8 : 4,
            pointBackgroundColor: ctx => ctx.dataIndex === 2 ? '#f59e0b' : '#00c2ff'
          }, {
            label: 'Mean IoU (Jaccard)',
            data: [0.755, 0.808, 0.8246, 0.817, 0.8063, 0.779, 0.742, 0.683, 0.589],
            borderColor: '#10b981',
            borderWidth: 2,
            tension: 0.35,
            pointRadius: ctx => ctx.dataIndex === 2 ? 6 : 3,
            pointBackgroundColor: '#10b981'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#94a3b8',
                font: {
                  family: 'Inter',
                  size: 11
                }
              }
            },
            tooltip: {
              callbacks: {
                title: items => `Decision Threshold ${items[0].label}`
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.05)'
              },
              ticks: {
                color: '#94a3b8'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Score Value',
                color: '#64748b'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.05)'
              },
              ticks: {
                color: '#94a3b8'
              },
              min: 0.5,
              max: 0.9
            }
          }
        }
      });
      charts.push(threshChart);
    }

    // 5. Dual-Branch Attention Gating Weights (Doughnut / Radar)
    if (attnRef.current) {
      const ctx = attnRef.current.getContext('2d');
      const attnChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['α: Global Swin-T (60.3%)', 'β: Local CNN Pyramid (33.7%)', 'γ: Linguistic Context (6.0%)'],
          datasets: [{
            data: [60.3, 33.7, 6.0],
            backgroundColor: ['#00c2ff', '#8b5cf6', '#10b981'],
            borderColor: '#060a14',
            borderWidth: 3,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#94a3b8',
                font: {
                  family: 'Inter',
                  size: 11
                },
                padding: 14
              }
            }
          },
          cutout: '68%'
        }
      });
      charts.push(attnChart);
    }

    // 6. NLP Captioning Metric Benchmark
    if (nlpRef.current) {
      const ctx = nlpRef.current.getContext('2d');
      const nlpChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['BLEU-1', 'BLEU-2', 'BLEU-3', 'BLEU-4', 'METEOR', 'ROUGE-L'],
          datasets: [{
            label: 'Dual-Branch Swin-T + DistilGPT-2',
            data: [0.3230, 0.2014, 0.1382, 0.1051, 0.2899, 0.2894],
            backgroundColor: '#10b981',
            borderRadius: 6
          }, {
            label: 'Single-Branch CNN Baseline',
            data: [0.2640, 0.1580, 0.1020, 0.0760, 0.2310, 0.2410],
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#94a3b8',
                font: {
                  family: 'Inter',
                  size: 11
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#94a3b8'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Evaluation Score',
                color: '#64748b'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.05)'
              },
              ticks: {
                color: '#94a3b8'
              },
              min: 0,
              max: 0.4
            }
          }
        }
      });
      charts.push(nlpChart);
    }

    // Cleanup on unmount
    return () => {
      charts.forEach(c => c.destroy());
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "react-visualizations-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "page-badge"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
  })), "EMPIRICAL VALIDATION & DATA BENCHMARKS"), /*#__PURE__*/React.createElement("h2", {
    className: "page-title"
  }, "Interactive Model ", /*#__PURE__*/React.createElement("span", {
    className: "accent-text"
  }, "Visualizations")), /*#__PURE__*/React.createElement("p", {
    className: "page-desc"
  }, "All charts are constructed directly from empirical training and validation logs across the 18,347+ radiograph cohort, demonstrating ROC-AUC, threshold optimization, and attention gating.")), /*#__PURE__*/React.createElement("div", {
    className: "quick-stats-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "0.9840"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "ROC-AUC")), /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "0.8407"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "TUNED DICE")), /*#__PURE__*/React.createElement("div", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-val"
  }, "0.3230"), /*#__PURE__*/React.createElement("span", {
    className: "qs-lbl"
  }, "BLEU-1")))), /*#__PURE__*/React.createElement("div", {
    className: "charts-grid-2col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-card-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "chart-title"
  }, "Receiver Operating Characteristic (ROC)"), /*#__PURE__*/React.createElement("p", {
    className: "chart-sub"
  }, "EfficientNetV2-S binary classification on 624 Kermany test scans (AUC = 0.9840)")), /*#__PURE__*/React.createElement("span", {
    className: "chart-badge cyan"
  }, "Module 1")), /*#__PURE__*/React.createElement("div", {
    className: "chart-canvas-wrap"
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: rocRef
  }))), /*#__PURE__*/React.createElement("div", {
    className: "chart-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-card-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "chart-title"
  }, "Test Set Confusion Matrix"), /*#__PURE__*/React.createElement("p", {
    className: "chart-sub"
  }, "Normal vs Pneumonia breakdown (97.9% sensitivity, 85.0% specificity)")), /*#__PURE__*/React.createElement("span", {
    className: "chart-badge cyan"
  }, "Module 1")), /*#__PURE__*/React.createElement("div", {
    className: "chart-canvas-wrap"
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: cmRef
  }))), /*#__PURE__*/React.createElement("div", {
    className: "chart-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-card-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "chart-title"
  }, "UNet++ Training Convergence"), /*#__PURE__*/React.createElement("p", {
    className: "chart-sub"
  }, "Validation Mean Dice score vs Compound Loss across 35 training epochs")), /*#__PURE__*/React.createElement("span", {
    className: "chart-badge purple"
  }, "Module 2")), /*#__PURE__*/React.createElement("div", {
    className: "chart-canvas-wrap"
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: diceRef
  }))), /*#__PURE__*/React.createElement("div", {
    className: "chart-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-card-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "chart-title"
  }, "Decision Threshold Optimization (\u03C4 Sweep)"), /*#__PURE__*/React.createElement("p", {
    className: "chart-sub"
  }, "Empirical validation demonstrating peak Dice score (0.8407) at \u03C4 = 0.30 vs default \u03C4 = 0.50")), /*#__PURE__*/React.createElement("span", {
    className: "chart-badge purple"
  }, "Module 2")), /*#__PURE__*/React.createElement("div", {
    className: "chart-canvas-wrap"
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: threshRef
  }))), /*#__PURE__*/React.createElement("div", {
    className: "chart-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-card-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "chart-title"
  }, "Dual-Branch Learned Attention Fusion"), /*#__PURE__*/React.createElement("p", {
    className: "chart-sub"
  }, "Weight allocation between Global Swin-T (\u03B1), Local CNN (\u03B2), and Context (\u03B3)")), /*#__PURE__*/React.createElement("span", {
    className: "chart-badge green"
  }, "Module 3")), /*#__PURE__*/React.createElement("div", {
    className: "chart-canvas-wrap",
    style: {
      height: 260
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: attnRef
  }))), /*#__PURE__*/React.createElement("div", {
    className: "chart-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-card-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "chart-title"
  }, "Radiology Report NLP Metrics Comparison"), /*#__PURE__*/React.createElement("p", {
    className: "chart-sub"
  }, "BLEU 1\u20134, METEOR, and ROUGE-L comparing Dual-Branch against single-branch baseline")), /*#__PURE__*/React.createElement("span", {
    className: "chart-badge green"
  }, "Module 3")), /*#__PURE__*/React.createElement("div", {
    className: "chart-canvas-wrap"
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: nlpRef
  })))));
};

/* --- public/src/components/AboutView.jsx --- */
// AboutView.jsx — Institutional Branding, Team Details & Academic Research Specifications
const AboutView = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "react-about-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-official-banner-box"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/images/ghec_banner.png",
    alt: "Govt. Hydro Engineering College Bilaspur (H.P)",
    className: "about-official-banner-img",
    onError: e => {
      e.target.style.display = 'none';
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "about-inst-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aib-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aib-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot"
  }), "GOVERNMENT HYDRO ENGINEERING COLLEGE, BILASPUR"), /*#__PURE__*/React.createElement("h2", {
    className: "aib-title"
  }, "Department of Computer Science & Engineering", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent-text"
  }, "B.Tech. CSE (AI & Data Science)")), /*#__PURE__*/React.createElement("p", {
    className: "aib-desc"
  }, "Final Year Major Project: ", /*#__PURE__*/React.createElement("em", null, "\"Explainable Deep Learning System for Chest Radiographs \u2014 Integrated Disease Classification, Lesion Boundary Segmentation, and Natural Language Report Generation\""), ". Academic Year 2026."), /*#__PURE__*/React.createElement("div", {
    className: "aib-tags"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tag-pill"
  }, "Bandla, Bilaspur, Himachal Pradesh"), /*#__PURE__*/React.createElement("span", {
    className: "tag-pill"
  }, "7th Semester Major Project"), /*#__PURE__*/React.createElement("span", {
    className: "tag-pill"
  }, "Joint Technical Society"))), /*#__PURE__*/React.createElement("div", {
    className: "aib-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "college-seal-box"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/images/ghec_logo.png",
    alt: "Government Hydro Engineering College Bilaspur Official Emblem",
    className: "college-seal-img",
    onError: e => {
      e.target.style.display = 'none';
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "seal-caption"
  }, "Official Institutional Emblem")))), /*#__PURE__*/React.createElement("div", {
    className: "about-section"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "section-heading"
  }, "Project Supervisor & Research Mentor"), /*#__PURE__*/React.createElement("div", {
    className: "supervisor-react-card"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/static/team/dr_ravi_kumar.jpg?v=20261123-2",
    alt: "Dr. Ravi Kumar",
    className: "sup-avatar",
    onError: e => {
      e.currentTarget.src = '/images/Dr. Ravi Kumar.jpg';
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "sup-details"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sup-badge"
  }, "Faculty Mentor"), /*#__PURE__*/React.createElement("h4", {
    className: "sup-name"
  }, "Dr. Ravi Kumar"), /*#__PURE__*/React.createElement("p", {
    className: "sup-title"
  }, "Assistant Professor, Department of Computer Science & Engineering"), /*#__PURE__*/React.createElement("p", {
    className: "sup-inst"
  }, "Government Hydro Engineering College, Bandla, Bilaspur (HP)"), /*#__PURE__*/React.createElement("p", {
    className: "sup-bio"
  }, "Mentoring research in Explainable Artificial Intelligence (XAI), Medical Image Processing, Trustworthy Machine Learning, and Computer Vision for Clinical Diagnostics. Guiding the formulation of mathematical loss functions, threshold optimization, and publication-ready benchmarking.")))), /*#__PURE__*/React.createElement("div", {
    className: "about-section"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "section-heading"
  }, "Student Research Team"), /*#__PURE__*/React.createElement("div", {
    className: "team-react-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "team-react-card lead"
  }, /*#__PURE__*/React.createElement("div", {
    className: "trc-avatar-wrap"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/static/team/aman.jpg?v=20261123-2",
    alt: "Aman",
    className: "trc-avatar",
    onError: e => {
      e.currentTarget.src = '/static/team/aman.jpeg';
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "trc-lead-pill"
  }, "Lead Developer")), /*#__PURE__*/React.createElement("h4", {
    className: "trc-name"
  }, "Aman"), /*#__PURE__*/React.createElement("span", {
    className: "trc-roll"
  }, "23010503008"), /*#__PURE__*/React.createElement("span", {
    className: "trc-role"
  }, "Lead Engineer \u2014 DL Architecture & Web System"), /*#__PURE__*/React.createElement("p", {
    className: "trc-dept"
  }, "B.Tech. CSE (AI & DS), 7th Semester"), /*#__PURE__*/React.createElement("p", {
    className: "trc-bio"
  }, "Architected the multimodal deep learning pipelines, Grad-CAM visualization, and the full-stack React clinical web interface."), /*#__PURE__*/React.createElement("div", {
    className: "trc-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/in/aman-verma-214ba9304/",
    target: "_blank",
    rel: "noreferrer",
    className: "trc-link li"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
  })), "LinkedIn"), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/aman5123",
    target: "_blank",
    rel: "noreferrer",
    className: "trc-link gh"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
  })), "GitHub"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:amanvrma089@gmail.com",
    className: "trc-link em"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "16",
    x: "2",
    y: "4",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
  })), "Email"))), /*#__PURE__*/React.createElement("div", {
    className: "team-react-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "trc-avatar-wrap"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/static/team/samriti.jpg?v=20261123-2",
    alt: "Samriti",
    className: "trc-avatar",
    onError: e => {
      e.currentTarget.src = '/images/samriti.jpg';
    }
  })), /*#__PURE__*/React.createElement("h4", {
    className: "trc-name"
  }, "Samriti"), /*#__PURE__*/React.createElement("span", {
    className: "trc-roll"
  }, "23010503053"), /*#__PURE__*/React.createElement("span", {
    className: "trc-role",
    style: {
      color: '#8b5cf6'
    }
  }, "Segmentation Module Lead"), /*#__PURE__*/React.createElement("p", {
    className: "trc-dept"
  }, "B.Tech. CSE (AI & DS), 7th Semester"), /*#__PURE__*/React.createElement("p", {
    className: "trc-bio"
  }, "Engineered UNet++ with EfficientNet-B3 backbone and scSE attention blocks. Executed grid search optimizing decision threshold to \u03C4 = 0.30.")), /*#__PURE__*/React.createElement("div", {
    className: "team-react-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "trc-avatar-wrap"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/static/team/simran.jpg?v=20261123-2",
    alt: "Simran",
    className: "trc-avatar",
    onError: e => {
      e.currentTarget.src = '/images/simran.jpg';
    }
  })), /*#__PURE__*/React.createElement("h4", {
    className: "trc-name"
  }, "Simran"), /*#__PURE__*/React.createElement("span", {
    className: "trc-roll"
  }, "23010503064"), /*#__PURE__*/React.createElement("span", {
    className: "trc-role",
    style: {
      color: '#10b981'
    }
  }, "NLP & Captioning Lead"), /*#__PURE__*/React.createElement("p", {
    className: "trc-dept"
  }, "B.Tech. CSE (AI & DS), 7th Semester"), /*#__PURE__*/React.createElement("p", {
    className: "trc-bio"
  }, "Designed the Dual-Branch Swin-T + Dense CNN encoder with learned Attention Gating and DistilGPT-2 beam search text generation.")), /*#__PURE__*/React.createElement("div", {
    className: "team-react-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "trc-avatar-wrap"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/static/team/sparsh.jpeg?v=20261123-2",
    alt: "Sparsh Thakur",
    className: "trc-avatar",
    onError: e => {
      e.currentTarget.src = '/images/sparsh.jpeg';
    }
  })), /*#__PURE__*/React.createElement("h4", {
    className: "trc-name"
  }, "Sparsh Thakur"), /*#__PURE__*/React.createElement("span", {
    className: "trc-roll"
  }, "23010503066"), /*#__PURE__*/React.createElement("span", {
    className: "trc-role",
    style: {
      color: '#f59e0b'
    }
  }, "Data Engineering & Metrics Lead"), /*#__PURE__*/React.createElement("p", {
    className: "trc-dept"
  }, "B.Tech. CSE (AI & DS), 7th Semester"), /*#__PURE__*/React.createElement("p", {
    className: "trc-bio"
  }, "Constructed leak-free patient-stratified split pipelines, CLAHE preprocessing, and statistically evaluated all 3 modules against baselines.")))), /*#__PURE__*/React.createElement("div", {
    className: "about-section"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "section-heading"
  }, "Clinical Training & Evaluation Datasets"), /*#__PURE__*/React.createElement("div", {
    className: "datasets-rich-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dataset-rich-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-img-wrap"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/static/datasets/dataset_pneumonia.png",
    alt: "Chest X-Ray Pneumonia Dataset",
    className: "ds-img"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ds-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-badge-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ds-tag"
  }, "Classification"), /*#__PURE__*/React.createElement("span", {
    className: "ds-tag",
    style: {
      color: '#00c2ff',
      borderColor: 'rgba(0,194,255,0.3)'
    }
  }, "Cell 2018")), /*#__PURE__*/React.createElement("h4", {
    className: "ds-title"
  }, "Chest X-Ray Images (Pneumonia)"), /*#__PURE__*/React.createElement("p", {
    className: "ds-desc"
  }, "Curated by Kermany et al. Collected from Guangzhou Women and Children's Medical Center. Validated by two independent radiologists with a third senior physician adjudicating ambiguous cases."), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-item"
  }, /*#__PURE__*/React.createElement("span", null, "Total Images"), /*#__PURE__*/React.createElement("span", null, "5,856")), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-item"
  }, /*#__PURE__*/React.createElement("span", null, "Split Ratio"), /*#__PURE__*/React.createElement("span", null, "80 / 10 / 10")), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-item"
  }, /*#__PURE__*/React.createElement("span", null, "Pneumonia"), /*#__PURE__*/React.createElement("span", null, "4,273 Cases")), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-item"
  }, /*#__PURE__*/React.createElement("span", null, "Normal"), /*#__PURE__*/React.createElement("span", null, "1,583 Cases"))))), /*#__PURE__*/React.createElement("div", {
    className: "dataset-rich-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-img-wrap"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/static/datasets/dataset_pneumothorax.png",
    alt: "SIIM-ACR Pneumothorax Dataset",
    className: "ds-img"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ds-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-badge-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ds-tag",
    style: {
      color: '#8b5cf6',
      borderColor: 'rgba(139,92,246,0.3)'
    }
  }, "Segmentation"), /*#__PURE__*/React.createElement("span", {
    className: "ds-tag",
    style: {
      color: '#8b5cf6',
      borderColor: 'rgba(139,92,246,0.3)'
    }
  }, "SIIM / ACR")), /*#__PURE__*/React.createElement("h4", {
    className: "ds-title"
  }, "SIIM-ACR Pneumothorax"), /*#__PURE__*/React.createElement("p", {
    className: "ds-desc"
  }, "High-resolution thoracic radiographs annotated with fine pixel-level Run-Length Encoded (RLE) masks by certified board members of the Society for Imaging Informatics in Medicine."), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-item"
  }, /*#__PURE__*/React.createElement("span", null, "Total Scans"), /*#__PURE__*/React.createElement("span", null, "12,047")), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-item"
  }, /*#__PURE__*/React.createElement("span", null, "Prevalence"), /*#__PURE__*/React.createElement("span", null, "22.3% Positive")), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-item"
  }, /*#__PURE__*/React.createElement("span", null, "Resolution"), /*#__PURE__*/React.createElement("span", null, "1024 \xD7 1024")), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-item"
  }, /*#__PURE__*/React.createElement("span", null, "Annotations"), /*#__PURE__*/React.createElement("span", null, "Pixel RLE Masks"))))), /*#__PURE__*/React.createElement("div", {
    className: "dataset-rich-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-img-wrap"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/static/datasets/dataset_indiana.png",
    alt: "Indiana University Open-I Dataset",
    className: "ds-img"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ds-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-badge-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ds-tag",
    style: {
      color: '#10b981',
      borderColor: 'rgba(16,185,129,0.3)'
    }
  }, "Captioning"), /*#__PURE__*/React.createElement("span", {
    className: "ds-tag",
    style: {
      color: '#10b981',
      borderColor: 'rgba(16,185,129,0.3)'
    }
  }, "NIH Open-I")), /*#__PURE__*/React.createElement("h4", {
    className: "ds-title"
  }, "Indiana University Open-I"), /*#__PURE__*/React.createElement("p", {
    className: "ds-desc"
  }, "Open-access radiology examination dataset from the U.S. National Library of Medicine (NLM). Contains paired frontal and lateral chest radiographs with complete de-identified clinical reports."), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-item"
  }, /*#__PURE__*/React.createElement("span", null, "Total Studies"), /*#__PURE__*/React.createElement("span", null, "7,466")), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-item"
  }, /*#__PURE__*/React.createElement("span", null, "Frontal Used"), /*#__PURE__*/React.createElement("span", null, "3,818 Reports")), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-item"
  }, /*#__PURE__*/React.createElement("span", null, "Vocab Size"), /*#__PURE__*/React.createElement("span", null, "1,420 Tokens")), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta-item"
  }, /*#__PURE__*/React.createElement("span", null, "Sections"), /*#__PURE__*/React.createElement("span", null, "Findings & Imp."))))))), /*#__PURE__*/React.createElement("div", {
    className: "inst-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inst-footer-logo"
  }, "Government Hydro Engineering College, Bilaspur"), /*#__PURE__*/React.createElement("div", {
    className: "inst-footer-sub"
  }, "Department of Computer Science & Engineering \xB7 Bandla, Bilaspur, Himachal Pradesh, India \u2014 174001"), /*#__PURE__*/React.createElement("div", {
    className: "inst-footer-meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Programme:"), " B.Tech. CSE (AI & Data Science)"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Academic Session:"), " 7th Semester Major Project (2026)"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Supervisor:"), " Dr. Ravi Kumar, Assistant Professor"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Student Lead:"), " Aman (23010503008)"))));
};

/* --- public/src/App.jsx --- */
// App.jsx — Root React Component for PulmoScan Clinical X-AI Workbench
const App = () => {
  const [currentView, setCurrentView] = React.useState('dashboard');
  const [theme, setTheme] = React.useState('dark');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [exportModalData, setExportModalData] = React.useState(null);

  // Restore theme preference
  React.useEffect(() => {
    const saved = localStorage.getItem('pulmoscan-theme') || 'dark';
    setTheme(saved);
    if (saved === 'light') {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    }
  }, []);
  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('pulmoscan-theme', next);
    if (next === 'light') {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    }
  };
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return /*#__PURE__*/React.createElement(DashboardView, {
          onViewChange: setCurrentView
        });
      case 'analyze':
        return /*#__PURE__*/React.createElement(AnalyzeView, {
          onOpenExportModal: setExportModalData
        });
      case 'classify':
        return /*#__PURE__*/React.createElement(ClassificationView, null);
      case 'segment':
        return /*#__PURE__*/React.createElement(SegmentationView, null);
      case 'report':
        return /*#__PURE__*/React.createElement(ReportView, {
          onOpenExportModal: setExportModalData
        });
      case 'visualizations':
        return /*#__PURE__*/React.createElement(VisualizationsView, null);
      case 'about':
        return /*#__PURE__*/React.createElement(AboutView, null);
      default:
        return /*#__PURE__*/React.createElement(DashboardView, {
          onViewChange: setCurrentView
        });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `react-app-container ${theme}`
  }, /*#__PURE__*/React.createElement(Sidebar, {
    currentView: currentView,
    onViewChange: v => {
      setCurrentView(v);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    isOpen: isSidebarOpen,
    onClose: () => setIsSidebarOpen(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "react-main-content"
  }, /*#__PURE__*/React.createElement(Header, {
    currentView: currentView,
    onViewChange: setCurrentView,
    theme: theme,
    onToggleTheme: handleToggleTheme,
    onOpenMobileMenu: () => setIsSidebarOpen(true)
  }), /*#__PURE__*/React.createElement("main", {
    className: "react-view-body"
  }, renderCurrentView())), exportModalData && /*#__PURE__*/React.createElement(ExportModal, {
    data: exportModalData,
    onClose: () => setExportModalData(null)
  }));
};

// Mount Root React Application
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render( /*#__PURE__*/React.createElement(App, null));
}