import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// Resolve the path to the regression-list.json
const listPath = path.join(__dirname, 'regression-list.json');

if (!fs.existsSync(listPath)) {
  console.error(`[Regression Runner] List file not found at: ${listPath}`);
  process.exit(1);
}

let files: string[] = [];
try {
  files = JSON.parse(fs.readFileSync(listPath, 'utf8'));
} catch (e) {
  console.error(`[Regression Runner] Failed to parse JSON list from ${listPath}:`, (e as Error).message);
  process.exit(1);
}

if (!Array.isArray(files) || files.length === 0) {
  console.log('[Regression Runner] No files specified in the regression list. Exiting.');
  process.exit(0);
}

// Resolve paths to find where they exist (either relative to workspace root or relative to tests/regression/)
const resolvedFiles: string[] = [];
for (const file of files) {
  // Attempt 1: Resolve relative to workspace root (e.g. "tests/smoke/login-and-basic-claim-flow.smoke.spec.ts")
  let resolved = path.resolve(process.cwd(), file);
  if (!fs.existsSync(resolved)) {
    // Attempt 2: Resolve relative to the list directory (e.g. "../smoke/login-and-basic-claim-flow.smoke.spec.ts")
    resolved = path.resolve(__dirname, file);
  }
  
  if (fs.existsSync(resolved)) {
    resolvedFiles.push(path.relative(process.cwd(), resolved).replace(/\\/g, '/'));
  } else {
    console.warn(`[Regression Runner] WARNING: Test file not found in workspace: "${file}"`);
  }
}

if (resolvedFiles.length === 0) {
  console.error('[Regression Runner] ERROR: None of the specified test files could be found. Exiting.');
  process.exit(1);
}

console.log(`\n======================================================================`);
console.log(`[REGRESSION RUNNER] Orchestrating execution for ${resolvedFiles.length} file(s):`);
resolvedFiles.forEach(f => console.log(`  - ${f}`));
console.log(`======================================================================\n`);

// Capture extra CLI arguments (e.g., --headed, --project=chromium, --grep=@smoke)
const extraArgs = process.argv.slice(2);

// Construct playwright run parameters
const args = ['playwright', 'test', ...resolvedFiles, ...extraArgs];
const activeEnv = process.env.ENV || 'QA';

// Spawn Playwright runner dynamically
const child = spawn('npx', args, {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    ENV: activeEnv
  }
});

child.on('close', (code) => {
  process.exit(code ?? 0);
});
