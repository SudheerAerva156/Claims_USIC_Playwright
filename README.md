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

## Quick Start

```bash
# Install dependencies
npm ci

# Download browsers
npx playwright install

# Run Smoke suite
npm run test:smoke
```

For detailed guidance, check the documentation files inside the [user-guide/](user-guide/README.md) folder.
