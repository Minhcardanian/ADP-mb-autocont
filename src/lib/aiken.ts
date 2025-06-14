import { spawn } from 'child_process';
import { readFile } from 'fs/promises';
import path from 'path';

export async function buildContracts(spawnFn = spawn): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const proc = spawnFn('aiken', ['build'], { stdio: 'inherit' });
    proc.on('error', err => {
      reject(err);
    });
    proc.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`aiken build exited with code ${code}`));
    });
  });
}

export async function loadValidator(name: string): Promise<string> {
  const filePath = path.join('plutus.json', `${name}.plutus`);
  const data = await readFile(filePath, 'utf8');
  return data;
}
