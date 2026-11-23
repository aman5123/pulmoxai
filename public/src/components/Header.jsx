// Header.jsx — Institutional Header with Government Hydro Engineering College Bilaspur Branding
const Header = ({ currentView, onViewChange, theme, onToggleTheme, onOpenMobileMenu }) => {
  return (
    <header className="react-header">
      <div className="header-left">
        {/* Mobile Hamburger */}
        <button className="mobile-menu-btn" onClick={onOpenMobileMenu} title="Toggle Navigation">
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Institutional Branding: Government Hydro Engineering College Bilaspur */}
        <div className="college-header-brand">
          <img 
            src="/images/ghec_banner.png" 
            alt="Govt. Hydro Engineering College Bilaspur (H.P)" 
            className="college-banner-header-img"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="college-header-info">
            <span className="college-name">Govt. Hydro Engineering College, Bilaspur</span>
            <span className="college-sub">Dept. of Computer Science &amp; Engineering · B.Tech. CSE (AI &amp; DS) 7th Semester Major Project</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        {/* Live System Status Pill with hardware indicator */}
        <div className="status-pill">
          <span className="status-dot"></span>
          <span className="status-text">PyTorch CUDA Online</span>
        </div>

        {/* Quick Action Button */}
        <button 
          className="header-action-btn"
          onClick={() => onViewChange('analyze')}
          title="Open Live Chest Radiography Inference Workbench"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Analyze Scan</span>
        </button>

        {/* Dark/Light Theme Toggle */}
        <button 
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};
