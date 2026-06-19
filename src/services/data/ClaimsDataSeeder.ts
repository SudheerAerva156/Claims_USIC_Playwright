import { Logger } from '../../utils/Logger';

export class ClaimsDataSeeder {
  /**
   * Builds an automated random claim model structure.
   */
  public static generateClaimData(): any {
    const suffix = Math.floor(Math.random() * 10000);
    Logger.info(`Generating dynamic claim data with suffix: ${suffix}`);
    
    return {
      claimantName: `John Doe USIC ${suffix}`,
      amount: (2000 + Math.random() * 8000).toFixed(2),
      claimType: 'Property',
      description: 'Auto-generated claim for testing purposes.'
    };
  }
}
export default ClaimsDataSeeder;
