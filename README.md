# Majesco Claims Management - Playwright TypeScript Automation Framework

Production-grade automation framework designed for support and upgrade testing needs. Features decoupled locators, multi-role credential resolution, environments parsing, automated console logs capture, and timestamped screenshot/trace archiving.

## Project Structure

```text
├── .github/workflows/       # GitHub Actions CI yaml pipelines
├── config/                  # Environment parameters and user role credentials
├── locators/                # Decoupled selector repository (JSON files)
├── src/
│   ├── base/                # Page base classes and wrappers
│   ├── constants/           # Framework tags, environments, roles
│   ├── fixtures/            # Page objects custom fixtures and hooks
│   ├── managers/            # Environments, secrets, and artifact managers
│   ├── pages/               # POM (Page Object Model) layers
│   ├── services/            # API endpoints client and data seeders
│   ├── types/               # TypeScript interfaces
│   └── utils/               # Loggers, screenshot, console and system helpers
├── tests/                   # Smoke, Upgrade, and Regression specs
├── user-guide/              # README, Architecture, and Commands documents
├── Jenkinsfile              # Jenkins pipelines configuration
├── playwright.config.ts     # Playwright compiler settings
└── package.json             # NPM build tasks and scripts
```

## First-Time Project Initialization Setup

Follow these steps once you import or clone this framework into VS Code:

### Step 1: Install Recommended VS Code Extensions
Ensure you have the following extension installed in VS Code for a premium editing and execution experience:
* **Playwright Test** (by Microsoft) — Enables inline test debugging, execution code lenses, and selector inspection.

### Step 2: Install Node Dependencies
Open VS Code's terminal and run a clean dependency restore:
```bash
npm ci
```

### Step 3: Install Playwright Browsers
Download the required browser executable binaries:
```bash
npx playwright install
```

### Step 4: Configure Local Credentials (.env.local)
The `.env` file contains baseline variables. To override credentials securely without checking them into Git, copy the baseline settings to a local file:
```bash
copy .env .env.local
```
Then, open `.env.local` and add any override variables you need, such as:
```ini
QA_ADMIN_USERNAME=your_username
QA_ADMIN_PASSWORD=your_password
```

### Step 5: Verify Setup & Run Smoke Tests
Ensure everything compiles and run a basic smoke listing check:
```bash
# Verify TypeScript compile verification
npx tsc --noEmit

# Run smoke test in list mode to confirm locator parsing works
npm run test:smoke -- --list

# Run E2E smoke tests locally (headed with SSL bypass)
npx cross-env ENV=QA npm run test:smoke -- --headed --ignore-https-errors
```

For detailed guidance, check the documentation files inside the [user-guide/](file:///c:/Users/Aerva910894/OneDrive%20-%20Majesco/Desktop/Sudheer/Playwright/Claims_USIC_Playwright/user-guide/README.md) folder.
