import { BaseComponent } from '../../base/BaseComponent';

export class ToastComponent extends BaseComponent {
  /**
   * Retrieves warning/success text content from visible toast notifications.
   */
  public async getToastMessage(): Promise<string> {
    const text = await this.getLocator('shared.toast.toastMessage').textContent();
    return text ? text.trim() : '';
  }

  /**
   * Closes active toast notification if close button is present on screen.
   */
  public async closeToast(): Promise<void> {
    const btn = this.getLocator('shared.toast.closeToastBtn');
    if (await btn.isVisible()) {
      await btn.click();
    }
  }
}
export default ToastComponent;
