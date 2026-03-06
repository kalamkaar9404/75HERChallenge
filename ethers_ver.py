import json
v = json.load(open('frontend/node_modules/ethers/package.json'))['version']
print('ethers version:', v)
