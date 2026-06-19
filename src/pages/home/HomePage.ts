import { BasePage } from '../../base/BasePage';
import { CredentialManager } from '../../managers/CredentialManager';
import { Logger } from '../../utils/Logger';
import { UserRole } from '../../types/role.types';

export class HomePage extends BasePage {
  /**
   * Verifies if the Majesco logo/brand is visible.
   */
  public async isLogoVisible(): Promise<boolean> {
    return await this.isVisible('home.logo');
  }

  /**
   * Checks if the dynamic login box container Marionette view is loaded.
   */
  public async isLoginBoxVisible(): Promise<boolean> {
    return await this.isVisible('home.loginContainer');
  }

  /**
   * Performs direct sign in through the Home Page login form.
   */
  public async signIn(username: string, password: string): Promise<void> {
    Logger.info(`Signing in via Home Page login view for user: '${username}'`);
    await this.fill('home.usernameInput', username);
    await this.fill('home.passwordInput', password);
    await this.click('home.loginButton');
  }

  /**
   * Resolves credentials dynamically by role and logs in.
   */
  public async signInWithRole(role: UserRole): Promise<void> {
    Logger.info(`Attempting dynamic role sign-in on Home Page for: '${role}'`);
    const credentials = CredentialManager.getCredentials(role);
    await this.signIn(credentials.username, credentials.password);
  }

  /**
   * Retrieves copyright information from the page footer.
   */
  public async getCopyrightText(): Promise<string> {
    return await this.getText('home.copyrightLabel');
  }
}
export default HomePage;
