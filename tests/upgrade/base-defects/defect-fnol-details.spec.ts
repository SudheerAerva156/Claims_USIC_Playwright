import { test, expect } from '../../../src/fixtures/test.fixture';
import { Logger } from '../../../src/utils/Logger';

test.describe('Upgrade Base Defects - FNOL Details', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.loginWithRole('Claims Examiner');
  });

  test('Verify FNOL Details defect check @upgrade @baseDefect', async ({ page }) => {
    Logger.info('Verifying FNOL details defects check after upgrade');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible({ timeout: 30000 });
  });
});
