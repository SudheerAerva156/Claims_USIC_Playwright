import { APIRequestContext, APIResponse } from '@playwright/test';
import { Logger } from '../../utils/Logger';

export class ApiClient {
  private requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  /**
   * Executes HTTP GET.
   */
  public async get(url: string, headers: Record<string, string> = {}): Promise<APIResponse> {
    Logger.info(`API GET -> ${url}`);
    const response = await this.requestContext.get(url, { headers });
    await this.logResponse(response);
    return response;
  }

  /**
   * Executes HTTP POST.
   */
  public async post(url: string, data: unknown, headers: Record<string, string> = {}): Promise<APIResponse> {
    Logger.info(`API POST -> ${url}`);
    const response = await this.requestContext.post(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    await this.logResponse(response);
    return response;
  }

  /**
   * Executes HTTP PUT.
   */
  public async put(url: string, data: unknown, headers: Record<string, string> = {}): Promise<APIResponse> {
    Logger.info(`API PUT -> ${url}`);
    const response = await this.requestContext.put(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    await this.logResponse(response);
    return response;
  }

  /**
   * Executes HTTP DELETE.
   */
  public async delete(url: string, headers: Record<string, string> = {}): Promise<APIResponse> {
    Logger.info(`API DELETE -> ${url}`);
    const response = await this.requestContext.delete(url, { headers });
    await this.logResponse(response);
    return response;
  }

  /**
   * Helper method to log response status and metadata.
   */
  private async logResponse(response: APIResponse): Promise<void> {
    const status = response.status();
    const statusText = response.statusText();
    Logger.info(`API Response -> Status: ${status} ${statusText}`);
    try {
      const responseBody = await response.text();
      if (responseBody) {
        Logger.debug(`API Response Body (truncated): ${responseBody.substring(0, 500)}`);
      }
    } catch (e) {
      Logger.warn(`Failed to read response body: ${e}`);
    }
  }
}
export default ApiClient;
