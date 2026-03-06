for f in [
    'frontend/components/kitchen-command/recipe-guide.tsx',
    'frontend/app/(dashboard)/kitchen-command/page.tsx',
]:
    src = open(f, encoding='utf-8').read()
    lines = [l for l in src.split('\n') if 'import' in l]
    print(f'\n--- {f} ---')
    for l in lines:
        print(' ', l[:120])
