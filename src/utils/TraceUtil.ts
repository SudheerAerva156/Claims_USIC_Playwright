import { TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { Logger } from './Logger';

export class TraceUtil {
  /**
   * Scans test attachments for trace zip files and saves them to the structured artifact folder.
   */
  public static async saveTrace(testInfo: TestInfo, artifactRoot: string): Promise<void> {
    try {
      const traceAttachment = testInfo.attachments.find(
        (a) => a.name === 'trace' || a.contentType?.includes('zip')
      );
      
      if (traceAttachment && traceAttachment.path && fs.existsSync(traceAttachment.path)) {
        const targetPath = path.join(artifactRoot, 'traces', path.basename(traceAttachment.path));
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.copyFileSync(traceAttachment.path, targetPath);
        Logger.info(`Saved test trace archive to: ${targetPath}`);
      }
    } catch (e) {
      Logger.error(`Failed to copy execution trace file to artifact path`, e);
    }
  }
}
export default TraceUtil;
