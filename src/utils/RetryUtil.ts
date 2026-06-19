import { Logger } from './Logger';

export class RetryUtil {
  /**
   * Safe execution wrapper that retries an async operation on error.
   */
  public static async retry<T>(
    action: () => Promise<T>,
    retries: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await action();
      } catch (error) {
        lastError = error;
        Logger.warn(
          `Operation failed on attempt ${attempt}/${retries}. Retrying in ${delayMs}ms...`
        );
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
    }
    
    throw lastError;
  }
}
export default RetryUtil;
