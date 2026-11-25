// ReportView.jsx — Focused Vision-Language Radiology Report Generator Module
const ReportView = ({ onOpenExportModal }) => {
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
      ...(base64 ? { imageBase64: base64 } : {})
    };

    fetch('/api/predict/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then((r) => r.json())
      .then((data) => {
        setIsGenerating(false);
        if (data.status === 'success') {
          setReportResult(data);
        }
      })
      .catch((err) => {
        console.error('Report inference error:', err);
        setIsGenerating(false);
      });
  };

  // When selectedCase changes
  React.useEffect(() => {
    if (selectedCase === 'custom_upload') return;

    fetch('/api/samples')
      .then((r) => r.json())
      .then((samples) => {
        const found = samples.find((s) => s.id === selectedCase) || samples[0];
        setCaseData(found);
        runReportInference(selectedCase, null, beamSize);
      })
      .catch((err) => console.error(err));
  }, [selectedCase]);

  // Handle upload
  const handleUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const b64 = e.target.result;
      setSelectedCase('custom_upload');
      setCaseData({ name: file.name, clinicalHistory: 'Custom patient radiograph submitted for automated report generation.' });
      runReportInference('custom_upload', b64, beamSize);
    };
    reader.readAsDataURL(file);
  };

  const rep = reportResult || {
    findings: isGenerating ? 'Vision-Language Transformer is decoding clinical findings...' : 'Select a radiograph or upload to generate report.',
    impression: isGenerating ? 'Synthesizing multimodal impression...' : 'Impression will be synthesized here.',
    keyPoints: [],
    attentionWeights: { alpha_global: 0.603, beta_local: 0.338, gamma_context: 0.059 }
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

  return (
    <div className="react-module-page">
      <div className="page-header">
        <div>
          <div className="page-badge">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            MODULE 3 · RADIOLOGY REPORT SYNTHESIS (LIVE TRANSFORMER)
          </div>
          <h2 className="page-title">
            Automated <span className="accent-text" style={{ color: '#10b981' }}>Radiology Report</span>
          </h2>
          <p className="page-desc">
            Dual-Branch Swin-Transformer (Global) + DenseNet-121 (Local) vision encoder paired with a fine-tuned DistilGPT-2 autoregressive decoder running real-time beam search on CUDA.
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
            <button 
              className={`onc-pill ${selectedCase === 'custom_upload' ? 'active' : ''}`} 
              onClick={() => fileInputRef.current?.click()}
            >
              ⬆ Upload Radiograph
            </button>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={(e) => handleUpload(e.target.files?.[0])}
            />
          </div>

          <div className="onc-card" style={{ position: 'relative' }}>
            {isGenerating && (
              <div style={{
                position: 'absolute', inset: 0, background: 'rgba(8,12,20,0.8)',
                zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                color: '#10b981', fontSize: '0.9rem', gap: 10, borderRadius: 12
              }}>
                <div className="pulse-dot" style={{ width: 14, height: 14, background: '#10b981' }}></div>
                <span>ViT + DenseNet-121 + DistilGPT-2 Generating Report...</span>
              </div>
            )}

            <div className="onc-report-preview" style={{ background: 'transparent', border: 'none', padding: 0 }}>
              <div className="onc-rep-head" style={{ justifyContent: 'space-between', paddingBottom: 12 }}>
                <div>
                  <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 800 }}>Model Generated Clinical Report</span>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>
                    Indiana University Open-I Fine-Tuned Model
                  </div>
                </div>
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
                  <p style={{ color: '#94a3b8' }}>{caseData?.clinicalHistory || 'Radiograph submitted for automated multimodal evaluation.'}</p>
                </div>
                <div className="onc-rep-field" style={{ marginTop: 8 }}>
                  <label>FINDINGS (AUTOMATED EXTRACTION)</label>
                  <p style={{ color: '#e2e8f0', lineHeight: 1.6 }}>{rep.findings}</p>
                </div>
                <div className="onc-rep-field" style={{ marginTop: 8 }}>
                  <label>IMPRESSION &amp; RECOMMENDATION</label>
                  <p style={{ whiteSpace: 'pre-line', color: '#e2e8f0', lineHeight: 1.6, fontWeight: 500 }}>{rep.impression}</p>
                </div>
                {rep.keyPoints && rep.keyPoints.length > 0 && (
                  <div className="onc-rep-field" style={{ marginTop: 8 }}>
                    <label>KEY CLINICAL BULLETS</label>
                    <ul className="rep-keypoints">
                      {rep.keyPoints.map((kp, idx) => (
                        <li key={idx}>{kp}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
              Learned Attention Gate Weights (CUDA)
            </div>

            <div className="gate-weights-display">
              <div className="gw-item">
                <div className="gw-top">
                  <span>α — Global Swin-T / ViT Branch</span>
                  <strong>{alpha}%</strong>
                </div>
                <div className="gw-track">
                  <div className="gw-bar" style={{ width: `${alpha}%`, background: '#00c2ff' }}></div>
                </div>
                <small>Thoracic symmetry, diaphragmatic contour &amp; heart silhouette</small>
              </div>

              <div className="gw-item">
                <div className="gw-top">
                  <span>β — Local Dense CNN Branch</span>
                  <strong>{beta}%</strong>
                </div>
                <div className="gw-track">
                  <div className="gw-bar" style={{ width: `${beta}%`, background: '#8b5cf6' }}></div>
                </div>
                <small>Focal alveolar opacities, consolidations &amp; pleural line boundaries</small>
              </div>

              <div className="gw-item">
                <div className="gw-top">
                  <span>γ — Cross-Attention Context</span>
                  <strong>{gamma}%</strong>
                </div>
                <div className="gw-track">
                  <div className="gw-bar" style={{ width: `${gamma}%`, background: '#10b981' }}></div>
                </div>
                <small>Autoregressive DistilGPT-2 semantic and syntactic coherence</small>
              </div>
            </div>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #13223f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Beam Search Width</span>
                <span className="val-mono">{beamSize} beams</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="5" 
                step="1" 
                value={beamSize} 
                onChange={(e) => {
                  const b = parseInt(e.target.value);
                  setBeamSize(b);
                  runReportInference(selectedCase, null, b);
                }} 
                className="range-ctrl" 
                style={{ marginTop: 8 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
