import { TestInfo } from '@playwright/test';

export class AllureUtil {
  /**
   * Adds key/value tags to the Playwright test annotations so they parse cleanly into Allure reporting.
   */
  public static addMetadata(testInfo: TestInfo, env: string, suite: string): void {
    testInfo.annotations.push({
      type: 'environment',
      description: env
    });
    testInfo.annotations.push({
      type: 'suite',
      description: suite
    });
  }
}
export default AllureUtil;
