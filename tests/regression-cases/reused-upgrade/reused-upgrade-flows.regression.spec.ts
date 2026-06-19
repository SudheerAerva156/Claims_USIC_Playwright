import { test, expect } from '../../../src/fixtures/test.fixture';
import { Logger } from '../../../src/utils/Logger';

test.describe('Regression - Reused Upgrade Flows', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.loginWithRole('Admin');
  });

  test('Verify Core System Capabilities in Regression run @regression @reusedUpgrade', async ({ page }) => {
    Logger.info('Verifying main menu navigation links in regression run');
    await expect(page.locator('a:has-text("Claim")').first()).toBeVisible();
    await expect(page.locator('a:has-text("Vendor")').first()).toBeVisible();
  });
});
