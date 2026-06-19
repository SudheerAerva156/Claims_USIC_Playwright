import fs from 'fs';
import path from 'path';
import { Paths } from '../src/constants/paths';

const metadataTempDir = path.join(process.cwd(), 'reports', 'metadata-temp');
const dashboardsDir = Paths.dashboardsRoot;

fs.mkdirSync(dashboardsDir, { recursive: true });

const tests: any[] = [];

if (fs.existsSync(metadataTempDir)) {
  const files = fs.readdirSync(metadataTempDir).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const filePath = path.join(metadataTempDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      tests.push(data);
    } catch (e) {
      console.error(`Failed to parse metadata file: ${filePath}`);
    }
  }
}

// Calculate Metrics
const total = tests.length;
const passed = tests.filter(t => t.status === 'passed').length;
const failed = tests.filter(t => t.status === 'failed' || t.status === 'timedOut').length;
const skipped = tests.filter(t => t.status === 'skipped').length;
const passRate = total > 0 ? (passed / total) * 100 : 100;
const totalDuration = tests.reduce((sum, t) => sum + (t.duration || 0), 0);

// 1. Execution Summary JSON
const summary = {
  generatedAt: new Date().toISOString(),
  total,
  passed,
  failed,
  skipped,
  passRate: `${passRate.toFixed(2)}%`,
  totalDurationMs: totalDuration,
  suites: {
    smoke: tests.filter(t => t.suite?.toLowerCase().includes('smoke')).length,
    upgradeCapability: tests.filter(t => t.suite?.toLowerCase().includes('capability')).length,
    upgradeDefect: tests.filter(t => t.suite?.toLowerCase().includes('defect')).length,
    regression: tests.filter(t => t.suite?.toLowerCase().includes('regression')).length
  }
};

// 2. Execution History JSON
const historyFile = path.join(dashboardsDir, 'execution-history.json');
let history: any[] = [];
if (fs.existsSync(historyFile)) {
  try {
    history = JSON.parse(fs.readFileSync(historyFile, 'utf-8'));
  } catch (e) {}
}
history.push({
  timestamp: new Date().toISOString(),
  total,
  passed,
  failed,
  skipped,
  passRate: `${passRate.toFixed(2)}%`
});

// 3. Environment Matrix
const environments = ['DEV', 'DEVAT', 'QA', 'QA2', 'CLOUDQA', 'UAT'];
const matrix: Record<string, any> = {};
for (const env of environments) {
  const envTests = tests.filter(t => t.env === env);
  matrix[env] = {
    total: envTests.length,
    passed: envTests.filter(t => t.status === 'passed').length,
    failed: envTests.filter(t => t.status === 'failed' || t.status === 'timedOut').length,
    skipped: envTests.filter(t => t.status === 'skipped').length
  };
}

fs.writeFileSync(
  path.join(dashboardsDir, 'execution-summary.json'),
  JSON.stringify(summary, null, 2),
  'utf-8'
);
fs.writeFileSync(
  historyFile,
  JSON.stringify(history, null, 2),
  'utf-8'
);
fs.writeFileSync(
  path.join(dashboardsDir, 'role-environment-matrix.json'),
  JSON.stringify(matrix, null, 2),
  'utf-8'
);

console.log('Operational executive dashboards generated successfully.');
