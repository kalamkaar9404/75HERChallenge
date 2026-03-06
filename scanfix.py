import os, re, sys

# force UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

FILES = [
    ("FRONTEND nutritionist", "frontend/app/api/chat/nutritionist/route.ts"),
    ("FRONTEND chef",         "frontend/app/api/chat/chef/route.ts"),
    ("FRONTEND meal-plan",    "frontend/app/api/chat/meal-plan/route.ts"),
    ("BACKEND openai_client", "backend/utils/openai_client.py"),
]

all_ok = True
for label, path in FILES:
    print(f"\n{'='*55}")
    print(f"  {label}")
    print(f"{'='*55}")
    try:
        src = open(path, encoding="utf-8").read()
    except FileNotFoundError:
        print("  [ERROR] File not found!")
        all_ok = False
        continue

    has_base  = bool(re.search(r"baseURL.*openrouter|base_url.*openrouter", src, re.I))
    has_key   = "OPENAI_API_KEY" in src
    has_model = "openai/gpt-4o" in src

    print(f"  baseURL -> openrouter.ai : {'OK' if has_base else 'MISSING !!!'}")
    print(f"  env var OPENAI_API_KEY   : {'OK' if has_key else 'MISSING !!!'}")
    print(f"  model  openai/gpt-4o     : {'OK' if has_model else 'MISSING !!!'}")

    if not has_base:  all_ok = False
    if not has_key:   all_ok = False
    if not has_model: all_ok = False

    if "meal-plan" in path:
        bad = "json_object" in src
        print(f"  response_format removed  : {'OK' if not bad else 'STILL PRESENT !!!'}")
        if bad: all_ok = False

print(f"\n{'='*55}")
print(f"  RESULT: {'ALL CHECKS PASSED' if all_ok else 'FAILURES - see above'}")
print(f"{'='*55}\n")
