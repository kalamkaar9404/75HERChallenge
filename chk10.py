import sys
sys.stdout.reconfigure(encoding='utf-8')
src = open('frontend/components/patient-portal/ai-meal-plan.tsx', encoding='utf-8').read()
# find BlockchainStatus usage
for i, l in enumerate(src.split('\n'), 1):
    if 'BlockchainStatus' in l or 'chainStatus' in l or 'state:' in l:
        print(f'{i:3}: {l}')
