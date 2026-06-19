# Playwright Claims Framework - Command Reference

This document serves as the master command cheat sheet for executing and recording E2E tests in the Majesco Claims framework.

---

## 1. Project Onboarding & VS Code Initialization

Perform these initialization steps when first importing the project folder into Visual Studio Code:

1. **Install Extensions**: Install the official **Playwright Test** extension by Microsoft from the VS Code Extensions marketplace. This enables debugging, test runner sidebar detection, and trace inspection support.
2. **Install Dependencies**: Open your integrated terminal in VS Code and run:
   ```bash
   npm ci
   ```
3. **Install Browser Binaries**: Download Playwright's packaged browser binaries:
   ```bash
   npx playwright install
   ```
4. **Setup Local Environment Configuration**: Copy the default `.env` template file to `.env.local` to securely override local configurations and user login passwords (this file is pre-configured in `.gitignore` so your private details won't get checked in):
   ```bash
   copy .env .env.local
   ```
5. **Verify Compilation**: Compile files in dry-run mode to confirm TypeScript type configurations are valid:
   ```bash
   npx tsc --noEmit
   ```

---

## 2. Important CLI Usage Rules

### The NPM Double-Dash (`--`) Separator
When executing tests through NPM scripts (e.g. `npm run test:smoke`), NPM intercepts command-line options. You **must** use the double-dash `--` separator to tell NPM to pass subsequent arguments directly to the underlying Playwright runner.

* **Incorrect:** `npm run test:smoke --headed` (NPM intercepts `--headed`, prints a warning, and runs in headless mode).
* **Correct:** `npm run test:smoke -- --headed` (NPM forwards `--headed` directly to Playwright, opening the browser UI).

---

## 3. Dynamic Environment Variables

You can execute any command against a specific environment (e.g., `DEV`, `QA`, `CLOUDQA`, `UAT`) by prefixing the command with `npx cross-env ENV=<NAME>`:

* **QA Environment:** `npx cross-env ENV=QA ...` (Default)
* **CLOUDQA Environment:** `npx cross-env ENV=CLOUDQA ...` (Majesco DSINTSUP upgrade portal)
* **DEV Environment:** `npx cross-env ENV=DEV ...`
* **UAT Environment:** `npx cross-env ENV=UAT ...`

---

## 4. Playwright Command Directory

### A. Smoke Test Suite
* **Headless (Default):**
  ```bash
  npx cross-env ENV=QA npm run test:smoke
  ```
* **Headed Browser Mode:**
  ```bash
  npx cross-env ENV=QA npm run test:smoke -- --headed
  ```
* **Ignore SSL/HTTPS Errors:**
  ```bash
  npx cross-env ENV=QA npm run test:smoke -- --ignore-https-errors
  ```
* **Headed + Ignore HTTPS Errors:**
  ```bash
  npx cross-env ENV=QA npm run test:smoke -- --headed --ignore-https-errors
  ```

---

### B. Upgrade Validation Suite

#### 1. Base Capability Tests (Search, Payments, Reserves)
* **Headed + Ignore HTTPS Errors:**
  ```bash
  npx cross-env ENV=QA npm run test:upgrade:base-capability -- --headed --ignore-https-errors
  ```
* **CLOUDQA Context:**
  ```bash
  npx cross-env ENV=CLOUDQA npm run test:upgrade:base-capability -- --headed --ignore-https-errors
  ```

#### 2. Base Defects Tests
* **Headed + Ignore HTTPS Errors:**
  ```bash
  npx cross-env ENV=QA npm run test:upgrade:base-defects -- --headed --ignore-https-errors
  ```
* **CLOUDQA Context:**
  ```bash
  npx cross-env ENV=CLOUDQA npm run test:upgrade:base-defects -- --headed --ignore-https-errors
  ```

---

### C. Regression Suite (Dynamic Runner via list config)
This command reads files mapped in `tests/regression/regression-list.json` and runs them.

* **Headed + Ignore HTTPS Errors:**
  ```bash
  npx cross-env ENV=QA npm run test:regression -- --headed --ignore-https-errors
  ```
* **CLOUDQA Context:**
  ```bash
  npx cross-env ENV=CLOUDQA npm run test:regression -- --headed --ignore-https-errors
  ```

---

### D. Regression Cases (Individual Scenarios)
Direct execution of specific regression suites located in `tests/regression-cases/`.

#### 1. Recent Tickets Suite
* **Headed + Ignore HTTPS Errors:**
  ```bash
  npx cross-env ENV=QA npm run test:regression:recent-tickets -- --headed --ignore-https-errors
  ```

#### 2. Change Requests (CR) Suite
* **Headed + Ignore HTTPS Errors:**
  ```bash
  npx cross-env ENV=QA npm run test:regression:cr -- --headed --ignore-https-errors
  ```

#### 3. Support Incidents Suite
* **Headed + Ignore HTTPS Errors:**
  ```bash
  npx cross-env ENV=QA npm run test:regression:incidents -- --headed --ignore-https-errors
  ```

#### 4. High-Priority Defects Suite
* **Headed + Ignore HTTPS Errors:**
  ```bash
  npx cross-env ENV=QA npm run test:regression:high-priority-defects -- --headed --ignore-https-errors
  ```

#### 5. Reused Upgrade Flows Suite
* **Headed + Ignore HTTPS Errors:**
  ```bash
  npx cross-env ENV=QA npm run test:regression:reused-upgrade -- --headed --ignore-https-errors
  ```

---

## 5. Playwright Codegen (Interactive Test Recording)

To record workflows and generate locators/code interactively, invoke `codegen` using the target site URL and include the SSL ignore flag:

* **QA Recording Session (Ignore HTTPS Errors):**
  ```bash
  npx playwright codegen https://us-qcsup.majesco.io/Claim/ --ignore-https-errors
  ```
* **CLOUDQA / DSINTSUP Recording Session (Ignore HTTPS Errors):**
  ```bash
  npx playwright codegen https://us-dsintsup.majesco.io/Claim/ --ignore-https-errors
  ```
* **Generic Codegen Session (Ignore HTTPS Errors):**
  ```bash
  npx playwright codegen --ignore-https-errors
  ```

---

## 6. Setup & Operational Report Utilities

* **Clean previous run outputs:**
  ```bash
  npm run clean
  ```
* **Generate executive dashboard JSONs:**
  ```bash
  npm run report:dashboard
  ```
* **Generate & Open Allure execution report:**
  ```bash
  npm run allure:generate && npm run allure:open
  ```
