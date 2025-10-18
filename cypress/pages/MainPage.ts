import { products } from '../api/Application';
import BasePage from './BasePage';
import { VIEW_CART, VIEW, BY_CATEGORY } from '../support/constants/endpoint';
import { POST } from '../support/constants/methods';
import { MONITOR, NOTEBOOK, PHONE } from '../support/constants/variables';

export default class MainPage extends BasePage {
  private readonly homeLink: string = '#nava';
  private readonly contactLink: string = '#contcar';
  private readonly loginLink: string = '#login2';
  private readonly cartLink: string = '#cartur';
  private readonly userNameDisplay: string = '#nameofuser';
  private readonly logOut: string = '#logout2';
  private readonly category = (name: string): string =>
    `[onclick="byCat('${name.toLowerCase()}')"]`;
  private readonly item = (id: string): string =>
    `.card-title a[href*="${id}"]`;

  visitAsLoggedInUser(): void {
    cy.visit('/');
    cy.fixture('auth/state.json').then(authState => {
      const { cookies } = authState;
      cookies.forEach(cookie => {
        const cookieOptions: any = {
          domain: cookie.domain,
          path: cookie.path || '/',
          secure: cookie.secure || false,
          httpOnly: cookie.httpOnly || false,
        };

        // Only add expiry if it exists and is valid
        if (cookie.expiry && typeof cookie.expiry === 'number') {
          cookieOptions.expiry = cookie.expiry;
        }

        // Only add sameSite if it exists
        if (cookie.sameSite) {
          cookieOptions.sameSite = cookie.sameSite;
        }

        cy.setCookie(cookie.name, cookie.value, cookieOptions);
      });
    });
    cy.reload();
    this.verifyLoggedInUser(Cypress.env('USERNAME'));
    cy.getCookies().then(cookies => {
      cy.log('Cookies after setting from file:', cookies);
    });
  }

  openLoginModal(): void {
    this.clickElement(this.loginLink);
  }

  openCartPage(): Cypress.Chainable<any> {
    cy.intercept(POST, VIEW_CART).as('viewCartRequest');
    this.clickElement(this.cartLink);
    return cy.wait('@viewCartRequest');
  }

  openItemPage(name: string): void {
    cy.intercept(POST, VIEW).as('viewItemRequest');
    products.getEntries().then(response => {
      const items = response.body.Items;
      const item = items.find((item: any) => item.title === name);
      if (item) {
        this.clickElement(this.item(item.id));
        cy.wait('@viewItemRequest');
      }
    });
  }

  filterByCategory(name: string): void {
    cy.intercept(POST, BY_CATEGORY).as('filterByCategoryRequest');
    this.clickElement(this.category(name));
    cy.wait('@filterByCategoryRequest');
  }

  verifyLoggedInUser(username: string): void {
    this.verifyElementIsVisible(this.userNameDisplay, `Welcome ${username}`);
  }

  verifyTabs(): void {
    [
      this.homeLink,
      this.contactLink,
      this.cartLink,
      this.userNameDisplay,
      this.logOut,
    ].forEach(tab => {
      this.verifyElementIsVisible(tab);
    });
  }

  verifyCategories(): void {
    [PHONE, NOTEBOOK, MONITOR].forEach(category => {
      this.verifyElementIsVisible(this.category(category));
    });
  }

  async verifyItems(): Promise<void> {
    products.getEntries().then(response => {
      response.body.Items.forEach((item: any) => {
        this.verifyElementIsVisible(this.item(item.id));
        this.verifyElementIsVisible(this.item(item.id), item.title);
      });
    });
  }

  verifyItemsFilteredByCategory(category: string): void {
    cy.get('@filterByCategoryRequest')
      .its('response.body.Items')
      .then(items => {
        items.forEach((item: any) => {
          expect(item.cat.toLowerCase()).to.equal(category.toLowerCase());
        });
      });
  }
}
