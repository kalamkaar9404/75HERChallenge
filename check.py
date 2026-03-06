import json, os

print("=== ROOT package.json ===")
with open('package.json') as f:
    p = json.load(f)
print(json.dumps(p['scripts'], indent=2))

print("\n=== FILE TREE (new files) ===")
new_files = [
    'package.json',
    'start.bat',
    'start.sh',
    'frontend/next.config.mjs',
    'frontend/app/api/chat/nutritionist/route.ts',
    'frontend/app/api/chat/chef/route.ts',
    'README.md',
]
for f in new_files:
    exists = "OK" if os.path.exists(f) else "MISSING"
    size = os.path.getsize(f) if os.path.exists(f) else 0
    print(f"  [{exists}]  {f}  ({size} bytes)")

print("\n=== ENV FILES CHECK ===")
env_files = [
    ('frontend/.env.local',  'frontend/.env.local.example'),
    ('backend/.env',          'backend/.env.example'),
]
for actual, example in env_files:
    a = "PRESENT" if os.path.exists(actual) else "MISSING - copy from example!"
    e = "OK" if os.path.exists(example) else "MISSING"
    print(f"  [{a}]  {actual}")
    print(f"  [{e}]  example: {example}")
