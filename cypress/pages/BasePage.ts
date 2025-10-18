/**
 * Abstract base page class that provides common page interaction methods for Cypress tests.
 * This class serves as a foundation for all page objects, offering reusable methods for
 * element interactions, text handling, URL verification, and alert management.
 */
export default abstract class BasePage {
  /**
   * Gets a single element by selector with optional text filtering
   * @param selector - CSS selector string for the element
   * @param textContaining - Optional text content to filter elements by
   * @returns Cypress chainable that resolves to the jQuery wrapped element
   * @protected
   */
  protected getElement(
    selector: string,
    textContaining?: string,
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    if (textContaining) {
      return cy.get(selector).contains(textContaining);
    }
    return cy.get(selector);
  }

  /**
   * Clicks on an element identified by the provided selector
   * @param selector - CSS selector string for the element to click
   * @protected
   */
  protected clickElement(selector: string): void {
    this.getElement(selector).click();
  }
  /**
   * Types text into an input element identified by the provided selector
   * @param selector - CSS selector string for the input element
   * @param text - The text to type into the input field
   * @protected
   */
  protected typeText(selector: string, text: string): void {
    this.getElement(selector).type(text, { force: true });
  }

  /**
   * Gets the text content of an element and stores it as an alias
   * @param selector - CSS selector string for the element
   * @description This method retrieves the text content and stores it as 'elementText' alias for later use
   * @protected
   */
  protected getText(selector: string): void {
    this.getElement(selector).then(el => {
      cy.wrap(el.text()).as('elementText');
    });
  }

  /**
   * Verifies that the current page URL contains the specified path
   * @param path - The path string that should be present in the current URL
   * @throws AssertionError if the URL doesn't contain the expected path
   */
  verifyPageUrl(path: string): void {
    cy.url().should('include', path);
  }

  /**
   * Sets up a handler for browser alerts/dialogs with expected text verification
   * @param expectedText - The expected text content of the alert dialog
   * @param accept - Whether to accept (true) or dismiss (false) the dialog (default: true)
   * @description In Cypress, alerts are automatically accepted. Dismissal is not supported.
   * @throws Error if attempting to dismiss an alert (not supported in Cypress)
   */
  handleAlert(expectedText: string, accept = true): void {
    cy.on('window:alert', alertText => {
      expect(alertText).to.equal(expectedText);
      if (accept) {
        // Automatically accepts the alert
        return true;
      } else {
        // Dismissing alerts is not directly supported in Cypress as alerts can only be accepted
        throw new Error('Alert dismissal is not supported in Cypress');
      }
    });
  }

  /**
   * Verifies that an element identified by the selector is visible on the page
   * @param selector - CSS selector string for the element
   * @param textContaining - Optional text content to filter elements by
   * @throws AssertionError if the element is not visible
   * @protected
   */
  protected verifyElementIsVisible(
    selector: string,
    textContaining?: string,
  ): void {
    this.getElement(selector, textContaining).then(element => {
      expect(element).to.be.visible;
    });
  }
}
