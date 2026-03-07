import p from '@nomicfoundation/hardhat-ethers';
console.log('Plugin id:', p.id);
console.log('Plugin keys:', Object.keys(p));
console.log('hookHandlers:', p.hookHandlers ? Object.keys(p.hookHandlers) : 'none');
