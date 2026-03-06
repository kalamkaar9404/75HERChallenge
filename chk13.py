import sys
sys.stdout.reconfigure(encoding='utf-8')
src = open('frontend/app/(dashboard)/layout.tsx', encoding='utf-8').read()
print(src)
