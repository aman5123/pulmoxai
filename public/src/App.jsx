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
        return <DashboardView onViewChange={setCurrentView} />;
      case 'analyze':
        return <AnalyzeView onOpenExportModal={setExportModalData} />;
      case 'classify':
        return <ClassificationView />;
      case 'segment':
        return <SegmentationView />;
      case 'report':
        return <ReportView onOpenExportModal={setExportModalData} />;
      case 'visualizations':
        return <VisualizationsView />;
      case 'about':
        return <AboutView />;
      default:
        return <DashboardView onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className={`react-app-container ${theme}`}>
      {/* Sidebar Navigation */}
      <Sidebar 
        currentView={currentView}
        onViewChange={(v) => {
          setCurrentView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="react-main-content">
        {/* Header with Institutional Branding */}
        <Header 
          currentView={currentView}
          onViewChange={setCurrentView}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenMobileMenu={() => setIsSidebarOpen(true)}
        />

        {/* Dynamic View Container */}
        <main className="react-view-body">
          {renderCurrentView()}
        </main>
      </div>

      {/* Printable Clinical Report Dialog */}
      {exportModalData && (
        <ExportModal 
          data={exportModalData}
          onClose={() => setExportModalData(null)}
        />
      )}
    </div>
  );
};

// Mount Root React Application
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}
