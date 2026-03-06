import sys
sys.stdout.reconfigure(encoding='utf-8')
src = open('frontend/app/(dashboard)/doc-monitor/page.tsx', encoding='utf-8').read()
lines = src.split('\n')
for i, l in enumerate(lines[:30], 1):
    print(f'{i:3}: {l}')
