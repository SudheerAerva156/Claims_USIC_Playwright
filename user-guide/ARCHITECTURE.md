# Playwright Claims Framework - Architectural Design

This document details the core frameworks layers, patterns, and resolution pipelines.

## 1. Decoupled Locator Repository

Select selectors reside outside page models under `locators/`. Page objects resolve selectors via `LocatorManager.getLocator(path)` where path is dot-separated (e.g. `login.usernameInput`).

- `login.json` -> Authentication page inputs
- `dashboard.json` -> Landing portal actions
- `claims/` -> Modular claim forms (search, details, reserves, payments, notes)
- `shared/` -> Cross-page elements (menus, grids, toast messages)

Traversing supports nested paths (3-part) as well as fallback recursive checks (2-part) to preserve compatibility.

## 2. Dynamic managers

- **EnvironmentManager**: Parses `process.env.ENV` to resolve baseUrl and timeouts.
- **CredentialManager**: Resolves target role credentials. Prioritizes environment overrides like `QA_ADMIN_USERNAME` over default configurations.
- **ArtifactManager**: Organizes timestamped evidence trees (`reports/artifacts/<YYYY>/<MM>/<DD>/<ENV>/<SUITE>/<BROWSER>/<TEST_NAME>`).

## 3. Custom Fixture Pipeline

Test pages inherit page object properties using Playwright fixtures declared in `src/fixtures/test.fixture.ts`. 

```ts
test('Verify claim', async ({ loginPage, claimsSearchPage }) => {
  await loginPage.navigate();
  await loginPage.loginWithRole('Admin');
  await claimsSearchPage.searchClaim('CLM-2026');
});
```

Fixtures also register automated `beforeEach` and `afterEach` hooks:
1. Pipes browser console errors and exceptions directly to test logs.
2. Captures full-page screenshots on failure.
3. Consolidates video recordings and trace zips.
4. Serializes test-run outcomes to JSON metadata files for dashboards.
