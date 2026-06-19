import { BaseComponent } from '../../base/BaseComponent';
import { Logger } from '../../utils/Logger';

export class LeftNavComponent extends BaseComponent {
  /**
   * Clicks sidebar Home link.
   */
  public async clickHome(): Promise<void> {
    await this.getLocator('shared.menu.homeLink').click();
  }

  /**
   * Triggers navigation menu to Claims Search view.
   */
  public async navigateToClaimsSearch(): Promise<void> {
    Logger.info('Navigating sidebar: Claims -> Claims Search');
    await this.getLocator('shared.menu.claimsLink').click();
    await this.page.getByRole('link', { name: 'Claim Search', exact: true }).click();
  }

  /**
   * Triggers navigation menu to Vendor Management.
   */
  public async navigateToVendorManagement(): Promise<void> {
    Logger.info('Navigating sidebar: Vendor -> Vendor Management');
    await this.getLocator('shared.menu.vendorLink').click();
    await this.getLocator('shared.menu.vendorManagementLink').click();
  }

  /**
   * Triggers navigation menu to Out Of Office.
   */
  public async navigateToOutOfOffice(): Promise<void> {
    Logger.info('Navigating sidebar: Special Functions -> Out of Office');
    await this.getLocator('shared.menu.specialFunctionsLink').click();
    await this.getLocator('shared.menu.outOfOfficeLink').click();
  }
}
export default LeftNavComponent;
