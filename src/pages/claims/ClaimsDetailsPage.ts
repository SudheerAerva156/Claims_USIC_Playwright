import { BasePage } from '../../base/BasePage';
import { Logger } from '../../utils/Logger';

export class ClaimsDetailsPage extends BasePage {
  /**
   * Triggers the "New Claim" wizard button.
   */
  public async clickCreateNewClaim(): Promise<void> {
    Logger.info('Clicking "New Claim" button');
    await this.click('claims.details.createNewClaimBtn');
  }

  /**
   * Fills the claim form inputs.
   */
  public async fillClaimForm(claimantName: string, amount: string, claimType: string): Promise<void> {
    Logger.info(`Filling claim form (Name: ${claimantName}, Amount: ${amount}, Type: ${claimType})`);
    await this.fill('claims.details.claimantNameInput', claimantName);
    await this.fill('claims.details.claimAmountInput', amount);
    
    // Select dropdown option
    const dropdown = this.page.locator('select[name="claimType"], #ddlClaimType');
    await dropdown.waitFor({ state: 'visible' });
    await dropdown.selectOption({ label: claimType });
  }

  /**
   * Submits the filled claim form.
   */
  public async submitClaim(): Promise<void> {
    Logger.info('Submitting new claim');
    await this.click('claims.details.submitClaimBtn');
  }

  /**
   * Combines creation actions in a single helper.
   */
  public async createNewClaim(claimantName: string, amount: string, claimType: string): Promise<void> {
    await this.clickCreateNewClaim();
    await this.fillClaimForm(claimantName, amount, claimType);
    await this.submitClaim();
  }

  /**
   * Retrieves the claim number from details page.
   */
  public async getClaimNumber(): Promise<string> {
    return await this.getText('claims.details.claimNumberLabel');
  }

  /**
   * Retrieves the claim status.
   */
  public async getClaimStatus(): Promise<string> {
    return await this.getText('claims.details.claimStatusLabel');
  }

  /**
   * Checks if the claim details panel is loaded.
   */
  public async isClaimDetailsVisible(): Promise<boolean> {
    return await this.isVisible('claims.details.claimDetailsContainer');
  }

  /**
   * Navigates to a specific tab on the claims features view.
   */
  public async clickTab(tabName: string): Promise<void> {
    Logger.info(`Clicking claim features tab: '${tabName}'`);
    await this.page.getByRole('tab', { name: tabName }).click();
  }

  /**
   * Navigates claim features list items.
   */
  public async clickFeatureListItem(itemName: string): Promise<void> {
    Logger.info(`Navigating to feature list item: '${itemName}'`);
    await this.page.getByRole('listitem').filter({ hasText: itemName }).click();
  }
}
export default ClaimsDetailsPage;
