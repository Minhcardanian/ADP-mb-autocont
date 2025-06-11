import { Router } from 'express';
import { getLucid } from '../lib/lucid.js';

const router = Router();

interface SlashBody {
  contractAddress: string;
  violatorPubKeyHash: string;
  reasonCode: string;
}

router.post('/api/slash', async (req, res) => {
  const { contractAddress, violatorPubKeyHash, reasonCode } = req.body as SlashBody;
  try {
    const lucid = await getLucid();
    const tx = await lucid
      .newTx()
      .payToAddress(contractAddress, { lovelace: 0n })
      .attachSpendingValidator({ type: 'PlutusScriptV2', script: '' });
    const signed = await tx.complete().then(t => t.sign().complete());
    const txHash = await signed.submit();
    res.json({ txHash, reasonCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to slash violator' });
  }
});

export default router;
