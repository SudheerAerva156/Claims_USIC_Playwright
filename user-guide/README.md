# Playwright Claims Framework User Guide

Welcome! This folder contains operational details on how to configure, execute, and analyze automated test suites for the Claims Management application.

## Core Features

- **Decoupled Locators**: Selectors are externalized in JSON files under `locators/`. No TypeScript modification is needed to update selectors.
- **Dynamic Multi-Role Login**: Standard credentials reside in `config/roles/roles.ts` and can be overridden via OS environment variables.
- **Timestamped Run Evidence**: Saves full-page screenshots, video recordings, trace files, and console error statements to `reports/artifacts/`.
- **Management Reporting**: Lightweight JSON performance dashboards (`execution-summary.json`, etc.) populate under `reports/dashboards/`.

## Folder Index

- [COMMANDS.md](COMMANDS.md): Full command-line cheat sheet for developers and testers.
- [ARCHITECTURE.md](ARCHITECTURE.md): Deep-dive into Page Object patterns, Managers, and Custom Fixtures.
