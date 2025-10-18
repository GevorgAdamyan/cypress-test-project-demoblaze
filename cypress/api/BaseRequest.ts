import * as cookies from '../fixtures/auth/state.json';
const BASE_URL: string = Cypress.env('BASE_URL');
const BASE_URL_API: string = Cypress.env('BASE_URL_API');

/**
 * Abstract base class for API request handling with Cypress
 * Provides common functionality for making HTTP requests and handling responses.
 * This class serves as a foundation for all API request classes, offering reusable methods
 * for request configuration and execution.
 */
export default abstract class BaseRequest {
  /**
   * Makes an HTTP request using the provided configuration object
   * @param config - Complete configuration object for cy.request() including method, URL, headers, and body
   * @returns Cypress chainable that resolves with a Response object containing status, headers, and body
   * @description Executes cy.request() with the provided configuration
   * @protected
   */
  protected makeRequest(config: {}): Cypress.Chainable<any> {
    return cy.request(config);
  }

  /**
   * Creates a configuration object for HTTP requests with default headers and authentication
   * @param method - The HTTP method to use (GET, POST, PUT, DELETE, etc.)
   * @param endpoint - The API endpoint path to append to the base URL
   * @param body - Optional request body data to include in the configuration
   * @returns Configuration object compatible with cy.request() including URL, method, headers, and data
   * @description Automatically extracts authentication token from stored cookies and includes it in request data.
   * Sets up default headers including accept, accept-language, origin, and referer.
   * @protected
   */
  protected config(method: string, endpoint: string, body?: {}): {} {
    const url: string = `${BASE_URL_API}${endpoint}`;
    const headers = {
      accept: '*/*',
      'accept-language': 'en-GB,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,en-US;q=0.6',
      origin: BASE_URL,
      referer: BASE_URL,
    };
    const token = cookies.cookies.find(
      cookie => cookie.name === 'tokenp_',
    )?.value;

    const configuration: any = {
      method,
      url,
      headers,
      failOnStatusCode: false,
    };

    if (body) {
      configuration['body'] = body;
      configuration['body']['cookie'] = token;
    }

    return configuration;
  }
}
