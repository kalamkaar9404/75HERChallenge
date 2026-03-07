import { network } from 'hardhat';
import hardhatEthersPlugin from '@nomicfoundation/hardhat-ethers';

async function main() {
  console.log('plugin id:', hardhatEthersPlugin.id);

  // Try connecting — if plugin loaded, connection.ethers should exist
  const conn = await network.connect('amoy');
  console.log('connection keys:', Object.keys(conn));
  console.log('ethers type:', typeof conn.ethers);

  if (conn.ethers) {
    const signers = await conn.ethers.getSigners();
    console.log('signers:', signers.length);
    console.log('address:', signers[0]?.address);
    const bal = await conn.ethers.provider.getBalance(signers[0].address);
    console.log('balance (POL):', conn.ethers.formatEther(bal));
  }
}
main().catch(e => { console.error(e.message); process.exit(1); });
