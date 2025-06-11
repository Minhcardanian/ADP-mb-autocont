import { Lucid, Blockfrost } from 'lucid-cardano';
import dotenv from 'dotenv';

dotenv.config();

let lucid: Lucid | null = null;

export async function getLucid(): Promise<Lucid> {
  if (lucid) return lucid;
  const projectId = process.env.BLOCKFROST_PROJECT_ID || '';
  if (!projectId) {
    throw new Error('BLOCKFROST_PROJECT_ID not set');
  }
  lucid = await Lucid.new(
    new Blockfrost('https://cardano-preview.blockfrost.io/api/v0', projectId),
    'Preview'
  );
  return lucid;
}
