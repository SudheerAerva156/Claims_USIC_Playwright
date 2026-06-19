import { BrowserContext } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { Logger } from '../utils/Logger';

export class AuthFixture {
  /**
   * Saves storage state for a specific user role.
   */
  public static async saveState(context: BrowserContext, role: string): Promise<string> {
    const statePath = path.join(process.cwd(), 'reports', 'artifacts', 'auth', `${role.replace(/\s+/g, '_').toLowerCase()}-auth.json`);
    fs.mkdirSync(path.dirname(statePath), { recursive: true });
    await context.storageState({ path: statePath });
    Logger.info(`Saved storage state for role: '${role}' to: ${statePath}`);
    return statePath;
  }
}
export default AuthFixture;
