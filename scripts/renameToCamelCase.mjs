import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const workspaceRoot = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');

const EXCLUDE_DIRS = new Set([
  'node_modules', '.git', '.nuxt', 'dist', 'build', 'coverage', '.output', '.vercel', '.cache', '.husky', '.cursor'
]);

const SPECIAL_BASENAMES = new Set([
  'nuxt.config.ts', 'nuxt.config.js', 'nuxt.config.mjs', 'nuxt.config.cjs',
  'package.json', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock',
  'tailwind.config.js', 'postcss.config.js', 'tsconfig.json', 'README.md',
  'app.vue', 'vercel.json'
]);

const PROCESS_ROOTS = ['src', 'public'];
const RESERVED_TRAILING_SUFFIXES = ['.client', '.server', '.isr', '.edge'];
const BINARY_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.bmp', '.tiff', '.pdf', '.woff', '.woff2', '.ttf', '.eot'
]);

const DRY_RUN = process.env.DRY_RUN === '1' || process.argv.includes('--dry');

function walkDir(dir, onFile) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const name = ent.name;
    // Skip hidden files/dirs (starting with '.')
    if (name.startsWith('.')) continue;

    const full = path.join(dir, name);
    if (ent.isDirectory()) {
      if (EXCLUDE_DIRS.has(name)) continue;
      walkDir(full, onFile);
    } else if (ent.isFile()) {
      onFile(full);
    }
  }
}

function shouldProcessPath(p) {
  const rel = path.relative(workspaceRoot, p);
  const top = rel.split(path.sep)[0];
  return PROCESS_ROOTS.includes(top);
}

function splitReservedSuffix(base) {
  for (const suffix of RESERVED_TRAILING_SUFFIXES) {
    if (base.toLowerCase().endsWith(suffix)) {
      const keepCaseSuffix = base.slice(base.length - suffix.length);
      return { core: base.slice(0, -suffix.length), suffix: keepCaseSuffix };
    }
  }
  return { core: base, suffix: '' };
}

function isLowerCamelCase(str) {
  return /^[a-z][a-z0-9]*(?:[A-Z][a-z0-9]*)*$/.test(str);
}

function toLowerCamelCaseName(originalBase) {
  let leadingUnderscore = '';
  let base = originalBase;
  if (base.startsWith('_')) {
    leadingUnderscore = '_';
    base = base.slice(1);
  }
  if (base.includes('[') || base.includes(']')) return originalBase;

  const { core, suffix } = splitReservedSuffix(base);
  if (isLowerCamelCase(core)) return leadingUnderscore + core + suffix;

  const stripped = core.replace(/[()]/g, '');
  const parts = stripped.split(/[^A-Za-z0-9]+/).filter(Boolean);
  let camel;
  if (parts.length > 1) {
    camel = parts
      .map((p, i) => (i === 0 ? p.toLowerCase() : p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()))
      .join('');
  } else {
    const p = parts[0] ?? stripped ?? core;
    if (!p) return originalBase; // nothing left
    camel = p.charAt(0).toLowerCase() + p.slice(1);
  }
  return leadingUnderscore + camel + suffix;
}

function buildRenamePlan() {
  /** @type {Array<{oldAbs:string, newAbs:string, oldRel:string, newRel:string, oldBase:string, newBase:string}>} */
  const plan = [];

  walkDir(workspaceRoot, (abs) => {
    if (!shouldProcessPath(abs)) return;
    const rel = path.relative(workspaceRoot, abs);
    const baseName = path.basename(rel);
    if (SPECIAL_BASENAMES.has(baseName)) return;

    const ext = path.extname(baseName);
    const dir = path.dirname(rel);
    const nameWithoutExt = baseName.slice(0, -ext.length);

    const newBaseNoExt = toLowerCamelCaseName(nameWithoutExt);
    const newBase = newBaseNoExt + ext; // preserve extension case

    if (newBase === baseName) return;

    const newRel = path.join(dir, newBase);
    plan.push({ oldAbs: abs, newAbs: path.join(workspaceRoot, newRel), oldRel: rel, newRel, oldBase: baseName, newBase });
  });

  const targets = new Map();
  for (const step of plan) {
    if (targets.has(step.newRel)) {
      throw new Error(`Rename conflict: ${step.newRel} for ${targets.get(step.newRel)} and ${step.oldRel}`);
    }
    targets.set(step.newRel, step.oldRel);
  }

  return plan;
}

function applyRenames(plan) {
  const sorted = [...plan].sort((a, b) => b.oldRel.length - a.oldRel.length);
  for (const step of sorted) {
    const newDir = path.dirname(step.newAbs);
    fs.mkdirSync(newDir, { recursive: true });
    if (DRY_RUN) {
      console.log(`[DRY] ${step.oldRel} -> ${step.newRel}`);
    } else {
      fs.renameSync(step.oldAbs, step.newAbs);
      console.log(`RENAMED ${step.oldRel} -> ${step.newRel}`);
    }
  }
}

function isTextFileByExt(file) {
  const ext = path.extname(file).toLowerCase();
  if (BINARY_EXTENSIONS.has(ext)) return false;
  return true;
}

function stripLeadingUnderscore(s) { return s.startsWith('_') ? s.slice(1) : s; }

function updateReferences(plan) {
  const replacements = [];
  for (const { oldBase, newBase } of plan) {
    replacements.push({ from: oldBase, to: newBase });

    const oldBare = stripLeadingUnderscore(oldBase.replace(/\.[^.]+$/, ''));
    const newBare = stripLeadingUnderscore(newBase.replace(/\.[^.]+$/, ''));
    if (oldBare && newBare && oldBare !== newBare) {
      replacements.push({ from: oldBare, to: newBare });
    }
  }

  walkDir(workspaceRoot, (abs) => {
    if (!shouldProcessPath(abs)) return;
    if (!isTextFileByExt(abs)) return;

    const rel = path.relative(workspaceRoot, abs);
    const baseName = path.basename(rel);
    if (SPECIAL_BASENAMES.has(baseName)) return;

    let text = fs.readFileSync(abs, 'utf8');
    let changed = false;

    for (const { from, to } of replacements) {
      if (from === to) continue;
      if (text.includes(from)) {
        text = text.split(from).join(to);
        changed = true;
      }
    }

    if (changed) {
      if (DRY_RUN) {
        console.log(`[DRY] UPDATE ${rel}`);
      } else {
        fs.writeFileSync(abs, text, 'utf8');
        console.log(`UPDATED ${rel}`);
      }
    }
  });
}

function main() {
  console.log('Building rename plan...');
  const plan = buildRenamePlan();
  console.log(`Planned renames: ${plan.length}`);
  if (plan.length === 0) return;
  applyRenames(plan);
  console.log('Updating references...');
  updateReferences(plan);
  console.log('Done.');
}

main();
