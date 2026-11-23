// ReportView.jsx — Focused Vision-Language Radiology Report Generator Module
const ReportView = ({ onOpenExportModal }) => {
  const [selectedCase, setSelectedCase] = React.useState('case_460_pneumo');
  const [caseData, setCaseData] = React.useState(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    fetch('/api/samples')
      .then((r) => r.json())
      .then((samples) => {
        const found = samples.find((s) => s.id === selectedCase) || samples[0];
        setCaseData(found);
      })
      .catch((err) => console.error(err));
  }, [selectedCase]);

  const rep = caseData?.radiologyReport || {
    findings: 'A large right-sided pneumothorax is visualized with extensive pleural air separation.',
    impression: '1. Prominent right-sided pneumothorax with apical collapse.\n2. Urgent surgical review recommended.',
    keyPoints: ['Large right apical pneumothorax (DSC = 0.952)', 'Right lung partial compression atelectasis'],
    attentionWeights: { alpha_global: 0.603, beta_local: 0.337, gamma_context: 0.060 }
  };

  const handleCopy = () => {
    const text = `FINDINGS:\n${rep.findings}\n\nIMPRESSION:\n${rep.impression}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="react-module-page">
      <div className="page-header">
        <div>
          <div className="page-badge">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            MODULE 3 · RADIOLOGY REPORT SYNTHESIS
          </div>
          <h2 className="page-title">
            Automated <span className="accent-text" style={{ color: '#10b981' }}>Radiology Report</span>
          </h2>
          <p className="page-desc">
            Dual-Branch Swin-Transformer (Global) + Dense CNN (Local) vision encoder paired with a fine-tuned DistilGPT-2 autoregressive decoder.
          </p>
        </div>
        <div className="quick-stats-bar">
          <div className="qs-item"><span className="qs-val">0.3230</span><span className="qs-lbl">BLEU-1</span></div>
          <div className="qs-item"><span className="qs-val">0.2899</span><span className="qs-lbl">METEOR</span></div>
          <div className="qs-item"><span className="qs-val">0.2894</span><span className="qs-lbl">ROUGE-L</span></div>
        </div>
      </div>

      <div className="onc-analysis-layout">
        <div className="onc-left-col">
          <div className="onc-sample-pills">
            <button className={`onc-pill ${selectedCase === 'case_460_pneumo' ? 'active' : ''}`} onClick={() => setSelectedCase('case_460_pneumo')}>
              ● Pneumothorax (#460)
            </button>
            <button className={`onc-pill ${selectedCase === 'case_normal_adult' ? 'active' : ''}`} onClick={() => setSelectedCase('case_normal_adult')}>
              ● Normal Scan
            </button>
            <button className={`onc-pill ${selectedCase === 'case_lobar_pneumonia' ? 'active' : ''}`} onClick={() => setSelectedCase('case_lobar_pneumonia')}>
              ∿ Lobar Pneumonia
            </button>
          </div>

          <div className="onc-card">
            <div className="onc-report-preview" style={{ background: 'transparent', border: 'none', padding: 0 }}>
              <div className="onc-rep-head" style={{ justifyContent: 'space-between', paddingBottom: 12 }}>
                <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 800 }}>Generated Clinical Report</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-sm" onClick={handleCopy}>
                    {copied ? '✓ Copied' : 'Copy Text'}
                  </button>
                  <button 
                    className="btn-sm highlight"
                    onClick={() => {
                      if (onOpenExportModal) {
                        onOpenExportModal({
                          caseName: caseData?.name || 'Radiograph Report',
                          findings: rep.findings,
                          impression: rep.impression
                        });
                      }
                    }}
                  >
                    Print / Export PDF
                  </button>
                </div>
              </div>

              <div className="onc-rep-body">
                <div className="onc-rep-field">
                  <label>CLINICAL HISTORY</label>
                  <p style={{ color: '#94a3b8' }}>{caseData?.clinicalHistory || 'Routine diagnostic scan.'}</p>
                </div>
                <div className="onc-rep-field" style={{ marginTop: 8 }}>
                  <label>FINDINGS</label>
                  <p>{rep.findings}</p>
                </div>
                <div className="onc-rep-field" style={{ marginTop: 8 }}>
                  <label>IMPRESSION</label>
                  <p style={{ whiteSpace: 'pre-line' }}>{rep.impression}</p>
                </div>
                <div className="onc-rep-field" style={{ marginTop: 8 }}>
                  <label>KEY CLINICAL BULLETS</label>
                  <ul className="rep-keypoints">
                    {(rep.keyPoints || []).map((kp, idx) => (
                      <li key={idx}>{kp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="onc-right-col">
          <div className="onc-card">
            <div className="onc-details-header">
              <svg width="16" height="16" fill="none" stroke="#10b981" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
              Attention Gate Weights (α, β, γ)
            </div>

            <div className="gate-weights-display">
              <div className="gw-item">
                <div className="gw-top"><span>α — Global Swin-T</span><strong>60.3%</strong></div>
                <div className="gw-track"><div className="gw-bar" style={{ width: '60.3%', background: '#00c2ff' }}></div></div>
                <small>Bilateral thoracic morphology &amp; heart silhouette</small>
              </div>
              <div className="gw-item">
                <div className="gw-top"><span>β — Local Dense CNN</span><strong>33.7%</strong></div>
                <div className="gw-track"><div className="gw-bar" style={{ width: '33.7%', background: '#8b5cf6' }}></div></div>
                <small>Focal pleural lines &amp; consolidative opacities</small>
              </div>
              <div className="gw-item">
                <div className="gw-top"><span>γ — Linguistic Context</span><strong>6.0%</strong></div>
                <div className="gw-track"><div className="gw-bar" style={{ width: '6.0%', background: '#10b981' }}></div></div>
                <small>Autoregressive semantic fluency &amp; coherence</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
