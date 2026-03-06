import json, os
# Check lucide-react version
pkg = json.load(open('frontend/node_modules/lucide-react/package.json'))
print('lucide-react version:', pkg['version'])

# Check if ChefHat exists
lucide_index = 'frontend/node_modules/lucide-react/dist/esm/lucide-react.js'
if os.path.exists(lucide_index):
    src = open(lucide_index, encoding='utf-8').read()
    print('ChefHat in lucide:', 'ChefHat' in src)
    print('Leaf in lucide:', 'Leaf' in src)
    print('Activity in lucide:', 'Activity' in src)
else:
    # try the index.js
    lucide_index = 'frontend/node_modules/lucide-react/dist/cjs/lucide-react.js'
    src = open(lucide_index, encoding='utf-8').read()
    print('ChefHat in lucide:', 'ChefHat' in src)
