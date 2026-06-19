import { BasePage } from '../../base/BasePage';
import { Logger } from '../../utils/Logger';

export class ClaimsPaymentPage extends BasePage {
  /**
   * Adds a loss payment amount to the active claim.
   */
  public async addPayment(amount: string): Promise<void> {
    Logger.info(`Adding loss payment amount: '${amount}'`);
    await this.click('claims.payment.paymentBtn');
    await this.fill('claims.payment.amountInput', amount);
    await this.click('claims.payment.submitPaymentBtn');
  }
}
export default ClaimsPaymentPage;
