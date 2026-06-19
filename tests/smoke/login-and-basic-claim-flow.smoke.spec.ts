import { test, expect } from '../../src/fixtures/test.fixture';
import { Logger } from '../../src/utils/Logger';

test.describe('Majesco Claims Live Smoke Test Suite', () => {
  test.use({
    ignoreHTTPSErrors: true
  });

  test('Execute recorded Majesco E2E flow @smoke @regression', async ({ loginPage, claimsSearchPage, page }) => {
    Logger.info('Starting live Majesco E2E smoke test');

    // Navigates base URL
    await loginPage.navigate();
    
    // Dynamic login with Cookie consent checks
    await loginPage.loginWithRole('Admin');
    
    Logger.info('Closing initial modal overlays if present');
    const closeBtn = page.getByRole('button', { name: 'Close' });
    try {
      await closeBtn.waitFor({ state: 'visible', timeout: 5000 });
      await closeBtn.click();
      Logger.info('Closed initial modal overlay');
    } catch (e) {
      Logger.info('No initial modal overlay detected or timed out waiting');
    }
    
    // Check Home visibility
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible({ timeout: 30000 });
    await page.waitForTimeout(5000);

    // Remove loading backdrops
    Logger.info('Removing any residual loading backdrops or overlays from DOM');
    await page.evaluate(() => {
      document.querySelectorAll('.overlay, .modal-backdrop, .modal, .modal-dialog').forEach(el => el.remove());
      document.body.classList.remove('waiting', 'modal-open', 'overflowNone');
    });

    Logger.info('Navigating to Claim Search');
    await page.getByRole('link', { name: 'Claim Search' }).click();
    await page.getByRole('link', { name: 'Claim Search', exact: true }).click();
    
    await page.waitForTimeout(5000);
    
    // Remove loading backdrops
    await page.evaluate(() => {
      document.querySelectorAll('.overlay, .modal-backdrop, .modal, .modal-dialog').forEach(el => el.remove());
      document.body.classList.remove('waiting', 'modal-open', 'overflowNone');
    });

    Logger.info('Selecting Claim Status: Open');
    await claimsSearchPage.selectClaimStatus('Open');
    await claimsSearchPage.clickSearch();
    
    // Select first link
    const claimNumber = await claimsSearchPage.clickFirstClaimLink();
    Logger.info(`Successfully entered Claim Details for: '${claimNumber}'`);
    
    Logger.info('Navigating into Claim Features tabs');
    await page.getByRole('listitem').filter({ hasText: 'Features' }).click();
    await page.getByRole('tab', { name: 'mm.icd.FNOLSummary.Features' }).click();
    
    Logger.info('Verifying Vendor Management navigation');
    await page.getByRole('link', { name: 'Vendor' }).click();
    await page.getByRole('link', { name: 'Vendor Management' }).click();
    
    Logger.info('Verifying Special Functions and Out of Office routing');
    await page.getByRole('link', { name: 'Special Functions' }).click();
    await page.getByRole('link', { name: 'Out Of Office' }).click();
    
    Logger.info('Majesco E2E smoke test completed successfully');
  });
});
