import json
fe = json.load(open('frontend/package.json'))
print('framer-motion:', fe['dependencies'].get('framer-motion','NOT FOUND'))
print('ethers:', fe['dependencies'].get('ethers','NOT FOUND'))
