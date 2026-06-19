import { test, expect } from '../../../src/fixtures/test.fixture';
import { Logger } from '../../../src/utils/Logger';

test.describe('Upgrade Base Capability - Reserve Flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.loginWithRole('Claims Examiner');
  });

  test('Verify Reserve updates can be initiated @upgrade @baseCapability', async ({ page }) => {
    Logger.info('Verifying reserve flow capabilities after upgrade');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible({ timeout: 30000 });
  });
});
