# Changelog

All packages in this monorepo are versioned together. Changes listed here apply to the `@constellation4sitecore-content-sdk/*` scope.

## [2.0.0] - 2026-04-11

### Breaking Changes

#### Peer dependency upgrades

All packages now require:

| Dependency                     | v1.x      | v2.x      |
| ------------------------------ | --------- | --------- |
| `@sitecore-content-sdk/core`   | `^1.1.0`  | `^2.0.0`  |
| `@sitecore-content-sdk/nextjs` | `^1.1.0`  | `^2.0.0`  |
| `next`                         | `^15.3.1` | `^16.1.1` |
| `react` / `react-dom`          | `^19.1.0` | `^19.2.1` |

#### Import path changes

Layout and site types have moved from `@sitecore-content-sdk/core` to `@sitecore-content-sdk/content`:

```diff
- import { Item, LayoutServiceData, ComponentRendering, Field } from '@sitecore-content-sdk/core/layout';
+ import { Item, LayoutServiceData, ComponentRendering, Field } from '@sitecore-content-sdk/content/layout';

- import { SiteResolver } from '@sitecore-content-sdk/core/site';
+ import { SiteResolver } from '@sitecore-content-sdk/content/site';
```

This affects the following packages: `data`, `enhancers`, `labels`, `mapper`, `navigation`, `page-analytics-scripts`, `page-tagging`, `security`.

#### `security`: Middleware renamed to Proxy

The CSP middleware has been renamed and moved to align with the Content SDK 2.0 proxy pattern:

```diff
- import { CSPMiddleware, CSPMiddlewareConfig } from '@constellation4sitecore-content-sdk/security/middleware';
+ import { CSPProxy, CSPProxyConfig } from '@constellation4sitecore-content-sdk/security/proxy';
```

- `CSPMiddleware` class &rarr; `CSPProxy`
- `CSPMiddlewareConfig` type &rarr; `CSPProxyConfig`
- Base class changed from `MiddlewareBase` to `ProxyBase` (from `@sitecore-content-sdk/nextjs/proxy`)

#### `nextjs`: Debug module refactored

The `debug` npm dependency has been removed. Debug utilities are now provided by the new `content` package. If you were importing `enableDebug` or `Debugger` from `@constellation4sitecore-content-sdk/nextjs`, import them from `@constellation4sitecore-content-sdk/content` instead.

#### `nextjs`: GraphQL client factory

`getEdgeProxyContentUrl` no longer accepts `contextId` as a first argument. The `contextId` is now passed as a separate field in the client config:

```diff
  clientConfig = {
-   endpoint: getEdgeProxyContentUrl(contextId, edgeUrl),
+   endpoint: getEdgeProxyContentUrl(edgeUrl),
+   contextId: contextId,
  };
```

### New Features

#### New package: `content`

A new foundational package (`@constellation4sitecore-content-sdk/content`) with:

- **`defineConfig`** (`content/config`) &mdash; Type-safe configuration builder with `Constellation4SitecoreConfig` types and deep-required resolution.
- **`SiteInfoService`** (`content/site`) &mdash; Service for resolving site information with virtual folder support (`SiteInfoWithVirtualFolder`).
- **`generateVirtualFolders`** (`content/node-tools`) &mdash; Build-time tool that generates virtual folder configuration from Sitecore site definitions.
- **Debug utilities** &mdash; Namespaced debug logging (`debugModule`, `debugNamespace`, `enableDebug`, `isNamespaceEnabled`).

#### `nextjs`: Virtual Folder Proxy

New `VirtualFolderProxy` class (`@constellation4sitecore-content-sdk/nextjs/proxy`) that rewrites incoming request paths based on virtual folder configuration. Enabled via `defineConfig({ virtualFolders: { enabled: true } })` or the `VIRTUAL_FOLDERS_ENABLED` environment variable.

#### `nextjs`: Configuration module

New `defineConfig` function (`@constellation4sitecore-content-sdk/nextjs/config`) that wraps the `content` package config with Next.js-specific defaults, including virtual folder settings from environment variables.

#### `nextjs`: Tools re-export

`generateVirtualFolders` is re-exported from `@constellation4sitecore-content-sdk/nextjs/tools` for convenience.

## [1.1.1] - 2025

### Features

- **App Router support** across `enhancers` and `page-analytics-scripts`.
- `withAppDatasourceRendering` HOC added to `enhancers` for App Router (page passed as prop instead of `useSitecore()` hook).
- `AppAnalyticsService` added to `page-analytics-scripts` with refactored script rendering for App Router compatibility.

## [1.1.0] - 2025

### Features

- Initial stable release with App Router groundwork.

## [1.0.0] - 2025

### Features

- First stable release of the monorepo.
- Packages: `data`, `enhancers`, `labels`, `mapper`, `navigation`, `nextjs`, `page-analytics-scripts`, `page-tagging`, `security`, `url-friendly-page-names`.
