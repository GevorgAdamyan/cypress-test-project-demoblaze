import { LOGIN } from '../support/constants/endpoint';
import { POST } from '../support/constants/methods';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
  private readonly usernameInput: string = '#loginusername';
  private readonly passwordInput: string = '#loginpassword';
  private readonly loginButton: string = '[onclick="logIn()"]';

  async login(username: string, password: string): Promise<void> {
    cy.intercept(POST, LOGIN).as('loginRequest');
    this.typeText(this.usernameInput, username);
    this.typeText(this.passwordInput, password);
    this.clickElement(this.loginButton);
    cy.wait('@loginRequest');
  }
}
