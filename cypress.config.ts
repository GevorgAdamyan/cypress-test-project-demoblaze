import { defineConfig } from 'cypress';

import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  defaultCommandTimeout: 15000,
  requestTimeout: 20000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  numTestsKeptInMemory: 0,
  e2e: {
    chromeWebSecurity: false,
    baseUrl: process.env.BASE_URL,
    retries: {
      runMode: 2,
    },
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      "BASE_URL": process.env.BASE_URL,
      "BASE_URL_API": process.env.BASE_URL_API,
      "USERNAME": process.env.USERNAME,
      "PASSWORD": process.env.PASSWORD,
    },
  },
});
