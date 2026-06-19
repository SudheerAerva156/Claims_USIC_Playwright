import { BaseComponent } from '../../base/BaseComponent';

export class HeaderComponent extends BaseComponent {
  /**
   * Retrieves welcome text from the page header.
   */
  public async getWelcomeText(): Promise<string> {
    const text = await this.getLocator('dashboard.welcomeMessage').first().textContent();
    return text ? text.trim() : '';
  }

  /**
   * Clicks user profile dropdown menu.
   */
  public async clickUserProfile(): Promise<void> {
    await this.getLocator('dashboard.userProfileButton').first().click();
  }
}
export default HeaderComponent;
