# Playwright Claims Framework - Command Reference

## Installation & Setup

```bash
# Install package dependencies
npm ci

# Download Playwright browser engines
npx playwright install
```

## Running Tests

### Standard Commands

```bash
# Run all tests headlessly
npm test

# Run Smoke Tests
npm run test:smoke

# Run Upgrade Base Capability Tests
npm run test:upgrade:base-capability

# Run Upgrade Base Defects Tests
npm run test:upgrade:base-defects

# Run all Regression Tests
npm run test:regression
```

### Specifying Target Environment (DEV, QA, UAT)

Override target application context using `ENV` (via `cross-env` inside the scripts):

```bash
# Run smoke tests against CLOUDQA
npx cross-env ENV=CLOUDQA npm run test:smoke

# Run upgrade capability tests against QA2
npx cross-env ENV=QA2 npm run test:upgrade:base-capability
```

### Headed and Debug Executions

```bash
# Run headed in chromium
npx cross-env ENV=QA npx playwright test --headed

# Run with Playwright Inspector Debugger
npx cross-env ENV=QA npx playwright test --debug
```

## Analyzing Reports

```bash
# Generate the executive JSON dashboards
npm run report:dashboard

# Generate Allure static site
npm run allure:generate

# Open the Allure report in browser
npm run allure:open
```
