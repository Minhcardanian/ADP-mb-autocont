import { Router } from 'express';
import { getLucid } from '../lib/lucid.js';

const router = Router();

interface ExtendFeeBody {
  contractAddress: string;
  tenantPubKeyHash: string;
  amount: string;
}

router.post('/api/extend-fee', async (req, res) => {
  const { contractAddress, tenantPubKeyHash, amount } = req.body as ExtendFeeBody;
  try {
    const lucid = await getLucid();
    const tx = await lucid
      .newTx()
      .payToAddress(contractAddress, { lovelace: BigInt(amount) })
      .attachSpendingValidator({ type: 'PlutusScriptV2', script: '' });
    const signed = await tx.complete().then(t => t.sign().complete());
    const txHash = await signed.submit();
    res.json({ txHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extend fee' });
  }
});

export default router;
