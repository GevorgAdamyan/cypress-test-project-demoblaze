# Cypress Test Project - Demoblaze

A comprehensive end-to-end testing suite for the Demoblaze e-commerce platform using Cypress with TypeScript. This project includes both UI and API test automation with a robust page object model architecture.

## 🚀 Features

- **TypeScript Support** - Full TypeScript implementation for better code quality
- **Page Object Model** - Clean, maintainable test architecture
- **API & UI Testing** - Complete coverage of both API endpoints and user interface
- **Authentication Management** - Automated login and session management
- **CI/CD Ready** - GitHub Actions workflows for automated testing
- **Code Quality** - ESLint, Prettier, and TypeScript checks
- **Chrome Browser** - Optimized for Chrome browser testing

## 📁 Project Structure

```
cypress-test-project-demoblaze/
├── cypress/
│   ├── api/                    # API request classes
│   │   ├── Application.ts      # API application setup
│   │   ├── Authorization.ts    # Authentication API calls
│   │   ├── BaseRequest.ts      # Base API request handler
│   │   ├── Cart.ts            # Cart API operations
│   │   └── Products.ts        # Product API operations
│   ├── e2e/                   # Test specifications
│   │   ├── API/               # API test cases
│   │   │   ├── authorization.cy.ts
│   │   │   └── product.cy.ts
│   │   ├── UI/                # UI test cases
│   │   │   ├── cart-page.cy.ts
│   │   │   ├── main-page.cy.ts
│   │   │   └── place-order.cy.ts
│   │   └── auth.cy.ts         # Authentication setup
│   ├── fixtures/              # Test data and auth state
│   │   └── auth/              # Authentication state files
├── pages/                 # Page Object Model
│   │   ├── BasePage.ts        # Base page class
│   │   ├── CartPage.ts        # Cart page operations
│   │   ├── LoginPage.ts       # Login page operations
│   │   ├── MainPage.ts        # Main page operations
│   │   ├── OrderModal.ts      # Order modal operations
│   │   ├── ProductPage.ts     # Product page operations
│   │   └── SuccessModal.ts    # Success modal operations
│   └── support/               # Support files and utilities
│       ├── commands.ts        # Custom Cypress commands
│       ├── constants.ts       # Test constants
│       ├── helpers.ts         # Utility functions
│       └── constants/         # Organized constants
├── .github/workflows/         # CI/CD workflows
└── cypress/fixtures/auth/    # Authentication state (gitignored)
```

## 🛠️ Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cypress-test-project-demoblaze
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```json
   {
     "BASE_URL": "https://demoblaze.com",
     "BASE_URL_API": "https://api.demoblaze.com",
     "USERNAME": "your_test_username",
     "PASSWORD": "your_test_password"
   }
   ```

## 🎯 Running Tests

### ⚠️ Authentication Requirement
**Before running tests in interactive mode**, you must first authenticate by either:
1. **Running authentication setup:** `npm run cypress:run:auth`
2. **Or manually run `auth.cy.ts` through the Cypress UI** after opening the test runner

### Interactive Mode (Cypress Test Runner)
```bash
# Step 1: Run authentication first (required)
npm run cypress:run:auth

# Step 2: Open Cypress Test Runner
npm run cypress:open

# Alternative: Open test runner and manually run auth.cy.ts through the UI
npx cypress open
```

### Headless Mode (Chrome Browser)

#### Complete Test Suites (with Authentication)
```bash
# Run all tests (auth + all test suites)
npm run test:all

# Run API tests only (auth + API tests)
npm run test:api

# Run UI tests only (auth + UI tests)
npm run test:ui
```

## 🏗️ Architecture

### Page Object Model
All UI interactions are abstracted into page classes located in `cypress/pages/`. Each page extends `BasePage` which provides common functionality.

### API Layer
API calls are organized in `cypress/api/` with each class extending `BaseRequest` for consistent request handling and authentication.

### Authentication Management
- Authentication state is saved to `cypress/fixtures/auth/state.json`
- Automatic cookie restoration for authenticated sessions
- Session management across test runs

