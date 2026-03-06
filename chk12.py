import sys
sys.stdout.reconfigure(encoding='utf-8')
for f in [
    'frontend/components/layout/topbar.tsx',
    'frontend/components/layout/sidebar.tsx',
]:
    src = open(f, encoding='utf-8').read()
    exports = [l for l in src.split('\n') if 'export' in l and ('function' in l or 'default' in l or 'const' in l)]
    print(f'\n=== {f} ===')
    for e in exports[:6]:
        print(' ', e.strip()[:120])
