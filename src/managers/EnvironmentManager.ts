import { environments } from '../../config/environments/index';
import { EnvironmentName, AppEnvironment } from '../types/env.types';
import { FrameworkConfig } from '../../config/framework.config';

export class EnvironmentManager {
  /**
   * Resolves environment name from runtime variable. Defaults to framework default (QA).
   */
  public static getEnvName(): EnvironmentName {
    const env = process.env.ENV;
    if (!env) {
      return FrameworkConfig.defaultEnv as EnvironmentName;
    }
    const upperEnv = env.toUpperCase() as EnvironmentName;
    if (!environments[upperEnv]) {
      throw new Error(
        `Invalid environment specified in ENV: '${env}'. Supported: ${Object.keys(environments).join(', ')}`
      );
    }
    return upperEnv;
  }

  /**
   * Retrieves active AppEnvironment configuration.
   */
  public static getConfig(): AppEnvironment {
    const envName = this.getEnvName();
    return environments[envName];
  }

  /**
   * Retrieves the baseUrl.
   */
  public static getBaseUrl(): string {
    return this.getConfig().baseUrl;
  }
}
export default EnvironmentManager;
