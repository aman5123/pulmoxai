// AboutView.jsx — Institutional Branding, Team Details & Academic Research Specifications
const AboutView = () => {
  return (
    <div className="react-about-page">
      {/* Official College Header Banner */}
      <div className="about-official-banner-box">
        <img 
          src="/images/ghec_banner.png" 
          alt="Govt. Hydro Engineering College Bilaspur (H.P)" 
          className="about-official-banner-img"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Institutional Hero Banner */}
      <div className="about-inst-banner">
        <div className="aib-left">
          <div className="aib-badge">
            <span className="pulse-dot"></span>
            GOVERNMENT HYDRO ENGINEERING COLLEGE, BILASPUR
          </div>
          <h2 className="aib-title">
            Department of Computer Science &amp; Engineering<br />
            <span className="accent-text">B.Tech. CSE (AI &amp; Data Science)</span>
          </h2>
          <p className="aib-desc">
            Final Year Major Project: <em>"Explainable Deep Learning System for Chest Radiographs — Integrated Disease Classification, Lesion Boundary Segmentation, and Natural Language Report Generation"</em>. 
            Academic Year 2026.
          </p>
          <div className="aib-tags">
            <span className="tag-pill">Bandla, Bilaspur, Himachal Pradesh</span>
            <span className="tag-pill">7th Semester Major Project</span>
            <span className="tag-pill">Joint Technical Society</span>
          </div>
        </div>

        <div className="aib-right">
          <div className="college-seal-box">
            <img 
              src="/images/ghec_logo.png" 
              alt="Government Hydro Engineering College Bilaspur Official Emblem" 
              className="college-seal-img"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="seal-caption">Official Institutional Emblem</span>
          </div>
        </div>
      </div>

      {/* Project Supervisor Card */}
      <div className="about-section">
        <h3 className="section-heading">Project Supervisor &amp; Research Mentor</h3>
        <div className="supervisor-react-card">
          <img 
            src="/static/team/dr_ravi_kumar.jpg?v=20261123-2" 
            alt="Dr. Ravi Kumar" 
            className="sup-avatar" 
            onError={(e) => { e.currentTarget.src = '/images/Dr. Ravi Kumar.jpg'; }}
          />
          <div className="sup-details">
            <div className="sup-badge">Faculty Mentor</div>
            <h4 className="sup-name">Dr. Ravi Kumar</h4>
            <p className="sup-title">Assistant Professor, Department of Computer Science &amp; Engineering</p>
            <p className="sup-inst">Government Hydro Engineering College, Bandla, Bilaspur (HP)</p>
            <p className="sup-bio">
              Mentoring research in Explainable Artificial Intelligence (XAI), Medical Image Processing, Trustworthy Machine Learning, and Computer Vision for Clinical Diagnostics. Guiding the formulation of mathematical loss functions, threshold optimization, and publication-ready benchmarking.
            </p>
          </div>
        </div>
      </div>

      {/* Student Research Team Grid */}
      <div className="about-section">
        <h3 className="section-heading">Student Research Team</h3>
        <div className="team-react-grid">
          {/* Aman - Lead */}
          <div className="team-react-card lead">
            <div className="trc-avatar-wrap">
              <img 
                src="/static/team/aman.jpg?v=20261123-2" 
                alt="Aman" 
                className="trc-avatar" 
                onError={(e) => { e.currentTarget.src = '/static/team/aman.jpeg'; }}
              />
              <span className="trc-lead-pill">Lead Developer</span>
            </div>
            <h4 className="trc-name">Aman</h4>
            <span className="trc-roll">23010503008</span>
            <span className="trc-role">Lead Engineer — DL Architecture &amp; Web System</span>
            <p className="trc-dept">B.Tech. CSE (AI &amp; DS), 7th Semester</p>
            <p className="trc-bio">
              Architected the multimodal deep learning pipelines, Grad-CAM visualization, and the full-stack React clinical web interface.
            </p>
            <div className="trc-links">
              <a href="https://www.linkedin.com/in/aman-verma-214ba9304/" target="_blank" rel="noreferrer" className="trc-link li">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                LinkedIn
              </a>
              <a href="https://github.com/aman5123" target="_blank" rel="noreferrer" className="trc-link gh">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </a>
              <a href="mailto:amanvrma089@gmail.com" className="trc-link em">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                Email
              </a>
            </div>
          </div>

          {/* Samriti */}
          <div className="team-react-card">
            <div className="trc-avatar-wrap">
              <img 
                src="/static/team/samriti.jpg?v=20261123-2" 
                alt="Samriti" 
                className="trc-avatar" 
                onError={(e) => { e.currentTarget.src = '/images/samriti.jpg'; }}
              />
            </div>
            <h4 className="trc-name">Samriti</h4>
            <span className="trc-roll">23010503053</span>
            <span className="trc-role" style={{ color: '#8b5cf6' }}>Segmentation Module Lead</span>
            <p className="trc-dept">B.Tech. CSE (AI &amp; DS), 7th Semester</p>
            <p className="trc-bio">
              Engineered UNet++ with EfficientNet-B3 backbone and scSE attention blocks. Executed grid search optimizing decision threshold to τ = 0.30.
            </p>
          </div>

          {/* Simran */}
          <div className="team-react-card">
            <div className="trc-avatar-wrap">
              <img 
                src="/static/team/simran.jpg?v=20261123-2" 
                alt="Simran" 
                className="trc-avatar" 
                onError={(e) => { e.currentTarget.src = '/images/simran.jpg'; }}
              />
            </div>
            <h4 className="trc-name">Simran</h4>
            <span className="trc-roll">23010503064</span>
            <span className="trc-role" style={{ color: '#10b981' }}>NLP &amp; Captioning Lead</span>
            <p className="trc-dept">B.Tech. CSE (AI &amp; DS), 7th Semester</p>
            <p className="trc-bio">
              Designed the Dual-Branch Swin-T + Dense CNN encoder with learned Attention Gating and DistilGPT-2 beam search text generation.
            </p>
          </div>

          {/* Sparsh Thakur */}
          <div className="team-react-card">
            <div className="trc-avatar-wrap">
              <img 
                src="/static/team/sparsh.jpeg?v=20261123-2" 
                alt="Sparsh Thakur" 
                className="trc-avatar" 
                onError={(e) => { e.currentTarget.src = '/images/sparsh.jpeg'; }}
              />
            </div>
            <h4 className="trc-name">Sparsh Thakur</h4>
            <span className="trc-roll">23010503066</span>
            <span className="trc-role" style={{ color: '#f59e0b' }}>Data Engineering &amp; Metrics Lead</span>
            <p className="trc-dept">B.Tech. CSE (AI &amp; DS), 7th Semester</p>
            <p className="trc-bio">
              Constructed leak-free patient-stratified split pipelines, CLAHE preprocessing, and statistically evaluated all 3 modules against baselines.
            </p>
          </div>
        </div>
      </div>

      {/* Datasets Detailed Showcase */}
      <div className="about-section">
        <h3 className="section-heading">Clinical Training &amp; Evaluation Datasets</h3>
        <div className="datasets-rich-grid">
          {/* Kermany Pneumonia */}
          <div className="dataset-rich-card">
            <div className="ds-img-wrap">
              <img src="/static/datasets/dataset_pneumonia.png" alt="Chest X-Ray Pneumonia Dataset" className="ds-img" />
            </div>
            <div className="ds-card-body">
              <div className="ds-badge-row">
                <span className="ds-tag">Classification</span>
                <span className="ds-tag" style={{ color: '#00c2ff', borderColor: 'rgba(0,194,255,0.3)' }}>Cell 2018</span>
              </div>
              <h4 className="ds-title">Chest X-Ray Images (Pneumonia)</h4>
              <p className="ds-desc">
                Curated by Kermany et al. Collected from Guangzhou Women and Children's Medical Center. Validated by two independent radiologists with a third senior physician adjudicating ambiguous cases.
              </p>
              <div className="ds-meta-grid">
                <div className="ds-meta-item"><span>Total Images</span><span>5,856</span></div>
                <div className="ds-meta-item"><span>Split Ratio</span><span>80 / 10 / 10</span></div>
                <div className="ds-meta-item"><span>Pneumonia</span><span>4,273 Cases</span></div>
                <div className="ds-meta-item"><span>Normal</span><span>1,583 Cases</span></div>
              </div>
            </div>
          </div>

          {/* SIIM-ACR Pneumothorax */}
          <div className="dataset-rich-card">
            <div className="ds-img-wrap">
              <img src="/static/datasets/dataset_pneumothorax.png" alt="SIIM-ACR Pneumothorax Dataset" className="ds-img" />
            </div>
            <div className="ds-card-body">
              <div className="ds-badge-row">
                <span className="ds-tag" style={{ color: '#8b5cf6', borderColor: 'rgba(139,92,246,0.3)' }}>Segmentation</span>
                <span className="ds-tag" style={{ color: '#8b5cf6', borderColor: 'rgba(139,92,246,0.3)' }}>SIIM / ACR</span>
              </div>
              <h4 className="ds-title">SIIM-ACR Pneumothorax</h4>
              <p className="ds-desc">
                High-resolution thoracic radiographs annotated with fine pixel-level Run-Length Encoded (RLE) masks by certified board members of the Society for Imaging Informatics in Medicine.
              </p>
              <div className="ds-meta-grid">
                <div className="ds-meta-item"><span>Total Scans</span><span>12,047</span></div>
                <div className="ds-meta-item"><span>Prevalence</span><span>22.3% Positive</span></div>
                <div className="ds-meta-item"><span>Resolution</span><span>1024 × 1024</span></div>
                <div className="ds-meta-item"><span>Annotations</span><span>Pixel RLE Masks</span></div>
              </div>
            </div>
          </div>

          {/* Indiana University Open-I */}
          <div className="dataset-rich-card">
            <div className="ds-img-wrap">
              <img src="/static/datasets/dataset_indiana.png" alt="Indiana University Open-I Dataset" className="ds-img" />
            </div>
            <div className="ds-card-body">
              <div className="ds-badge-row">
                <span className="ds-tag" style={{ color: '#10b981', borderColor: 'rgba(16,185,129,0.3)' }}>Captioning</span>
                <span className="ds-tag" style={{ color: '#10b981', borderColor: 'rgba(16,185,129,0.3)' }}>NIH Open-I</span>
              </div>
              <h4 className="ds-title">Indiana University Open-I</h4>
              <p className="ds-desc">
                Open-access radiology examination dataset from the U.S. National Library of Medicine (NLM). Contains paired frontal and lateral chest radiographs with complete de-identified clinical reports.
              </p>
              <div className="ds-meta-grid">
                <div className="ds-meta-item"><span>Total Studies</span><span>7,466</span></div>
                <div className="ds-meta-item"><span>Frontal Used</span><span>3,818 Reports</span></div>
                <div className="ds-meta-item"><span>Vocab Size</span><span>1,420 Tokens</span></div>
                <div className="ds-meta-item"><span>Sections</span><span>Findings &amp; Imp.</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Footer */}
      <div className="inst-footer">
        <div className="inst-footer-logo">Government Hydro Engineering College, Bilaspur</div>
        <div className="inst-footer-sub">
          Department of Computer Science &amp; Engineering · Bandla, Bilaspur, Himachal Pradesh, India — 174001
        </div>
        <div className="inst-footer-meta">
          <span><strong>Programme:</strong> B.Tech. CSE (AI &amp; Data Science)</span>
          <span><strong>Academic Session:</strong> 7th Semester Major Project (2026)</span>
          <span><strong>Supervisor:</strong> Dr. Ravi Kumar, Assistant Professor</span>
          <span><strong>Student Lead:</strong> Aman (23010503008)</span>
        </div>
      </div>
    </div>
  );
};
