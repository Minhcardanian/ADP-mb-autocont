import { expect } from 'chai';
import sinon from 'sinon';
import { Lucid } from 'lucid-cardano';
import { getLucid } from '../src/lib/lucid.js';

process.env.BLOCKFROST_PROJECT_ID = 'test_project_id';

describe('Lucid connection', () => {
  afterEach(() => sinon.restore());

  it('returns a Lucid instance with correct network magic', async () => {
    const fakeLucid = { network: 'Preview', provider: { networkMagic: 2 } } as any;
    const stub = sinon.stub(Lucid, 'new').resolves(fakeLucid);

    const lucid = await getLucid();

    expect(stub.called).to.be.true;
    expect(lucid.network).to.equal('Preview');
    expect((lucid as any).provider.networkMagic).to.equal(2);
  });
});
