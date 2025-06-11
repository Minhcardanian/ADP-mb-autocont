import { expect } from 'chai';
import sinon from 'sinon';
import { buildContracts } from '../src/lib/aiken.js';

describe('Contracts', () => {
  afterEach(() => sinon.restore());

  it('builds without errors', async () => {
    const fakeProc = { on: (evt: string, cb: (arg: any) => void) => {
      if (evt === 'close') cb(0);
      return fakeProc;
    }} as any;
    const spawnStub = sinon.stub().returns(fakeProc);

    await buildContracts(spawnStub);

    expect(spawnStub.calledWith('aiken', ['build'])).to.be.true;
  });
});
