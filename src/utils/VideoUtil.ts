import { Page, TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { Logger } from './Logger';

export class VideoUtil {
  /**
   * Resolves execution video paths and copies the video files to the timestamped artifacts directory.
   */
  public static async saveVideo(page: Page, testInfo: TestInfo, artifactRoot: string): Promise<void> {
    try {
      const video = page.video();
      if (video) {
        const videoPath = await video.path();
        if (fs.existsSync(videoPath)) {
          const filename = path.basename(videoPath);
          const targetPath = path.join(artifactRoot, 'videos', filename);
          
          fs.mkdirSync(path.dirname(targetPath), { recursive: true });
          fs.copyFileSync(videoPath, targetPath);
          
          Logger.info(`Saved test video recording to: ${targetPath}`);
        }
      }
    } catch (e) {
      Logger.error(`Failed to copy execution video to artifact path`, e);
    }
  }
}
export default VideoUtil;
