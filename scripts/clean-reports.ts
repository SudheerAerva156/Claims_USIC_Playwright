import fs from 'fs';
import path from 'path';
import { Paths } from '../src/constants/paths';

const dirsToClean = [
  Paths.artifactsRoot,
  Paths.dashboardsRoot,
  Paths.htmlReport,
  Paths.allureResults,
  path.join(process.cwd(), 'reports', 'metadata-temp'),
  path.join(process.cwd(), 'logs'),
  path.join(process.cwd(), 'test-results')
];

console.log('Starting execution reports cleanup...');
for (const dir of dirsToClean) {
  if (fs.existsSync(dir)) {
    console.log(`Cleaning: ${dir}`);
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch (e) {
      console.error(`Failed to clean directory ${dir}: ${(e as Error).message}`);
    }
  }
}
console.log('Cleanup completed successfully.');
