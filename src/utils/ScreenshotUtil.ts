import { Page, TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { Logger } from './Logger';

export class ScreenshotUtil {
  /**
   * Captures full-page screenshot, saves to local disk and attaches to Playwright context.
   */
  public static async capture(
    page: Page,
    testInfo: TestInfo,
    statusOrStep: string,
    artifactRoot?: string
  ): Promise<string | null> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const sanitizedTestName = testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_');
      const filename = `${sanitizedTestName}_${statusOrStep}_${timestamp}.png`;
      
      let targetPath: string;
      if (artifactRoot) {
        targetPath = path.join(artifactRoot, 'screenshots', filename);
      } else {
        targetPath = path.join(process.cwd(), 'reports', 'artifacts', 'screenshots', filename);
      }

      // Ensure containing directory exists
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });

      Logger.info(`Capturing screenshot for '${testInfo.title}' [Step/Status: ${statusOrStep}]`);
      const buffer = await page.screenshot({ fullPage: true });
      
      fs.writeFileSync(targetPath, buffer);

      // Attach to reports
      await testInfo.attach(`${statusOrStep}-screenshot`, {
        body: buffer,
        contentType: 'image/png'
      });

      Logger.info(`Screenshot saved locally to: ${targetPath}`);
      return targetPath;
    } catch (e) {
      Logger.error(`Failed to capture screenshot for step: ${statusOrStep}`, e);
      return null;
    }
  }
}
export default ScreenshotUtil;
