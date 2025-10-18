import { THANK_YOU_FOR_YOUR_PURCHASE_MESSAGE } from '../support/constants/errors_and_messages';
import BasePage from './BasePage';

export default class SuccessModal extends BasePage {
  private readonly successModal: string = '.sweet-alert h2';
  private readonly okButton: string = '.confirm';
  private readonly infoText: string = '.lead';

  closeModal(): void {
    this.clickElement(this.okButton);
  }

  verifySuccessModal(...data: string[]): void {
    this.verifyElementIsVisible(this.successModal);
    this.verifyElementIsVisible(
      this.successModal,
      THANK_YOU_FOR_YOUR_PURCHASE_MESSAGE,
    );
    data.forEach(text => {
      this.verifyElementIsVisible(this.infoText, text);
    });
  }
}
