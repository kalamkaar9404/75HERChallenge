"""
Add named re-exports so { VitalsOverview } and { AlertPanel } etc. work
alongside the existing default exports.
"""
import re

PATCHES = {
    'frontend/components/patient-portal/vitals-overview.tsx': 'VitalsOverview',
    'frontend/components/doc-monitor/alert-panel.tsx': 'AlertPanel',
    'frontend/components/doc-monitor/approval-queue.tsx': 'ApprovalQueue',
}

for path, name in PATCHES.items():
    src = open(path, encoding='utf-8').read()
    footer = f'\nexport {{ {name} }};\n'
    if footer.strip() not in src:
        # Replace "export default function NAME" -> "function NAME" + add exports at end
        src = src.replace(f'export default function {name}', f'function {name}')
        src = src.rstrip() + f'\n\nexport default {name};\nexport {{ {name} }};\n'
        open(path, 'w', encoding='utf-8').write(src)
        print(f'Patched: {path}')
    else:
        print(f'Already OK: {path}')

# blockchain-badge: the type BlockchainStatus is already exported but BlockchainBadge needs named export
path = 'frontend/components/common/blockchain-badge.tsx'
src = open(path, encoding='utf-8').read()
if 'export { BlockchainBadge }' not in src and 'export function BlockchainBadge' not in src:
    src = src.replace('export default function BlockchainBadge', 'function BlockchainBadge')
    src = src.rstrip() + '\n\nexport default BlockchainBadge;\nexport { BlockchainBadge };\n'
    open(path, 'w', encoding='utf-8').write(src)
    print(f'Patched: {path}')
else:
    print(f'Already OK: {path}')

print('Done.')
