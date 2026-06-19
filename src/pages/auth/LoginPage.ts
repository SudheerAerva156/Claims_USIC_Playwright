import { BasePage } from '../../base/BasePage';
import { CredentialManager } from '../../managers/CredentialManager';
import { Logger } from '../../utils/Logger';
import { UserRole } from '../../types/role.types';

export class LoginPage extends BasePage {
  /**
   * Performs standard login with credentials.
   */
  public async login(username: string, password: string): Promise<void> {
    Logger.info(`Attempting login with username: '${username}'`);
    
    // Handle Cookie Policy Consent if present on screen
    const cookieConsentLocator = this.page.locator('#cookieConsent');
    if (await cookieConsentLocator.isVisible()) {
      const isChecked = await cookieConsentLocator.isChecked();
      if (!isChecked) {
        Logger.info('Resolving Cookie Policy consent overlays...');
        // Dispatch click on the link to show modal
        await this.page.locator('#aCookiePolicy').dispatchEvent('click');
        
        // Wait and click OK on the modal
        const modalOkBtn = this.page.locator('#modalConsentHdrBtnOk');
        await modalOkBtn.waitFor({ state: 'visible', timeout: 5000 });
        await modalOkBtn.click();
        
        // Wait for checkbox to become enabled
        let isEnabled = false;
        for (let i = 0; i < 10; i++) {
          const isDisabled = await cookieConsentLocator.isDisabled();
          if (!isDisabled) {
            isEnabled = true;
            break;
          }
          await this.page.waitForTimeout(500);
        }
        if (!isEnabled) {
          throw new Error('Cookie Policy consent checkbox did not become enabled');
        }
        
        // Check the checkbox
        await cookieConsentLocator.check();
        Logger.info('Cookie Policy consent checked successfully.');
      }
    }

    await this.fill('login.usernameInput', username);
    await this.fill('login.passwordInput', password);
    await this.click('login.loginButton');
  }

  /**
   * Dynamically loads credentials for the role and performs login.
   *
   * @param role The target role (e.g. 'Admin', 'Supervisor')
   */
  public async loginWithRole(role: UserRole): Promise<void> {
    Logger.info(`Attempting dynamic login for role: '${role}'`);
    const credentials = CredentialManager.getCredentials(role);
    await this.login(credentials.username, credentials.password);
  }

  /**
   * Retrieves any visible login error message.
   */
  public async getErrorMessage(): Promise<string> {
    return await this.getText('login.errorMessage');
  }

  /**
   * Performs logout action.
   */
  public async logout(): Promise<void> {
    Logger.info('Logging out from the application');
    await this.click('login.logoutLink');
  }

  /**
   * Verifies if the logout link is visible.
   */
  public async isLogoutVisible(): Promise<boolean> {
    return await this.isVisible('login.logoutLink');
  }
}
export default LoginPage;
