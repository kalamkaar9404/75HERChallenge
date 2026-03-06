import os
files = [
    'frontend/components/kitchen-command/active-orders-list.tsx',
    'frontend/components/kitchen-command/recipe-guide.tsx',
    'frontend/components/kitchen-command/chef-chatbot.tsx',
]
for f in files:
    src = open(f, encoding='utf-8').read()
    exports = [l.strip() for l in src.split('\n') if 'export' in l and ('function' in l or 'const' in l or 'class' in l or 'default' in l)]
    print(f'\n--- {f} ---')
    for e in exports[:5]:
        print(' ', e[:100])
