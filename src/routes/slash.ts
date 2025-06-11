import { Router } from 'express';
import { getLucid } from '../lib/lucid.js';

const router = Router();

interface SlashBody {
  contractAddress: string;
  violatorPubKeyHash: string;
  reasonCode: string;
}

router.post('/api/slash', async (req, res) => {
  const { contractAddress, violatorPubKeyHash, reasonCode } = req.body as Partial<SlashBody>;
  if (!contractAddress || !violatorPubKeyHash || !reasonCode) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  try {
    const lucid = await getLucid();
    const completeTx = await lucid
      .newTx()
      .payToAddress(contractAddress, { lovelace: 0n })
      .complete();
    const signed = await completeTx.sign().complete();
    const txHash = await signed.submit();
    res.json({ txHash, reasonCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to slash violator' });
  }
});

export default router;
