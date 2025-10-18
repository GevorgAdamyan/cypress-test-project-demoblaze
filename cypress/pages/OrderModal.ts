import {
  CITY,
  COUNTRY,
  CARD,
  MONTH,
  NAME,
  YEAR,
} from '../support/constants/variables';
import BasePage from './BasePage';

export default class OrderModal extends BasePage {
  private readonly orderModal: string = '#orderModal';
  private readonly modalInput = (field: string) => `#${field.toLowerCase()}`;
  private readonly purchaseButton: string = '[onclick="purchaseOrder()"]';

  insertTextInModal(field: string, text: string): void {
    this.typeText(this.modalInput(field), text);
  }

  purchase(): void {
    this.clickElement(this.purchaseButton);
  }

  verifyPlaceOrderModal(): void {
    [
      this.orderModal,
      this.modalInput(NAME),
      this.modalInput(COUNTRY),
      this.modalInput(CITY),
      this.modalInput(CARD),
      this.modalInput(MONTH),
      this.modalInput(YEAR),
      this.purchaseButton,
    ].forEach(element => {
      this.verifyElementIsVisible(element);
    });
  }
}
