import { ethers } from '../frontend/node_modules/ethers/dist/ethers.js';

const WALLET = '0x2e988A386a799F506693793c6A5AF6B54dfAaBfB';
const RPC    = 'https://rpc-amoy.polygon.technology';

const provider = new ethers.JsonRpcProvider(RPC);
const bal      = await provider.getBalance(WALLET);
const fees     = await provider.getFeeData();

const DEPLOY_GAS  = 800000n;  // conservative estimate for MedicalIntegrity
const ANCHOR_GAS  = 100000n;  // anchorRecord() call
const TOTAL_GAS   = DEPLOY_GAS + ANCHOR_GAS;
const deployCost  = DEPLOY_GAS * fees.gasPrice;
const anchorCost  = ANCHOR_GAS * fees.gasPrice;
const totalCost   = TOTAL_GAS  * fees.gasPrice;

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(' Wallet         :', WALLET);
console.log(' Balance (POL)  :', ethers.formatEther(bal));
console.log(' Gas Price      :', ethers.formatUnits(fees.gasPrice, 'gwei'), 'gwei');
console.log('');
console.log(' Cost to deploy :', ethers.formatEther(deployCost), 'POL');
console.log(' Cost to anchor :', ethers.formatEther(anchorCost), 'POL');
console.log(' TOTAL NEEDED   :', ethers.formatEther(totalCost), 'POL');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

if (bal >= totalCost) {
  console.log(' STATUS: READY TO DEPLOY');
} else {
  const need = totalCost - bal;
  console.log(' STATUS: NEED MORE POL');
  console.log(' Shortfall     :', ethers.formatEther(need), 'POL');
  console.log('');
  console.log(' Get free POL at: https://faucet.polygon.technology');
  console.log(' Enter address  :', WALLET);
  console.log(' Select network : Polygon Amoy');
}
console.log('');
