// Sidebar.jsx — Modular React Navigation Sidebar with Application Logo & Institutional Details
const Sidebar = ({ currentView, onViewChange, isOpen, onClose }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'analyze', label: 'Chest Analysis', badge: '3-in-1', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'classify', label: 'Classification', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'segment', label: 'Segmentation', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z' },
    { id: 'report', label: 'Radiology Report', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'visualizations', label: 'Data & Charts', badge: 'Live', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
    { id: 'about', label: 'About & Team', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}

      <aside className={`react-sidebar ${isOpen ? 'open' : ''}`}>
        {/* App Logo & Title */}
        <div className="sidebar-brand">
          <div className="brand-logo-wrap">
            <img 
              src="/images/logo.png" 
              alt="PulmoScan Logo" 
              className="brand-logo-img"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div className="brand-text">
            <span className="brand-title">PulmoScan</span>
            <span className="brand-subtitle">Explainable Chest X-AI</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">MAIN WORKBENCH</div>
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onViewChange(item.id);
                  if (onClose) onClose();
                }}
              >
                <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="nav-item-label">{item.label}</span>
                {item.badge && <span className={`nav-badge ${item.badge === '3-in-1' ? 'cyan' : 'green'}`}>{item.badge}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Institutional Attribution Badge */}
        <div className="sidebar-footer">
          <div className="inst-mini-card">
            <img 
              src="/images/ghec_logo.png" 
              alt="GHEC Bilaspur Official Emblem" 
              className="inst-mini-logo"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="inst-mini-text">
              <span className="inst-mini-name">GHEC Bilaspur</span>
              <span className="inst-mini-dept">Dept. of CSE (AI & DS)</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
