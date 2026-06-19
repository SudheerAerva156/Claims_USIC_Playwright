import { test, expect } from '../../../src/fixtures/test.fixture';
import { Logger } from '../../../src/utils/Logger';

test.describe('Regression - Change Requests', () => {
  test.beforeEach(async ({ loginPage, dashboardPage }) => {
    await loginPage.navigate();
    await loginPage.loginWithRole('Claims Examiner');
    await dashboardPage.navigateToClaims();
  });

  test('Create and verify a new property claim change request @regression @cr', async ({ claimsDetailsPage }) => {
    Logger.info('Initiating claim creation workflow for Change Request verification');
    await claimsDetailsPage.createNewClaim('John Doe USIC CR', '7500.00', 'Property');

    const isDetailsVisible = await claimsDetailsPage.isClaimDetailsVisible();
    if (isDetailsVisible) {
      const claimNo = await claimsDetailsPage.getClaimNumber();
      const claimStatus = await claimsDetailsPage.getClaimStatus();
      Logger.info(`Claim Created Successfully - Number: ${claimNo}, Status: ${claimStatus}`);
    }
  });
});
