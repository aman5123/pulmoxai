// DashboardView.jsx — Modern Research-Oriented Application Dashboard
const DashboardView = ({ onViewChange, onSelectPreset }) => {
  const metrics = [
    {
      title: 'Disease Classification',
      value: '93.11%',
      label: 'Test Accuracy (Macro F1: 0.925)',
      sub: 'EfficientNetV2-S + Grad-CAM XAI',
      roc: 'ROC-AUC: 0.9840',
      color: 'cyan',
      targetView: 'classify'
    },
    {
      title: 'Lesion Segmentation',
      value: '0.8407',
      label: 'Mean Dice Score (IoU: 0.825)',
      sub: 'UNet++ EfficientNet-B3 + scSE',
      roc: 'Threshold τ: 0.30 Tuned',
      color: 'purple',
      targetView: 'segment'
    },
    {
      title: 'Radiology Report Synthesis',
      value: '0.3230',
      label: 'BLEU-1 (METEOR: 0.2899)',
      sub: 'ViT + DenseNet + DistilGPT-2',
      roc: 'Learned α: 60.3% / β: 33.8%',
      color: 'green',
      targetView: 'report'
    },
    {
      title: 'Clinical Cohort Size',
      value: '18,347+',
      label: 'Multi-Center Chest Radiographs',
      sub: 'Kermany · SIIM-ACR · Open-I',
      roc: 'Verified Ground-Truth Sets',
      color: 'amber',
      targetView: 'about'
    }
  ];

  const recentCases = [
    { id: 'case_460_pneumo', name: 'Case #460 — Right Acute Pneumothorax', category: 'Pneumothorax', dice: 'DSC 0.952', conf: '97.4%', triage: 'STAT / Critical', color: 'red' },
    { id: 'case_normal_adult', name: 'Case #N204 — Normal Healthy Adult', category: 'Clear Thorax', dice: 'DSC 1.000', conf: '98.6%', triage: 'Routine / Cleared', color: 'green' },
    { id: 'case_lobar_pneumonia', name: 'Case #P882 — Right Lower Lobar Pneumonia', category: 'Infectious Opacity', dice: 'Parapneumonic', conf: '94.8%', triage: 'Urgent Care', color: 'purple' },
    { id: 'case_782_pneumo', name: 'Case #782 — Left Apical Spontaneous PTX', category: 'Pneumothorax', dice: 'DSC 0.937', conf: '94.2%', triage: 'High Priority', color: 'amber' }
  ];

  return (
    <div className="react-dashboard">
      {/* Welcome & Research Hero Card */}
      <div className="dashboard-hero-card">
        <div className="dh-left">
          <div className="dh-badge">
            <span className="pulse-dot"></span>
            EXPLAINABLE MULTIMODAL THORACIC RADIOGRAPHY SYSTEM
          </div>
          <h1 className="dh-title">
            Chest X-Ray Diagnostic <span className="accent-text">Workbench</span>
          </h1>
          <p className="dh-desc">
            An integrated deep learning platform developed at <strong>Government Hydro Engineering College, Bilaspur</strong>. 
            Automates pathology pre-screening, pixel-level pneumothorax lesion segmentation, and generates natural language radiology reports with clinical-grade explainability.
          </p>
          <div className="dh-actions">
            <button className="btn-primary" onClick={() => onViewChange('analyze')}>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Launch Unified Analysis</span>
            </button>
            <button className="btn-secondary" onClick={() => onViewChange('visualizations')}>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>View Benchmark Charts</span>
            </button>
          </div>
        </div>

        <div className="dh-right">
          <div className="dh-preview-card">
            <div className="dh-card-head">
              <span className="dh-sub">SYSTEM PIPELINE STATUS</span>
              <span className="dh-live-tag">Online</span>
            </div>
            <div className="dh-pipeline-flow">
              <div className="flow-step">
                <span className="step-num">01</span>
                <div className="step-content">
                  <strong>Frontal Radiograph</strong>
                  <small>PA/AP Input Image (1024×1024)</small>
                </div>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <span className="step-num">02</span>
                <div className="step-content">
                  <strong>EfficientNetV2-S + UNet++</strong>
                  <small>Grad-CAM + scSE Attention Mask</small>
                </div>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <span className="step-num">03</span>
                <div className="step-content">
                  <strong>ViT + DenseNet + DistilGPT-2</strong>
                  <small>Findings & Impression Synthesis</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics 4-Grid */}
      <div className="dash-metrics-grid">
        {metrics.map((m, idx) => (
          <div 
            key={idx} 
            className={`dash-metric-card ${m.color}`}
            onClick={() => onViewChange(m.targetView)}
          >
            <div className="dm-head">
              <span className="dm-title">{m.title}</span>
              <span className="dm-sub">{m.sub}</span>
            </div>
            <div className="dm-value">{m.value}</div>
            <div className="dm-footer">
              <span className="dm-label">{m.label}</span>
              <span className="dm-chip">{m.roc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Diagnostic Cohort */}
      <div className="dash-section">
        <div className="dash-section-head">
          <div>
            <h3 className="section-title">Validated Patient Test Cases</h3>
            <p className="section-sub">Select a clinical case to launch multi-modal diagnosis and inspect generated outputs</p>
          </div>
          <button className="btn-sm" onClick={() => onViewChange('analyze')}>
            <span>Open All-in-One Hub →</span>
          </button>
        </div>

        <div className="cases-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Patient Case ID</th>
                <th>Classification</th>
                <th>Confidence</th>
                <th>Segmentation Quality</th>
                <th>Triage Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentCases.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="case-id-cell">
                      <strong>{c.name.split('—')[0]}</strong>
                      <small>{c.name.split('—')[1] || c.category}</small>
                    </div>
                  </td>
                  <td>
                    <span className="case-cat-pill">{c.category}</span>
                  </td>
                  <td>
                    <span className="case-mono">{c.conf}</span>
                  </td>
                  <td>
                    <span className="case-mono highlight">{c.dice}</span>
                  </td>
                  <td>
                    <span className={`triage-chip ${c.color}`}>{c.triage}</span>
                  </td>
                  <td>
                    <button 
                      className="btn-table-action"
                      onClick={() => {
                        if (onSelectPreset) onSelectPreset(c.id);
                        onViewChange('analyze');
                      }}
                    >
                      Inspect Scan →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
