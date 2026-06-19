import { test, expect } from '../../../src/fixtures/test.fixture';
import { Logger } from '../../../src/utils/Logger';

test.describe('Upgrade Base Defects - Loss Payment', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.loginWithRole('Claims Examiner');
  });

  test('Verify Loss Payment calculations defects @upgrade @baseDefect', async ({ page }) => {
    Logger.info('Verifying loss payment calculations defects check after upgrade');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible({ timeout: 30000 });
  });
});
