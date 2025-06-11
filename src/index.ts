import { networkConfig } from './config.ts';
import { Lucid } from 'lucid-cardano';
import { extendFee, applyPenalty, terminateContract } from './core.ts';

async function main() {
  const lucid = await Lucid.new(undefined, networkConfig);
  console.log('Lucid configured for network magic', networkConfig.magic);

  await extendFee();
  await applyPenalty();
  await terminateContract();
}

main();
