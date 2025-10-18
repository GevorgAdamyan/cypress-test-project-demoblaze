import { products } from '../../api/Application';
import { productPage, mainPage } from '../../pages/Application';
import { MONITOR, NOTEBOOK, PHONE } from '../../support/constants/variables';

const categories = [PHONE, NOTEBOOK, MONITOR];

let product: any;

describe('Main Page', () => {
  before(() => {
    products.getEntries().then(productsRes => {
      product = productsRes.body.Items[0];
    });
  });

  beforeEach(() => {
    mainPage.visitAsLoggedInUser();
  });

  it('verify main page view', () => {
    mainPage.verifyTabs();
    mainPage.verifyCategories();
    mainPage.verifyItems();
  });

  for (const category of categories) {
    it(`should filter items by category; ${category}`, () => {
      mainPage.filterByCategory(category);
      mainPage.verifyItemsFilteredByCategory(category);
    });
  }

  it('should open item page', () => {
    mainPage.openItemPage(product.title);
    productPage.verifyPageUrl(product.id.toString());
    productPage.verifyProductDetails(
      product.title,
      product.price.toString(),
      product.desc,
    );
  });
});
