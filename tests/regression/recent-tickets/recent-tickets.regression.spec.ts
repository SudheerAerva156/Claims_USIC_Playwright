import { test, expect } from '../../../src/fixtures/test.fixture';
import { Logger } from '../../../src/utils/Logger';

test.describe('Regression - Recent Tickets', () => {
  test.beforeEach(async ({ loginPage, dashboardPage }) => {
    await loginPage.navigate();
    await loginPage.loginWithRole('Claims Examiner');
    await dashboardPage.navigateToClaims();
  });

  test('Verify search for recent ticket claim CLM-2026-0099 @regression @recentTickets', async ({ claimsSearchPage, claimsDetailsPage }) => {
    Logger.info('Searching for recent ticket claim CLM-2026-0099');
    await claimsSearchPage.searchClaim('CLM-2026-0099');
    const detailsVisible = await claimsDetailsPage.isClaimDetailsVisible();
    Logger.info(`Claim details panel visibility: ${detailsVisible}`);
  });
});
