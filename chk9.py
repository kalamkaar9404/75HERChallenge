import sys
sys.stdout.reconfigure(encoding='utf-8')

for f in [
    'frontend/components/common/blockchain-badge.tsx',
    'frontend/components/doc-monitor/patient-list.tsx',
]:
    src = open(f, encoding='utf-8').read()
    lines = src.split('\n')
    print(f'\n=== {f} (first 40 lines) ===')
    for i, l in enumerate(lines[:40], 1):
        print(f'{i:3}: {l}')
