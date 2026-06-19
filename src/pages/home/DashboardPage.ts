import { BasePage } from '../../base/BasePage';
import { Logger } from '../../utils/Logger';

export class DashboardPage extends BasePage {
  /**
   * Retrieves the welcome message text displayed on the dashboard.
   */
  public async getWelcomeMessage(): Promise<string> {
    return await this.getText('dashboard.welcomeMessage');
  }

  /**
   * Retrieves the current role displayed in the UI badge.
   */
  public async getActiveRole(): Promise<string> {
    return await this.getText('dashboard.roleIndicator');
  }

  /**
   * Navigates to the claims section using the menu link.
   */
  public async navigateToClaims(): Promise<void> {
    Logger.info('Navigating to the Claims management page');
    await this.click('dashboard.claimsMenu');
  }

  /**
   * Confirms visibility of dashboard title.
   */
  public async isDashboardTitleVisible(): Promise<boolean> {
    return await this.isVisible('dashboard.dashboardTitle');
  }
}
export default DashboardPage;
