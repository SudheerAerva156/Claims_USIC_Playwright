import { BasePage } from '../../base/BasePage';
import { Logger } from '../../utils/Logger';

export class ClaimsSearchPage extends BasePage {
  /**
   * Searches for a claim number directly in the search field.
   */
  public async searchClaim(claimNumber: string): Promise<void> {
    Logger.info(`Searching for claim number: '${claimNumber}'`);
    await this.fill('claims.search.claimSearchInput', claimNumber);
    await this.click('claims.search.claimSearchButton');
  }

  /**
   * Selects a status option from the dropdown select wrapper.
   */
  public async selectClaimStatus(status: string): Promise<void> {
    Logger.info(`Selecting claim status: '${status}'`);
    await this.click('claims.search.claimStatusSelect');
    await this.page.getByRole('treeitem', { name: status, exact: true }).click();
  }

  /**
   * Triggers the search query action.
   */
  public async clickSearch(): Promise<void> {
    Logger.info('Triggering Claims Search query execution');
    await this.click('claims.search.claimSearchButton');
  }

  /**
   * Selects and returns the text from the first claim record link.
   */
  public async clickFirstClaimLink(): Promise<string> {
    Logger.info('Locating first claim row link in the results grid');
    const link = this.page.locator('table tbody tr a').first();
    await link.waitFor({ state: 'visible' });
    const claimNumber = await link.textContent();
    const cleanNumber = claimNumber ? claimNumber.trim() : 'Unknown';
    
    Logger.info(`Clicking claim: '${cleanNumber}'`);
    await link.click();
    return cleanNumber;
  }
}
export default ClaimsSearchPage;
