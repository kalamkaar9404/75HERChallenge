files = [
    r'C:\Users\khush\75her\frontend\app\(dashboard)\layout.tsx',
    r'C:\Users\khush\75her\frontend\lib\sidebar-context.tsx',
    r'C:\Users\khush\75her\frontend\components\patient-portal\vitals-overview.tsx',
    r'C:\Users\khush\75her\frontend\components\doc-monitor\alert-panel.tsx',
    r'C:\Users\khush\75her\frontend\components\doc-monitor\approval-queue.tsx',
]
for f in files:
    print('===FILE:', f, '===')
    try:
        with open(f, 'r', encoding='utf-8') as fh:
            print(fh.read())
    except Exception as e:
        print('ERROR:', e)
    print('===END===')
