import { loginPage, mainPage } from '../pages/Application';
const USERNAME: string = Cypress.env('USERNAME');
const PASSWORD: string = Cypress.env('PASSWORD');

describe('Authorization', () => {
  it('Should login', () => {
    cy.visit('/');
    mainPage.openLoginModal();
    loginPage.login(USERNAME, PASSWORD);
    mainPage.verifyLoggedInUser(USERNAME);
    cy.getCookies().then(cookies => {
      cy.log('Cookies after login:', cookies);

      // Write cookies to JSON file
      const authState = {
        cookies: cookies,
      };

      cy.writeFile('cypress/fixtures/auth/state.json', authState);
      cy.log('Cookies saved to cypress/fixtures/auth/state.json');
    });
  });
});
