import { Router } from 'express';
import { buildContracts, loadValidator } from '../lib/aiken.js';
import { getLucid } from '../lib/lucid.js';

let buildPromise: Promise<void> | null = null;
async function ensureContractsBuilt(): Promise<void> {
  if (!buildPromise) {
    buildPromise = buildContracts();
  }
  return buildPromise;
}

const router = Router();

router.post('/api/deploy', async (_req, res) => {
  try {
    await ensureContractsBuilt();
    const script = await loadValidator('main');
    const lucid = await getLucid();
    const walletAddr = await lucid.wallet.address();
    const completeTx = await lucid
      .newTx()
      .payToAddressWithData(walletAddr, { inline: script }, { lovelace: 0n })
      .complete();
    const signed = await completeTx.sign().complete();
    const txHash = await signed.submit();
    res.json({ txHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to deploy contract' });
  }
});

export default router;
