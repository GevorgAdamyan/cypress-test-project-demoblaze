import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // TypeScript specific rules - lighter enforcement
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off', // Allow any type
      '@typescript-eslint/prefer-const': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',

      // General JavaScript/TypeScript rules - reduced strictness
      'no-console': 'off', // Allow console logs
      'no-debugger': 'warn', // Just warn about debugger
      'no-duplicate-imports': 'warn',
      'no-unused-expressions': 'off', // Turn off to avoid issues with expect chains
      'prefer-template': 'off', // Allow string concatenation
      'quote-props': 'off', // Don't enforce quote props

      // Code style - turn off most style rules (Prettier handles this)
      eqeqeq: 'off', // Allow == and ===
      curly: 'off', // Allow single line if statements
      'brace-style': 'off', // Let Prettier handle this

      // Best practices - only warn for serious issues
      'no-eval': 'error', // Keep this as error for security
      'no-implied-eval': 'warn',
      'no-new-func': 'warn',
      'no-return-await': 'off', // Allow return await
      'require-await': 'off', // Don't require await in async functions

      // Turn off other common problematic rules
      'no-undef': 'off', // TypeScript handles this
      'no-redeclare': 'off', // TypeScript handles this
      'no-dupe-class-members': 'off', // TypeScript handles this
      'no-useless-constructor': 'off', // Allow empty constructors
    },
  },
  {
    files: ['tests/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
    plugins: {
      playwright,
    },
    rules: {
      // Playwright rules - lighter enforcement
      'playwright/expect-expect': 'warn', // Just warn if no expects found
      'playwright/no-networkidle': 'off', // Allow networkidle usage
      'playwright/no-skipped-test': 'off', // Allow skipped tests
      'playwright/no-useless-await': 'warn', // Just warn about useless awaits
      'playwright/prefer-web-first-assertions': 'off', // Don't enforce web-first assertions
      'playwright/valid-expect': 'warn', // Just warn about invalid expects
      'playwright/no-conditional-in-test': 'off', // Allow conditionals in tests
      'playwright/no-wait-for-timeout': 'off', // Allow waitForTimeout usage
      'playwright/no-focused-test': 'warn', // Warn about focused tests
    },
  },
  prettier, // Must be last to override other formatting rules
  {
    ignores: [
      'node_modules/',
      'playwright-report/',
      'test-results/',
      '.auth/',
      'coverage/',
      'dist/',
      '*.config.js',
      '*.config.ts',
      'eslint.config.js',
      '.prettierrc',
      'package*.json',
    ],
  },
];
