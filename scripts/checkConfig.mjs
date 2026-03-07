import hre from 'hardhat';
async function main() {
  console.log('userConfig.plugins:', JSON.stringify(hre.userConfig?.plugins?.map(p => p?.id)));
  console.log('config.plugins count:', hre.config.plugins?.length);
  hre.config.plugins.forEach(p => console.log(' -', p.id));
}
main().catch(e => { console.error(e); process.exit(1); });
