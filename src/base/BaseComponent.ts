import { Page, Locator } from '@playwright/test';
import { LocatorManager } from '../managers/LocatorManager';

export class BaseComponent {
  protected page: Page;
  protected rootLocator: Locator | null = null;

  constructor(page: Page, rootLocator: Locator | null = null) {
    this.page = page;
    this.rootLocator = rootLocator;
  }

  /**
   * Resolves selector relative to the component root or page.
   */
  protected getLocator(path: string): Locator {
    const selector = LocatorManager.getLocator(path);
    return this.rootLocator ? this.rootLocator.locator(selector) : this.page.locator(selector);
  }
}
export default BaseComponent;
