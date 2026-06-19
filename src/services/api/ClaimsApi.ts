import { APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';

export class ClaimsApi extends ApiClient {
  /**
   * Fetches target claim record metadata.
   */
  public async getClaimDetails(claimId: string): Promise<APIResponse> {
    return this.get(`/api/claims/${claimId}`);
  }

  /**
   * Submits a claim payload via API for seeding or verification.
   */
  public async createClaim(claimData: unknown): Promise<APIResponse> {
    return this.post(`/api/claims`, claimData);
  }
}
export default ClaimsApi;
