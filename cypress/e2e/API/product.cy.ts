import { products, cart } from '../../api/Application';
import {
  MONITOR,
  NOTEBOOK,
  NUMBER,
  PHONE,
  STRING,
} from '../../support/constants/variables';
import { NOT_FOUND_MESSAGE } from '../../support/constants/errors_and_messages';

const USERNAME: string = Cypress.env('USERNAME');

const categories = [PHONE, NOTEBOOK, MONITOR];
let response: any;

describe('Products', () => {
  before(() => {
    products.getEntries().then(res => {
      response = res;
      expect(res.status).to.equal(200);
    });
  });

  after(() => {
    cart.getItemsInCart(true).then(res => {
      res.body.Items.forEach((item: any) => {
        cart.deleteItemFromCart(item.id);
      });
    });
  });

  it('should get all products', () => {
    response.body.Items.forEach((item: any) => {
      expect(typeof item.id).to.equal(NUMBER);
      expect(typeof item.title).to.equal(STRING);
      expect(typeof item.price).to.equal(NUMBER);
      expect(typeof item.desc).to.equal(STRING);
      expect(typeof item.cat).to.equal(STRING);
      expect(typeof item.img).to.equal(STRING);
    });
  });

  it('should get product by id', () => {
    response.body.Items.forEach((item: any) => {
      products.getProductById(item.id).then(resById => {
        expect(resById.status).to.equal(200);
        expect(resById.body.id).to.equal(item.id);
        expect(resById.body.title).to.equal(item.title);
        expect(resById.body.price).to.equal(item.price);
        expect(resById.body.desc).to.equal(item.desc);
        expect(resById.body.cat).to.equal(item.cat);
        expect(resById.body.img).to.equal(item.img);
      });
    });
  });

  it('should return error for non-existing product id', () => {
    products.getProductById('999999').then(resById => {
      expect(resById.status).to.equal(200);
      expect(resById.body.errorMessage).to.equal(NOT_FOUND_MESSAGE);
    });
  });

  categories.forEach(category => {
    it(`should get products by category; ${category}`, () => {
      products.getProductsByCategory(category).then(resByCategory => {
        expect(resByCategory.status).to.equal(200);
        resByCategory.body.Items.forEach((item: any) => {
          expect(item.cat.toLowerCase()).to.equal(category);
        });
      });
    });
  });

  it('should return error for non-existing category', () => {
    products
      .getProductsByCategory('non-existing-category')
      .then(resByCategory => {
        expect(resByCategory.status).to.equal(200);
        expect(resByCategory.body.Items.length).to.equal(0);
      });
  });

  it('should add product to cart', () => {
    const product = response.body.Items[0];
    products
      .addProductToCart(product.id.toString(), true)
      .then(addToCartRes => {
        expect(addToCartRes.status).to.equal(200);
      });
    cart.getItemsInCart(true).then(cartItems => {
      expect(cartItems.status).to.equal(200);
      cartItems.body.Items.forEach((item: any) => {
        expect(typeof item.id).to.equal(STRING);
        expect(item.cookie).to.equal(USERNAME);
        expect(typeof item.prod_id).to.equal(STRING);
      });
      const addedItem = cartItems.body.Items.find(
        (item: any) => item.prod_id === product.id.toString(),
      );
      expect(addedItem).to.be.not.undefined;
    });
  });
});
