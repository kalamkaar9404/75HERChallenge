import { network } from 'hardhat';

async function main() {
  // Try connecting with explicit network name
  const conn = await network.connect('amoy');
  console.log('connection type:', typeof conn);
  console.log('keys:', Object.keys(conn));

  // Also try provider directly
  const provider = conn.provider ?? null;
  console.log('provider:', typeof provider);
}

main().catch(e => { console.error(e.message); process.exit(1); });
