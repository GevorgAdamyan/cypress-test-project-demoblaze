import { products, cart } from '../../api/Application';
import {
  orderModal,
  mainPage,
  cartPage,
  successModal,
} from '../../pages/Application';
import { DELETE_CART } from '../../support/constants/endpoint';
import { POST } from '../../support/constants/methods';
import {
  NAME,
  COUNTRY,
  CITY,
  CARD,
  MONTH,
  YEAR,
} from '../../support/constants/variables';
import { PLEASE_FILL_OUT_NAME_AND_CREDIT_CARD_MESSAGE } from '../../support/constants/errors_and_messages';
import {
  CUSTOMER_NAME,
  CUSTOMER_CARD,
  CUSTOMER_YEAR,
  CUSTOMER_MONTH,
  CUSTOMER_CITY,
  CUSTOMER_COUNTRY,
} from '../../support/constants/test_data';
import { getCurrentDateWithSlash } from '../../support/helpers';

const username: string = Cypress.env('USERNAME');

let response: any;
let itemsInCart: any;
let totalPrice: number = 0;

let product: any;

describe('Place Order', () => {
  before(() => {
    products.getEntries().then(productsRes => {
      product = productsRes.body.Items[0];
      products.addProductToCart(product.id.toString(), true);
      totalPrice = product.price;
    });
  });

  beforeEach(() => {
    mainPage.visitAsLoggedInUser();
    response = mainPage.openCartPage();
    cy.wait(2000);
    itemsInCart = response.Items;
    cartPage.placeOrder();
  });

  after(() => {
    itemsInCart.forEach((item: any) => {
      cart.deleteItemFromCart(item.id);
    });
  });

  it('should not place order with empty fields', () => {
    orderModal.purchase();
    orderModal.handleAlert(PLEASE_FILL_OUT_NAME_AND_CREDIT_CARD_MESSAGE);
  });

  it('should place order with valid fields', () => {
    cy.intercept(POST, DELETE_CART).as('placeOrderRequest');
    orderModal.insertTextInModal(NAME, CUSTOMER_NAME);
    orderModal.insertTextInModal(COUNTRY, CUSTOMER_COUNTRY);
    orderModal.insertTextInModal(CITY, CUSTOMER_CITY);
    orderModal.insertTextInModal(CARD, CUSTOMER_CARD);
    orderModal.insertTextInModal(MONTH, CUSTOMER_MONTH);
    orderModal.insertTextInModal(YEAR, CUSTOMER_YEAR);
    orderModal.purchase();
    cy.wait('@placeOrderRequest');
    successModal.verifySuccessModal(
      CUSTOMER_NAME,
      CUSTOMER_CARD,
      totalPrice.toString(),
      getCurrentDateWithSlash(),
    );
    successModal.closeModal();
  });
});
