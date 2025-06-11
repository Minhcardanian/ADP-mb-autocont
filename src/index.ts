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
import express from 'express';
import dotenv from 'dotenv';
import deployRoute from './routes/deploy.js';
import feeRoute from './routes/fee.js';
import slashRoute from './routes/slash.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.send('ok'));

app.use(deployRoute);
app.use(feeRoute);
app.use(slashRoute);

const port = parseInt(process.env.PORT || '4000', 10);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
