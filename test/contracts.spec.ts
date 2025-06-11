import { expect } from 'chai';
import { buildContracts } from '../src/lib/aiken.js';

describe('Contracts', () => {
  it('builds without errors', async () => {
    await buildContracts();
    expect(true).to.be.true;
  });
});
