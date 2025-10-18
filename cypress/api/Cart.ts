import { VIEW_CART, DELETE_ITEM } from '../support/constants/endpoint';
import { POST } from '../support/constants/methods';
import BaseRequest from './BaseRequest';

export default class Cart extends BaseRequest {
  getItemsInCart(flag: boolean): Cypress.Chainable<Cypress.Response<any>> {
    return this.makeRequest(this.config(POST, VIEW_CART, { flag }));
  }

  deleteItemFromCart(id: string): Cypress.Chainable<Cypress.Response<any>> {
    return this.makeRequest(this.config(POST, DELETE_ITEM, { id }));
  }
}
