import { test, expect } from '../../../src/fixtures/test.fixture';
import { Logger } from '../../../src/utils/Logger';

test.describe('Upgrade Base Capability - Claim Search', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.loginWithRole('Admin');
  });

  test('Verify Core Claims Search Menu navigation @upgrade @baseCapability', async ({ page }) => {
    Logger.info('Verifying main menu navigation links exist after upgrade');
    await expect(page.locator('a:has-text("Claim")').first()).toBeVisible();
    await expect(page.locator('a:has-text("Vendor")').first()).toBeVisible();
    await expect(page.locator('a:has-text("Special Functions")').first()).toBeVisible();
    await expect(page.locator('a:has-text("Reports")').first()).toBeVisible();
  });
});
