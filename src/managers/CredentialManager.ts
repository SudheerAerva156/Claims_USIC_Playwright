import { CREDENTIALS_STORE } from '../../config/roles/roles';
import { UserRole, UserCredentials } from '../types/role.types';
import { EnvironmentManager } from './EnvironmentManager';

export class CredentialManager {
  /**
   * Resolves credentials based on target role.
   * Priority:
   * 1. ENV overrides, e.g. QA_ADMIN_USERNAME, QA_ADMIN_PASSWORD
   * 2. Default credential mappings
   */
  public static getCredentials(role: UserRole): UserCredentials {
    const env = EnvironmentManager.getEnvName();
    const envKey = env.toUpperCase().replace(/[^A-Z0-9]/g, '_');
    const roleKey = role.toUpperCase().replace(/[^A-Z0-9]/g, '_');

    const envUsernameVar = `${envKey}_${roleKey}_USERNAME`;
    const envPasswordVar = `${envKey}_${roleKey}_PASSWORD`;

    const usernameEnv = process.env[envUsernameVar];
    const passwordEnv = process.env[envPasswordVar];

    if (usernameEnv && passwordEnv) {
      return {
        username: usernameEnv,
        password: passwordEnv
      };
    }

    const envCredentials = CREDENTIALS_STORE[env];
    if (!envCredentials || !envCredentials[role]) {
      throw new Error(
        `Credentials default configuration not found for environment: '${env}' and role: '${role}'.`
      );
    }

    return envCredentials[role];
  }
}
export default CredentialManager;
