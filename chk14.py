import sys
sys.stdout.reconfigure(encoding='utf-8')
files = {
    'frontend/components/patient-portal/vitals-overview.tsx': 'VitalsOverview',
    'frontend/components/doc-monitor/alert-panel.tsx': 'AlertPanel',
    'frontend/components/doc-monitor/approval-queue.tsx': 'ApprovalQueue',
}
for path, name in files.items():
    src = open(path, encoding='utf-8').read()
    lines = src.split('\n')
    total = len(lines)
    # check exports
    export_lines = [l.strip() for l in lines if 'export' in l and name in l]
    # check imports for bad refs
    import_lines = [l.strip() for l in lines if l.strip().startswith('import')]
    print(f'\n=== {path} ({total} lines) ===')
    print(f'  Named export found: {any(f"export function {name}" in l or f"export {{ {name}" in l or f"export const {name}" in l for l in lines)}')
    print(f'  Default export: {any("export default" in l for l in lines)}')
    print(f'  Export lines: {export_lines[:3]}')
    # check for state: references (old discriminated union)
    state_refs = [l.strip()[:80] for l in lines if "{ state:" in l]
    if state_refs:
        print(f'  WARNING - old state refs: {state_refs[:3]}')
    print(f'  Imports: {import_lines[:4]}')
