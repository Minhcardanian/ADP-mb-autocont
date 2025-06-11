import { expect } from 'chai';
import { getLucid } from '../src/lib/lucid';

describe('Lucid connection', () => {
  it('returns a Lucid instance with correct network magic', async () => {
    const lucid = await getLucid();
    // @ts-ignore
    expect(lucid.network).to.equal('Testnet');
    // network magic check
    // @ts-ignore
    expect(lucid.provider.networkMagic).to.equal(Number(process.env.NETWORK_MAGIC || 2));
  });
});
