#!/usr/bin/env node
import { mkdir, readdir, copyFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const srcDir = join(projectRoot, 'src/public/stubs');
const destDir = join(projectRoot, 'public/stubs');

const isJsonFile = (entry) => entry.isFile() && entry.name.endsWith('.json');

async function listJsonFiles(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    return entries.filter(isJsonFile).map((entry) => entry.name);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function syncStubFiles() {
  await mkdir(srcDir, { recursive: true });
  await mkdir(destDir, { recursive: true });

  const [srcFiles, destFiles] = await Promise.all([listJsonFiles(srcDir), listJsonFiles(destDir)]);
  const destFileSet = new Set(destFiles);
  const srcFileSet = new Set(srcFiles);

  for (const file of srcFiles) {
    const sourcePath = join(srcDir, file);
    const destPath = join(destDir, file);
    await copyFile(sourcePath, destPath);
    console.log(`Synced ${file} -> public/stubs`);
  }

  for (const file of destFiles) {
    if (srcFileSet.has(file)) {
      continue;
    }
    const sourcePath = join(destDir, file);
    const destPath = join(srcDir, file);
    await copyFile(sourcePath, destPath);
    console.log(`Backfilled ${file} -> src/public/stubs`);
  }

  console.log('Stub directories are now in sync.');
}

syncStubFiles().catch((error) => {
  console.error('Failed to sync stub data:', error);
  process.exitCode = 1;
});
