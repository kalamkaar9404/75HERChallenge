const fs = require('fs');
const base = 'C:/Users/khush/75her/frontend/';
const files = [
  'app/(dashboard)/layout.tsx',
  'components/layout/sidebar.tsx',
  'components/layout/topbar.tsx',
  'components/patient-portal/vitals-overview.tsx',
  'components/doc-monitor/alert-panel.tsx',
  'components/doc-monitor/approval-queue.tsx',
  'components/common/blockchain-badge.tsx',
  'lib/sidebar-context.tsx',
];
for (const f of files) {
  console.log('\n=== FILE: ' + f + ' ===');
  try {
    console.log(fs.readFileSync(base + f, 'utf8'));
  } catch(e) {
    console.log('ERROR: ' + e.message);
  }
}
