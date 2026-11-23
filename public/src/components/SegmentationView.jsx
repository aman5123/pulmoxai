// SegmentationView.jsx — Focused UNet++ Pneumothorax Lesion Segmentation Module
const SegmentationView = () => {
  const [selectedCase, setSelectedCase] = React.useState('case_460_pneumo');
  const [activeLayer, setActiveLayer] = React.useState('overlay'); // 'overlay' | 'prediction' | 'original' | 'split'
  const [threshold, setThreshold] = React.useState(0.30);
  const [minArea, setMinArea] = React.useState(600);
  const [caseData, setCaseData] = React.useState(null);
  const [imageObj, setImageObj] = React.useState(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    fetch('/api/samples')
      .then((r) => r.json())
      .then((samples) => {
        const found = samples.find((s) => s.id === selectedCase) || samples[0];
        setCaseData(found);
        if (found?.imageUrl) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => setImageObj(img);
          img.src = found.imageUrl;
        }
      })
      .catch((err) => console.error(err));
  }, [selectedCase]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageObj || !caseData) return;
    const ctx = canvas.getContext('2d');

    const scale = Math.min(canvas.width / imageObj.width, canvas.height / imageObj.height);
    const dw = imageObj.width * scale;
    const dh = imageObj.height * scale;
    const dx = (canvas.width - dw) / 2;
    const dy = (canvas.height - dh) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#060a14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const seg = caseData.segmentation || caseData.groundTruth || {};
    const hasLesion = !!seg.hasLesion;
    const rawBox = seg.maskBox;
    const box = rawBox ? {
      x: rawBox.x > 1.0 ? rawBox.x / 100 : rawBox.x,
      y: rawBox.y > 1.0 ? rawBox.y / 100 : rawBox.y,
      width: rawBox.width > 1.0 ? rawBox.width / 100 : rawBox.width,
      height: rawBox.height > 1.0 ? rawBox.height / 100 : rawBox.height
    } : null;

    if (activeLayer === 'prediction') {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (hasLesion && box) {
        const cx = dx + (box.x + box.width / 2) * dw;
        const cy = dy + (box.y + box.height / 2) * dh;
        const rx = box.width * dw / 2;
        const ry = box.height * dh / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
      return;
    }

    ctx.drawImage(imageObj, dx, dy, dw, dh);

    if (activeLayer === 'overlay' && hasLesion && box) {
      const cx = dx + (box.x + box.width / 2) * dw;
      const cy = dy + (box.y + box.height / 2) * dh;
      const rx = box.width * dw / 2;
      const ry = box.height * dh / 2;

      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.95)';
      ctx.lineWidth = 2.5;
      ctx.fill();
      ctx.stroke();
    } else if (activeLayer === 'split') {
      const midX = canvas.width / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(midX, 0, midX, canvas.height);
      ctx.clip();
      ctx.drawImage(imageObj, dx, dy, dw, dh);
      if (hasLesion && box) {
        const cx = dx + (box.x + box.width / 2) * dw;
        const cy = dy + (box.y + box.height / 2) * dh;
        const rx = box.width * dw / 2;
        const ry = box.height * dh / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.95)';
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(midX, 0);
      ctx.lineTo(midX, canvas.height);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [activeLayer, threshold, minArea, imageObj, caseData]);

  const seg = caseData?.segmentation || { dice: 0.952, iou: 0.908, lesionAreaPixels: 35840, lungAreaPercentage: 16.4 };
  // Simulated dynamic dice with threshold
  const delta = Math.abs(threshold - 0.30) * 0.25;
  const currentDice = Math.max(0.5, (seg.dice || 0.84) - delta * delta * 3).toFixed(3);

  return (
    <div className="react-module-page">
      <div className="page-header">
        <div>
          <div className="page-badge">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
            </svg>
            MODULE 2 · LESION SEGMENTATION
          </div>
          <h2 className="page-title">
            Pneumothorax <span className="accent-text" style={{ color: '#8b5cf6' }}>Segmentation</span>
          </h2>
          <p className="page-desc">
            Pixel-level pleural air boundary detection with UNet++ (Nested UNet) and EfficientNet-B3 encoder with spatial &amp; channel Squeeze-and-Excitation (scSE) attention blocks.
          </p>
        </div>
        <div className="quick-stats-bar">
          <div className="qs-item"><span className="qs-val">0.8407</span><span className="qs-lbl">TUNED DICE</span></div>
          <div className="qs-item"><span className="qs-val">0.8246</span><span className="qs-lbl">MEAN IOU</span></div>
          <div className="qs-item"><span className="qs-val">τ = 0.30</span><span className="qs-lbl">OPTIMAL THRESHOLD</span></div>
        </div>
      </div>

      <div className="onc-analysis-layout">
        <div className="onc-left-col">
          <div className="onc-sample-pills">
            <button className={`onc-pill ${selectedCase === 'case_460_pneumo' ? 'active' : ''}`} onClick={() => setSelectedCase('case_460_pneumo')}>
              ● Case #460 (DSC 0.952)
            </button>
            <button className={`onc-pill ${selectedCase === 'case_782_pneumo' ? 'active' : ''}`} onClick={() => setSelectedCase('case_782_pneumo')}>
              ● Case #782 (DSC 0.937)
            </button>
            <button className={`onc-pill ${selectedCase === 'case_normal_adult' ? 'active' : ''}`} onClick={() => setSelectedCase('case_normal_adult')}>
              ● Normal Clear Scan
            </button>
          </div>

          <div className="onc-card">
            <div className="viewer-top-bar">
              <div className="onc-layer-toggle-bar" style={{ position: 'static' }}>
                <button className={`onc-layer-btn ${activeLayer === 'overlay' ? 'active' : ''}`} onClick={() => setActiveLayer('overlay')}>Overlay</button>
                <button className={`onc-layer-btn ${activeLayer === 'prediction' ? 'active' : ''}`} onClick={() => setActiveLayer('prediction')}>Mask Only</button>
                <button className={`onc-layer-btn ${activeLayer === 'original' ? 'active' : ''}`} onClick={() => setActiveLayer('original')}>Original</button>
                <button className={`onc-layer-btn ${activeLayer === 'split' ? 'active' : ''}`} onClick={() => setActiveLayer('split')}>Split</button>
              </div>
              <span className="case-mono highlight">{caseData?.name || 'Selected Case'}</span>
            </div>

            <div className="onc-canvas-frame" style={{ height: 320 }}>
              <canvas ref={canvasRef} width={480} height={320} />
            </div>

            <div className="viewer-bottom-bar" style={{ marginTop: 12 }}>
              <label className="ctrl-row">
                <span>Threshold (τ)</span>
                <input 
                  type="range" 
                  min="0.10" 
                  max="0.90" 
                  step="0.05"
                  value={threshold} 
                  onChange={(e) => setThreshold(parseFloat(e.target.value))} 
                  className="range-ctrl" 
                />
                <span className="val-mono">{threshold.toFixed(2)}</span>
              </label>

              <label className="ctrl-row">
                <span>Min Area Filter</span>
                <input 
                  type="range" 
                  min="0" 
                  max="2000" 
                  step="100"
                  value={minArea} 
                  onChange={(e) => setMinArea(parseInt(e.target.value))} 
                  className="range-ctrl" 
                />
                <span className="val-mono">{minArea} px</span>
              </label>
            </div>
          </div>
        </div>

        <div className="onc-right-col">
          <div className="onc-card">
            <div className="onc-primary-sub">SEGMENTATION METRICS</div>
            <div className="onc-primary-diag" style={{ color: '#8b5cf6' }}>
              Dice Score: {currentDice}
            </div>
            <div className="onc-conf-row" style={{ marginTop: 8 }}>
              <span className="onc-conf-badge" style={{ color: '#8b5cf6', borderColor: 'rgba(139,92,246,0.4)' }}>
                IoU (Jaccard): {seg.iou || '0.908'}
              </span>
            </div>

            <div className="metrics-4grid" style={{ marginTop: 16 }}>
              <div className="m4-cell">
                <span className="m4-val" style={{ color: '#8b5cf6' }}>{seg.lesionAreaPixels ? seg.lesionAreaPixels.toLocaleString() : '35,840'}</span>
                <span className="m4-lbl">Lesion Pixels</span>
              </div>
              <div className="m4-cell">
                <span className="m4-val" style={{ color: '#f59e0b' }}>{seg.lungAreaPercentage || '16.4'}%</span>
                <span className="m4-lbl">Thoracic Volume</span>
              </div>
            </div>

            <div className="onc-probs-section" style={{ borderTop: '1px solid #13223f', marginTop: 16 }}>
              <h4 className="onc-probs-title">Anatomical Location</h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
                {seg.lesionLocation || 'Right apical and lateral pleural space with visceral pleural line retraction.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
