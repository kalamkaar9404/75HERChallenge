src = open('frontend/lib/luxury-animations.ts', encoding='utf-8').read()
lines = [l for l in src.split('\n') if 'export' in l]
print('\n'.join(lines[:20]))
