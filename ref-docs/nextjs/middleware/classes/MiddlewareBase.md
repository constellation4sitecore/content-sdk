[**@constellation4sitecore-content-sdk/nextjs**](../../README.md)

***

[@constellation4sitecore-content-sdk/nextjs](../../README.md) / [middleware](../README.md) / MiddlewareBase

# Abstract Class: MiddlewareBase

Defined in: [packages/nextjs/src/middleware/index.ts:30](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L30)

## Constructors

### Constructor

> **new MiddlewareBase**(`config`): `MiddlewareBase`

Defined in: [packages/nextjs/src/middleware/index.ts:35](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L35)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`MiddlewareBaseConfig`](../type-aliases/MiddlewareBaseConfig.md) |

#### Returns

`MiddlewareBase`

## Properties

### config

> `protected` **config**: [`MiddlewareBaseConfig`](../type-aliases/MiddlewareBaseConfig.md)

Defined in: [packages/nextjs/src/middleware/index.ts:35](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L35)

***

### defaultHostname

> `protected` **defaultHostname**: `string`

Defined in: [packages/nextjs/src/middleware/index.ts:33](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L33)

***

### REWRITE\_HEADER\_NAME

> `protected` **REWRITE\_HEADER\_NAME**: `string` = `'x-sc-rewrite'`

Defined in: [packages/nextjs/src/middleware/index.ts:32](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L32)

***

### SITE\_SYMBOL

> `protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

Defined in: [packages/nextjs/src/middleware/index.ts:31](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L31)

## Methods

### excludeRoute()

> `protected` **excludeRoute**(`pathname`): `undefined` \| `boolean`

Defined in: [packages/nextjs/src/middleware/index.ts:50](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L50)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pathname` | `string` |

#### Returns

`undefined` \| `boolean`

***

### extractDebugHeaders()

> `protected` **extractDebugHeaders**(`incomingHeaders`): `object`

Defined in: [packages/nextjs/src/middleware/index.ts:65](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L65)

Safely extract all headers for debug logging
Necessary to avoid middleware issue https://github.com/vercel/next.js/issues/39765

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `incomingHeaders` | `Headers` | Incoming headers |

#### Returns

`object`

Object with headers as key/value pairs

***

### getHostHeader()

> `protected` **getHostHeader**(`req`): `undefined` \| `string`

Defined in: [packages/nextjs/src/middleware/index.ts:84](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L84)

Extract 'host' header

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`undefined` \| `string`

***

### getLanguage()

> `protected` **getLanguage**(`req`): `string`

Defined in: [packages/nextjs/src/middleware/index.ts:76](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L76)

Provides used language

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`string`

language

***

### getSite()

> `protected` **getSite**(`req`, `res?`): `undefined` \| `SiteInfo`

Defined in: [packages/nextjs/src/middleware/index.ts:95](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L95)

Get site information.
Can not be used in **Preview** mode, since site will not be resolved

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |
| `res?` | `NextResponse`\<`unknown`\> | response |

#### Returns

`undefined` \| `SiteInfo`

site information

***

### isPreview()

> `protected` **isPreview**(`req`): `boolean`

Defined in: [packages/nextjs/src/middleware/index.ts:44](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L44)

Determines if mode is preview

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`boolean`

is preview

***

### rewrite()

> `protected` **rewrite**(`rewritePath`, `req`, `res`): `NextResponse`

Defined in: [packages/nextjs/src/middleware/index.ts:111](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/middleware/index.ts#L111)

Create a rewrite response

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rewritePath` | `string` | the destionation path |
| `req` | `NextRequest` | the current request |
| `res` | `NextResponse` | the current response |

#### Returns

`NextResponse`
