import fs from 'fs';
import path from 'path';
import { Paths } from '../constants/paths';

export class ArtifactManager {
  /**
   * Retrieves padded parts of the current system time.
   */
  public static getTimestampParts(date = new Date()) {
    const yyyy = String(date.getFullYear());
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return { yyyy, mm, dd, hh, mi, ss, stamp: `${yyyy}${mm}${dd}_${hh}${mi}${ss}` };
  }

  /**
   * Formats and returns target folder structure for saving artifacts.
   * Path: reports/artifacts/<YYYY>/<MM>/<DD>/<ENV>/<SUITE>/<BROWSER>/<TEST_NAME>/
   */
  public static buildTestArtifactPath(
    env: string,
    suite: string,
    browser: string,
    testName: string
  ): string {
    const { yyyy, mm, dd } = this.getTimestampParts();
    // Sanitize test title to avoid invalid file/directory characters
    const sanitized = testName.replace(/[^a-zA-Z0-9-_]/g, '_').substring(0, 100);
    const finalPath = path.join(
      Paths.artifactsRoot,
      yyyy,
      mm,
      dd,
      env,
      suite,
      browser,
      sanitized
    );
    
    // Ensure all subfolders exist
    fs.mkdirSync(path.join(finalPath, 'screenshots'), { recursive: true });
    fs.mkdirSync(path.join(finalPath, 'videos'), { recursive: true });
    fs.mkdirSync(path.join(finalPath, 'traces'), { recursive: true });
    fs.mkdirSync(path.join(finalPath, 'logs'), { recursive: true });
    
    return finalPath;
  }
}
export default ArtifactManager;
