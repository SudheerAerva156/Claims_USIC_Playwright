import { Page } from '@playwright/test';
import { Logger } from './Logger';

export class ConsoleCaptureUtil {
  /**
   * Subscribes to console outputs and page errors to redirect them into execution.log.
   */
  public static startCapture(page: Page): void {
    page.on('console', (msg) => {
      const text = msg.text();
      const type = msg.type();
      
      if (type === 'error') {
        Logger.error(`[BROWSER CONSOLE] [${type.toUpperCase()}] ${text}`);
      } else if (type === 'warning') {
        Logger.warn(`[BROWSER CONSOLE] [${type.toUpperCase()}] ${text}`);
      } else {
        Logger.debug(`[BROWSER CONSOLE] [${type.toUpperCase()}] ${text}`);
      }
    });

    page.on('pageerror', (err) => {
      Logger.error(`[BROWSER UNCAUGHT PAGE EXCEPTION]`, err);
    });
  }
}
export default ConsoleCaptureUtil;