### Test Organization
- **API Tests**: Direct API endpoint testing
- **UI Tests**: End-to-end user interface testing
- **Mixed Tests**: Combined API and UI validation

## 🔧 Configuration

### Cypress Configuration
Main configuration is in `cypress.config.ts`:
- Base URL settings
- Test file patterns
- Browser settings
- Video and screenshot options

### TypeScript Configuration
TypeScript settings in `cypress/tsconfig.json`:
- Cypress type definitions
- Module resolution
- Compilation options

## 🚀 CI/CD Workflows

The project includes GitHub Actions workflows with **mandatory authentication**:

- **`cypress.yml`** - Run all tests (UI + API) with auth setup
- **`cypress-api.yml`** - Run API tests only with auth setup
- **`cypress-ui.yml`** - Run UI tests only with auth setup
- **`code-quality.yml`** - Code quality checks (ESLint, Prettier, TypeScript)

### Authentication Workflow
All test workflows follow this pattern:
1. **Authentication Setup** - Runs `auth.cy.ts` first
2. **Authentication Verification** - Checks if `state.json` was created
3. **Main Tests** - Runs the actual test suite (excludes `auth.cy.ts`)
4. **Failure Handling** - Workflow fails if authentication fails

### Triggering Workflows
All test workflows are set to manual trigger (`workflow_dispatch`) for controlled execution.

## 📊 Reporting

- **Screenshots**: Captured automatically on test failures
- **Videos**: Recorded for failed test runs
- **Console Logs**: Available in test runner and CI artifacts

## 🧹 Code Quality

### Available Scripts
```bash
# Format code with Prettier
npm run format

# Check formatting
npm run format:check

# Lint code with ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Type check with TypeScript
npm run type-check

# Run all quality checks
npm run quality

# Fix all quality issues
npm run quality:fix
```

## 📋 Quick Reference

### Most Common Commands
```bash
# Development workflow (Interactive Mode)
npm run cypress:run:auth          # REQUIRED: Run authentication first
npm run cypress:open              # Then open interactive test runner

# Automated testing (Headless Chrome)
npm run test:all                  # Run complete test suite (recommended)
npm run quality                   # Check code quality

# Individual test categories (Headless Chrome)
npm run test:api                  # Authentication + API tests
npm run test:ui                   # Authentication + UI tests
npm run cypress:run:auth          # Authentication only
```

### Authentication Workflow
```bash
# For interactive testing
npm run cypress:run:auth && npm run cypress:open

# For headless testing (authentication included automatically)
npm run test:all    # or test:api, test:ui
```

### Pre-commit Hooks
Consider setting up pre-commit hooks for:
- Code formatting
- Linting
- Type checking

## 🔒 Authentication & Security

- Environment variables for sensitive data
- `cypress/fixtures/auth/` directory in `.gitignore`
- Base64 encoding for passwords in API calls
- Session token management

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Failures**
   - Verify credentials in `cypress.env.json`
   - Check if `cypress/fixtures/auth/state.json` exists and is valid
   - Run `auth.cy.ts` to regenerate authentication state

2. **API Test Failures**
   - Confirm API base URL is correct
   - Check network connectivity
   - Verify API endpoints are accessible

3. **UI Test Failures**
   - Ensure base URL is reachable
   - Check for element selector changes
   - Verify browser compatibility

### Debug Mode
```bash
# Run with debug output
DEBUG=cypress:* npx cypress run

# Open DevTools in interactive mode
npx cypress open --config-file cypress.config.ts
```

## 📈 Best Practices

### Test Writing
- Use Page Object Model for UI interactions
- Keep tests independent and isolated
- Use meaningful test descriptions
- Implement proper wait strategies

### API Testing
- Validate both success and error scenarios
- Test different HTTP methods
- Verify response structure and data
- Handle authentication properly

### Maintenance
- Regular dependency updates
- Monitor test stability
- Refactor flaky tests
- Update selectors as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📝 License

This project is for educational and testing purposes.

## 📞 Support

For issues and questions:
- Check existing GitHub issues
- Create new issue with detailed description
- Include test logs and screenshots when relevant

---

**Happy Testing! 🌲**