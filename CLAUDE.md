# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lerna/Yarn workspaces monorepo of Sitecore XM Cloud companion libraries (`@constellation4sitecore-content-sdk/*`). All packages build on top of `@sitecore-content-sdk/nextjs` and `@sitecore-content-sdk/core` to provide higher-level abstractions for data access, content mapping, navigation, SEO, security, and React component patterns.

## Build & Development Commands

```bash
# Install dependencies
yarn install

# Build all packages (dual CJS/ESM output)
yarn build

# Full reset (clean, reinstall, rebuild)
yarn reset

# Lint all packages
yarn lint-packages

# Run all tests
yarn test-packages

# Run tests for a single package
cd packages/nextjs && yarn test

# Generate docs (nextjs package only)
yarn generate-docs
```

Each package builds via `tsc` twice: once for `dist/cjs/` (CommonJS) and once for `dist/esm/` (ES modules). Entry points are `main` (CJS) and `module` (ESM) in each package.json.

## Testing

- **Framework**: Mocha + Chai (not Jest)
- **Test files**: `src/**/*.test.ts`, `src/**/*.test.tsx`
- **Currently**: Only the `nextjs` package has active tests
- **Single test run**: `cd packages/nextjs && npx mocha --require ./test/setup.js "src/**/*.test.ts" --exit`

## Code Style

- **ESLint** with `@typescript-eslint/parser`, Prettier integration
- **Prettier**: single quotes, trailing commas (es5), 2-space indent, 100 char print width
- TypeScript strict mode enabled across all packages

## Architecture

### Package Dependency Graph

```
mapper          (base utility - no internal deps)
nextjs          (base - GraphqlService, field helpers)
  ├── enhancers      (HOCs: withDatasourceRendering)
  ├── data           (DataService, depends on mapper + nextjs)
  │   └── navigation (NavigationService, depends on data)
  ├── labels         (LabelService, depends on mapper + nextjs)
  ├── security       (CSPProxy, depends on nextjs)
  ├── page-analytics-scripts (AnalyticsService, depends on data + mapper + nextjs)
  └── page-tagging   (PageTaggingService, depends on enhancers + mapper + nextjs)
url-friendly-page-names  (Sitecore serialization config only, no TS source)
```

### Core Patterns

**GraphQL Service Pattern**: All data-fetching services extend `GraphqlService` (defined in `nextjs`), which provides `getClient()` with retry logic (429, 502, 503, 504, 520-524) and language context extraction from `LayoutServiceData`.

```
Constructor(layoutData: LayoutServiceData) → getClient() → request<T>(gql query)
```

**Field Mapping**: GraphQL returns fields as `{ name, jsonValue }[]` arrays. The `mapper` package provides `mapToNew<T>(item)` to convert these to typed objects, and `castItem<T>()` for direct field casts.

**HOC Pattern** (`enhancers`): `withDatasourceRendering` wraps components to resolve datasource fields, with site-specific component mapping support. `withAppDatasourceRendering` is the App Router variant (page passed as prop instead of `useSitecore()` hook).

**Proxy Pattern** (`security`): `CSPProxy` extends `ProxyBase` from `@sitecore-content-sdk/nextjs/proxy`. Handles CSP header injection with in-memory caching and nonce generation. The package uses static export files (`proxy.js`, `proxy.d.ts`) that re-export from `dist/cjs/proxy/`.

### Environment Variables

- `GRAPH_QL_SERVICE_RETRIES` — GraphQL client retry count
- `NODE_ENV` — Development mode bypasses (e.g., CSP)
- `CONSTELLATION_NEXT_CACHE_ENABLED` — Experimental next/cache integration

### Peer Dependencies

All packages expect these as peer dependencies from the consuming application:
- `@sitecore-content-sdk/core` ^2.0.0
- `@sitecore-content-sdk/nextjs` ^2.0.0
- `react` / `next` (where applicable)
