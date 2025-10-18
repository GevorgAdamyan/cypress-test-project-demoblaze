import { ADD_TO_CART } from '../support/constants/endpoint';
import { POST } from '../support/constants/methods';
import BasePage from './BasePage';

export default class ProductPage extends BasePage {
  private readonly productTitle: string = 'h2.name';
  private readonly productPrice: string = 'h3.price-container';
  private readonly productDescription: string = '#more-information p';
  private readonly addToCartButton: string = 'a[onclick*="addToCart"]';

  addToCart(): void {
    cy.intercept(POST, ADD_TO_CART).as('addToCartRequest');
    this.clickElement(this.addToCartButton);
    cy.wait('@addToCartRequest');
  }

  verifyProductDetails(name: string, price: string, description: string): void {
    this.verifyElementIsVisible(this.productTitle, name);
    this.verifyElementIsVisible(this.productPrice, price);
    this.verifyElementIsVisible(this.productDescription, description);
  }
}
