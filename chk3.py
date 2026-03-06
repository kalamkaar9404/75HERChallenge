import os
files = [
    'frontend/components/patient-portal/vitals-overview.tsx',
    'frontend/components/doc-monitor/alert-panel.tsx',
    'frontend/components/doc-monitor/approval-queue.tsx',
    'frontend/components/common/blockchain-badge.tsx',
]
for f in files:
    src = open(f, encoding='utf-8').read()
    exports = [l.strip() for l in src.split('\n') if l.strip().startswith('export')]
    print(f'\n--- {f} ---')
    for e in exports[:8]:
        print(' ', e[:100])
