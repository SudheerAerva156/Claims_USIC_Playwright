import { Page, Locator } from '@playwright/test';
import { LocatorManager } from '../managers/LocatorManager';
import { Logger } from '../utils/Logger';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Resolves a locator dynamically by key from the locator repository.
   * Supports nested paths like 'claims.search.claimSearchInput' or 'login.usernameInput'.
   *
   * @param path Locator repository path
   */
  protected getLocator(path: string): Locator {
    const selector = LocatorManager.getLocator(path);
    return this.page.locator(selector);
  }

  /**
   * Clicks an element after ensuring it's visible.
   */
  protected async click(path: string): Promise<void> {
    Logger.info(`Clicking element: '${path}'`);
    const locator = this.getLocator(path);
    await locator.first().waitFor({ state: 'visible' });
    await locator.first().click();
  }

  /**
   * Fills a text input after ensuring it's visible.
   */
  protected async fill(path: string, value: string): Promise<void> {
    const isSecret = path.toLowerCase().includes('password') || path.toLowerCase().includes('secret');
    Logger.info(`Filling field: '${path}' with value: '${isSecret ? '********' : value}'`);
    const locator = this.getLocator(path);
    await locator.first().waitFor({ state: 'visible' });
    await locator.first().fill(value);
  }

  /**
   * Types text into an input character-by-character.
   */
  protected async type(path: string, value: string): Promise<void> {
    const isSecret = path.toLowerCase().includes('password') || path.toLowerCase().includes('secret');
    Logger.info(`Typing field: '${path}' with value: '${isSecret ? '********' : value}'`);
    const locator = this.getLocator(path);
    await locator.first().waitFor({ state: 'visible' });
    await locator.first().click();
    await locator.first().pressSequentially(value, { delay: 50 });
  }

  /**
   * Retrieves text content from an element.
   */
  public async getText(path: string): Promise<string> {
    const locator = this.getLocator(path);
    await locator.first().waitFor({ state: 'visible' });
    const content = await locator.first().textContent();
    const result = content ? content.trim() : '';
    Logger.debug(`Retrieved text from '${path}': '${result}'`);
    return result;
  }

  /**
   * Checks if an element is visible on the page.
   */
  public async isVisible(path: string): Promise<boolean> {
    try {
      const locator = this.getLocator(path);
      const visible = await locator.first().isVisible();
      Logger.debug(`Element '${path}' visibility: ${visible}`);
      return visible;
    } catch (e) {
      Logger.debug(`Element '${path}' not visible or does not exist: ${(e as Error).message}`);
      return false;
    }
  }

  /**
   * Navigates to a specific path relative to the baseURL.
   */
  public async navigate(urlPath: string = ''): Promise<void> {
    Logger.info(`Navigating to path: '${urlPath}'`);
    await this.page.goto(urlPath);
  }
}
