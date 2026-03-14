import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const root = process.cwd();
const testDataDir = path.join(root, 'test-data');

function listExportDirs() {
  return fs
    .readdirSync(root, {withFileTypes: true})
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('firebase-export-'))
    .map((entry) => {
      const fullPath = path.join(root, entry.name);
      const stats = fs.statSync(fullPath);
      return {name: entry.name, fullPath, mtimeMs: stats.mtimeMs};
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs);
}

function run(command) {
  return spawnSync(command, {shell: true, stdio: 'inherit'});
}

const beforeExport = new Set(listExportDirs().map((d) => d.name));
console.log('Exporting running Firebase emulators...');
const exportResult = run('firebase emulators:export ./test-data --force');

if (exportResult.status !== 0) {
  // Work around Windows rename EPERM by moving the latest firebase-export-* output into test-data.
  const afterExport = listExportDirs();
  const newExports = afterExport.filter((d) => !beforeExport.has(d.name));
  const fallbackExport = (newExports[0] ?? afterExport[0]) || null;

  if (fallbackExport) {
    if (fs.existsSync(testDataDir)) {
      fs.rmSync(testDataDir, {recursive: true, force: true});
    }
    fs.mkdirSync(testDataDir, {recursive: true});
    fs.cpSync(fallbackExport.fullPath, testDataDir, {recursive: true, force: true});
    if (newExports.some((d) => d.name === fallbackExport.name)) {
      fs.rmSync(fallbackExport.fullPath, {recursive: true, force: true});
    }
    console.log(`Recovered emulator export into ${testDataDir} from ${fallbackExport.name}.`);
  } else {
    console.warn('No emulator export folder found; continuing with shutdown.');
  }
}

console.log('Stopping emulator ports...');
run('npx kill-port 4400 5002 9099 5001 8082 5000 8085 9199');

console.log('Done.');
