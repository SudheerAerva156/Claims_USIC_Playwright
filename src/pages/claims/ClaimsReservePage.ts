import { BasePage } from '../../base/BasePage';
import { Logger } from '../../utils/Logger';

export class ClaimsReservePage extends BasePage {
  /**
   * Adds a reserve amount to the active claim.
   */
  public async addReserve(amount: string): Promise<void> {
    Logger.info(`Adding reserve amount: '${amount}'`);
    await this.click('claims.reserve.reserveBtn');
    await this.fill('claims.reserve.amountInput', amount);
    await this.click('claims.reserve.submitReserveBtn');
  }
}
export default ClaimsReservePage;
