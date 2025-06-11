import { Router } from 'express';
import { buildContracts, loadValidator } from '../lib/aiken.js';
import { getLucid } from '../lib/lucid.js';

const router = Router();

router.post('/api/deploy', async (_req, res) => {
  try {
    await buildContracts();
    const script = await loadValidator('main');
    const lucid = await getLucid();
    const tx = await lucid.newTx().payToAddressWithData(lucid.wallet.address(), { inline: script }, {});
    const signed = await tx.complete().then(tx => tx.sign().complete());
    const txHash = await signed.submit();
    res.json({ txHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to deploy contract' });
  }
});

export default router;
