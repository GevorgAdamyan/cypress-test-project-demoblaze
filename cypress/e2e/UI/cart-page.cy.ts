import { products, cart } from '../../api/Application';
import { orderModal, mainPage, cartPage } from '../../pages/Application';

let response: any;
let itemsInCart: any;
let totalPrice: number = 0;
let product: any;

describe('Cart page', () => {
  before(() => {
    products.getEntries().then(productsRes => {
      for (let i = 0; i < 5; i += 2) {
        product = productsRes.body.Items[i];
        products.addProductToCart(product.id.toString(), true);
        totalPrice += product.price;
      }
    });
  });

  beforeEach(() => {
    mainPage.visitAsLoggedInUser();
    mainPage.openCartPage();
    cy.get('@viewCartRequest')
      .its('response')
      .then(res => {
        response = res.body;
        itemsInCart = response.Items;
      });
    cy.wait(2000);
  });

  after(() => {
    itemsInCart.forEach((item: any) => {
      cart.deleteItemFromCart(item.id);
    });
  });

  it('verify cart page view', () => {
    cartPage.verifyCartPage(itemsInCart.length, totalPrice.toString());
  });

  it('should delete item from cart', () => {
    cartPage.focusOnItem(product.title);
    cartPage.deleteItem();
    totalPrice -= product.price;
    cartPage.verifyCartPage(itemsInCart.length - 1, totalPrice.toString());
  });

  it('should open place order modal', () => {
    cartPage.placeOrder();
    orderModal.verifyPlaceOrderModal();
  });
});
