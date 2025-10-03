[**@constellation4sitecore-content-sdk/nextjs**](../../README.md)

***

[@constellation4sitecore-content-sdk/nextjs](../../README.md) / [middleware](../README.md) / MiddlewareBaseConfig

# Type Alias: MiddlewareBaseConfig

> **MiddlewareBaseConfig** = `object`

Defined in: [packages/nextjs/src/middleware/index.ts:4](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L4)

## Properties

### defaultHostname?

> `optional` **defaultHostname**: `string`

Defined in: [packages/nextjs/src/middleware/index.ts:23](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L23)

Fallback hostname in case `host` header is not present

#### Default

```ts
localhost
```

***

### disabled()?

> `optional` **disabled**: (`req?`, `res?`) => `boolean`

Defined in: [packages/nextjs/src/middleware/index.ts:10](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L10)

function, determines if middleware should be turned off, based on cookie, header, or other considerations

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req?` | `NextRequest` | request object from middleware handler |
| `res?` | `NextResponse` | response object from middleware handler |

#### Returns

`boolean`

***

### excludeRoute()?

> `optional` **excludeRoute**: (`pathname`) => `boolean`

Defined in: [packages/nextjs/src/middleware/index.ts:18](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L18)

Function used to determine if route should be excluded.
By default, files (pathname.includes('.')), Next.js API routes (pathname.startsWith('/api/')), and Sitecore API routes (pathname.startsWith('/sitecore/')) are ignored.
This is an important performance consideration since Next.js Edge middleware runs on every request.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pathname` | `string` | The pathname |

#### Returns

`boolean`

Whether to exclude the route

***

### siteResolver

> **siteResolver**: `SiteResolver`

Defined in: [packages/nextjs/src/middleware/index.ts:27](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L27)

Site resolution implementation by name/hostname
