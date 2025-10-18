import BasePage from './BasePage';
import { DELETE_ITEM } from '../support/constants/endpoint';
import { POST } from '../support/constants/methods';

export default class CartPage extends BasePage {
  private readonly itemsRow: string = 'tr.success';
  private readonly itemTitle: string = 'td:nth-child(2)';
  private readonly itemPrice: string = 'td:nth-child(3)';
  private readonly totalPrice: string = '#totalp';
  private readonly placeOrderButton: string =
    'button[data-target="#orderModal"]';
  private readonly deleteLink: string = 'a[onclick*="deleteItem"]';

  private itemName: string | undefined = undefined;

  focusOnItem(name: string): void {
    this.itemName = name;
  }

  private getItemNames(): void {
    const names: string[] = [];
    this.getElement(this.itemTitle).each(el => {
      names.push(el.text());
    });
    cy.wrap(names).as('itemNames');
  }

  private getItemRowIndex(): void {
    if (!this.itemName) {
      cy.wrap(0).as('itemRowIndex');
    }
    this.getItemNames();
    cy.get('@itemNames').then((names: any) => {
      const index = names.indexOf(this.itemName as string);
      cy.wrap(index).as('itemRowIndex');
    });
  }

  getItemPrice(): void {
    this.getItemRowIndex();
    cy.get('@itemRowIndex').then((rowIndex: any) => {
      this.getElement(this.itemPrice).then(priceBoxes => {
        const price = priceBoxes.eq(rowIndex).text();
        cy.wrap(price).as('itemPrice');
      });
    });
  }

  async placeOrder(): Promise<void> {
    this.clickElement(this.placeOrderButton);
    cy.wait(2000);
  }

  async deleteItem(): Promise<void> {
    cy.intercept(POST, DELETE_ITEM).as('deleteItemRequest');
    this.getItemRowIndex();
    cy.get('@itemRowIndex').then((rowIndex: any) => {
      this.getElement(this.deleteLink).then(deleteLinks => {
        const deleteLink = deleteLinks[rowIndex];
        deleteLink.click();
        cy.wait('@deleteItemRequest');
        cy.wait(5000);
      });
    });
  }

  async verifyCartPage(
    expectedCount: number,
    totalPrice: string,
  ): Promise<void> {
    this.verifyPageUrl('cart');
    this.getElement(this.itemsRow).then(items => {
      expect(items.length).to.equal(expectedCount);
    });
    this.verifyElementIsVisible(this.placeOrderButton);
    this.verifyElementIsVisible(this.totalPrice);
    this.verifyElementIsVisible(this.totalPrice, totalPrice);
  }
}
