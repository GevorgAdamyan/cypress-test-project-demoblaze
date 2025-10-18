import {
  ENTRIES,
  VIEW,
  ADD_TO_CART,
  BY_CATEGORY,
} from '../support/constants/endpoint';
import { GET, POST } from '../support/constants/methods';
import { generateId } from '../support/helpers';
import BaseRequest from './BaseRequest';

export default class Products extends BaseRequest {
  getEntries(): Cypress.Chainable<Cypress.Response<any>> {
    return this.makeRequest(this.config(GET, ENTRIES));
  }

  getProductById(id: string): Cypress.Chainable<Cypress.Response<any>> {
    return this.makeRequest(this.config(POST, VIEW, { id }));
  }

  addProductToCart(
    prod_id: string,
    flag: boolean,
  ): Cypress.Chainable<Cypress.Response<any>> {
    const id = generateId();
    const body = { id, prod_id, flag };
    return this.makeRequest(this.config(POST, ADD_TO_CART, body));
  }

  getProductsByCategory(cat: string): Cypress.Chainable<Cypress.Response<any>> {
    return this.makeRequest(this.config(POST, BY_CATEGORY, { cat }));
  }
}
