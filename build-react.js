// build-react.js — Transpiles and bundles modular React components into public/js/app.bundle.js
const fs = require('fs');
const path = require('path');
const Babel = require('./public/js/babel.min.js');

const files = [
  'public/src/components/Sidebar.jsx',
  'public/src/components/Header.jsx',
  'public/src/components/ExportModal.jsx',
  'public/src/components/DashboardView.jsx',
  'public/src/components/AnalyzeView.jsx',
  'public/src/components/ClassificationView.jsx',
  'public/src/components/SegmentationView.jsx',
  'public/src/components/ReportView.jsx',
  'public/src/components/VisualizationsView.jsx',
  'public/src/components/AboutView.jsx',
  'public/src/App.jsx'
];

console.log('Reading React components...');
let combined = '';
for (const file of files) {
  const fullPath = path.resolve(__dirname, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing file: ${file}`);
    process.exit(1);
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  combined += `\n/* --- ${file} --- */\n` + content + '\n';
}

console.log('Transpiling React JSX with Babel...');
try {
  const result = Babel.transform(combined, {
    presets: ['react']
  });

  const outPath = path.resolve(__dirname, 'public/js/app.bundle.js');
  fs.writeFileSync(outPath, result.code, 'utf8');
  console.log(`Bundle generated successfully at ${outPath} (${(result.code.length / 1024).toFixed(1)} KB)`);
} catch (err) {
  console.error('Babel transpilation error:', err.message);
  process.exit(1);
}
