import { Router } from 'express';
import { getLucid } from '../lib/lucid.js';

const router = Router();

interface ExtendFeeBody {
  contractAddress: string;
  tenantPubKeyHash: string;
  amount: string;
}

router.post('/api/extend-fee', async (req, res) => {
  const { contractAddress, tenantPubKeyHash, amount } = req.body as Partial<ExtendFeeBody>;
  if (!contractAddress || !tenantPubKeyHash || !amount) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  const value = BigInt(amount);
  if (value <= 0n) {
    return res.status(400).json({ error: 'Amount must be positive' });
  }
  try {
    const lucid = await getLucid();
    const completeTx = await lucid
      .newTx()
      .payToAddress(contractAddress, { lovelace: value })
      .complete();
    const signed = await completeTx.sign().complete();
    const txHash = await signed.submit();
    res.json({ txHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extend fee' });
  }
});

export default router;
