import sys
sys.stdout.reconfigure(encoding='utf-8')
for f in [
    'frontend/components/layout/sidebar.tsx',
    'frontend/app/(dashboard)/layout.tsx',
    'frontend/lib/sidebar-context.tsx',
]:
    src = open(f, encoding='utf-8').read()
    lines = src.split('\n')
    print(f'\n=== {f} ({len(lines)} lines) ===')
    for i, l in enumerate(lines[:15], 1):
        print(f'{i:3}: {l}')
