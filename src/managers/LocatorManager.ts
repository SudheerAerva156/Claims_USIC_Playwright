import loginLocators from '../../locators/login.json';
import dashboardLocators from '../../locators/dashboard.json';
import homeLocators from '../../locators/home.json';
import claimsSearchLocators from '../../locators/claims/claims.search.json';
import claimsDetailsLocators from '../../locators/claims/claims.details.json';
import claimsPaymentLocators from '../../locators/claims/claims.payment.json';
import claimsReserveLocators from '../../locators/claims/claims.reserve.json';
import claimsNotesLocators from '../../locators/claims/claims.notes.json';
import menuLocators from '../../locators/shared/menu.json';
import gridLocators from '../../locators/shared/grid.json';
import toastLocators from '../../locators/shared/toast.json';

export class LocatorManager {
  private static readonly locatorsMap: Record<string, any> = {
    login: loginLocators,
    dashboard: dashboardLocators,
    home: homeLocators,
    claims: {
      search: claimsSearchLocators,
      details: claimsDetailsLocators,
      payment: claimsPaymentLocators,
      reserve: claimsReserveLocators,
      notes: claimsNotesLocators
    },
    shared: {
      menu: menuLocators,
      grid: gridLocators,
      toast: toastLocators
    }
  };

  /**
   * Resolves a locator selector string using a dot-separated path (e.g. 'login.usernameInput' or 'claims.search.claimSearchInput').
   */
  public static getLocator(path: string): string {
    const parts = path.split('.');
    let current: any = this.locatorsMap;
    
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        current = undefined;
        break;
      }
    }

    if (typeof current === 'string') {
      return current;
    }

    // Fallback: If it's a 2-part query like 'claims.claimSearchInput', check nested sub-files
    if (parts.length === 2) {
      const [section, key] = parts;
      const sectionObj = this.locatorsMap[section];
      if (sectionObj && typeof sectionObj === 'object') {
        // If the key exists directly in the section object
        if (key in sectionObj && typeof sectionObj[key] === 'string') {
          return sectionObj[key];
        }
        // Search inside sub-sections (e.g., claims.search, claims.details)
        for (const subKey of Object.keys(sectionObj)) {
          const subObj = sectionObj[subKey];
          if (subObj && typeof subObj === 'object' && key in subObj && typeof subObj[key] === 'string') {
            return subObj[key];
          }
        }
      }
    }

    throw new Error(
      `Locator selector not found for path: '${path}'. Ensure your locator is defined in the appropriate JSON file.`
    );
  }
}
export default LocatorManager;
