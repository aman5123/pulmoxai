// ClassificationView.jsx — Focused EfficientNetV2-S Disease Classification Module
const ClassificationView = ({ onSelectPreset }) => {
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
    const body = base64 ? { imageBase64: base64 } : { presetId };

    fetch('/api/predict/classify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then((r) => r.json())
      .then((data) => {
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
      })
      .catch((err) => {
        console.error('Classification inference error:', err);
        setIsInferring(false);
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
        if (found?.imageUrl) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            setImageObj(img);
            runClassification(selectedCase);
          };
          img.src = found.imageUrl;
        }
      })
      .catch((err) => console.error(err));
  }, [selectedCase]);

  // Handle custom upload
  const handleUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const b64 = e.target.result;
      const img = new Image();
      img.onload = () => {
        setSelectedCase('custom_upload');
        setCaseData({ name: file.name, category: 'Custom Upload' });
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

  return (
    <div className="react-module-page">
      <div className="page-header">
        <div>
          <div className="page-badge">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            MODULE 1 · DISEASE CLASSIFICATION (LIVE PYTORCH MODEL)
          </div>
          <h2 className="page-title">
            Pneumonia vs Normal <span className="accent-text">Classification</span>
          </h2>
          <p className="page-desc">
            Binary disease classification powered by EfficientNetV2-S with gradient-weighted class activation mapping (Grad-CAM) computed directly on CUDA.
          </p>
        </div>
        <div className="quick-stats-bar">
          <div className="qs-item"><span className="qs-val">93.11%</span><span className="qs-lbl">ACCURACY</span></div>
          <div className="qs-item"><span className="qs-val">0.9840</span><span className="qs-lbl">ROC-AUC</span></div>
          <div className="qs-item"><span className="qs-val">0.9248</span><span className="qs-lbl">MACRO F1</span></div>
        </div>
      </div>

      <div className="onc-analysis-layout">
        <div className="onc-left-col">
          {/* Preset Case Pills + Upload */}
          <div className="onc-sample-pills">
            <button className={`onc-pill ${selectedCase === 'case_460_pneumo' ? 'active' : ''}`} onClick={() => setSelectedCase('case_460_pneumo')}>
              ● Pneumonia (#460)
            </button>
            <button className={`onc-pill ${selectedCase === 'case_normal_adult' ? 'active' : ''}`} onClick={() => setSelectedCase('case_normal_adult')}>
              ● Normal Adult
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

          <div className="onc-card">
            <div className="viewer-top-bar">
              <div className="onc-layer-toggle-bar" style={{ position: 'static' }}>
                <button className={`onc-layer-btn ${activeLayer === 'original' ? 'active' : ''}`} onClick={() => setActiveLayer('original')}>Original</button>
                <button className={`onc-layer-btn ${activeLayer === 'gradcam' ? 'active' : ''}`} onClick={() => setActiveLayer('gradcam')}>Grad-CAM</button>
              </div>
              <span className="case-mono highlight">
                {isInferring ? '⚡ Computing CUDA Grad-CAM...' : (caseData?.name || 'Selected Radiograph')}
              </span>
            </div>

            <div className="onc-canvas-frame" style={{ height: 320, position: 'relative' }}>
              <canvas ref={canvasRef} width={480} height={320} />
              {isInferring && (
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(8,12,20,0.7)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  color: '#38bdf8', fontSize: '0.875rem', gap: 8
                }}>
                  <div className="pulse-dot" style={{ width: 12, height: 12 }}></div>
                  <span>Running PyTorch EfficientNetV2-S Inference...</span>
                </div>
              )}
            </div>

            <div className="viewer-bottom-bar" style={{ marginTop: 12 }}>
              <label className="ctrl-row">
                <span>Heatmap Opacity</span>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={opacity} 
                  onChange={(e) => setOpacity(parseInt(e.target.value))} 
                  className="range-ctrl" 
                />
                <span>{opacity}%</span>
              </label>
            </div>
          </div>
        </div>

        <div className="onc-right-col">
          <div className="onc-card">
            <div className="onc-primary-sub">MODEL-DERIVED CLASSIFICATION (CUDA)</div>
            <div className="onc-primary-diag" style={{ color: cls.label?.includes('NORMAL') ? '#10b981' : '#ef4444' }}>
              {cls.label}
            </div>
            <div className="onc-conf-row" style={{ marginTop: 8 }}>
              <span className="onc-conf-badge">Confidence: {cls.confidence}%</span>
              <span className="onc-conf-badge" style={{ borderColor: 'rgba(56,189,248,0.3)', color: '#38bdf8' }}>
                Model: EfficientNetV2-S
              </span>
            </div>

            <div className="onc-probs-section" style={{ borderTop: '1px solid #13223f', marginTop: 16 }}>
              <h4 className="onc-probs-title">Class Softmax Probabilities</h4>
              <div className="onc-pb-row">
                <span className="onc-pb-label">Pneumonia / Pathology</span>
                <div className="onc-pb-track">
                  <div className="onc-pb-fill cyan" style={{ width: `${cls.diseaseProb}%` }}></div>
                </div>
                <span className="onc-pb-pct">{cls.diseaseProb}%</span>
              </div>
              <div className="onc-pb-row">
                <span className="onc-pb-label">Normal Aeration</span>
                <div className="onc-pb-track">
                  <div className="onc-pb-fill purple" style={{ width: `${cls.normalProb}%` }}></div>
                </div>
                <span className="onc-pb-pct">{cls.normalProb}%</span>
              </div>
            </div>

            <div className="onc-probs-section" style={{ borderTop: '1px solid #13223f', marginTop: 16 }}>
              <h4 className="onc-probs-title">Grad-CAM Salience Localization</h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
                {cls.gradCamRegion || 'Model activation distributed over bilateral pulmonary parenchyma.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
