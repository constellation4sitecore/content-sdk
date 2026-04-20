[**@constellation4sitecore-content-sdk/nextjs**](../../README.md)

***

[@constellation4sitecore-content-sdk/nextjs](../../README.md) / [proxy](../README.md) / VirtualFolderProxy

# Class: VirtualFolderProxy

Defined in: [packages/nextjs/src/proxy/virtual-folder-proxy.ts:12](https://github.com/constellation4sitecore/content-sdk/blob/2e47e23613769e7eb9f79d846ccbfeb76eb17b3e/packages/nextjs/src/proxy/virtual-folder-proxy.ts#L12)

## Extends

- `ProxyBase`

## Constructors

### Constructor

> **new VirtualFolderProxy**(`proxyConfig`): `VirtualFolderProxy`

Defined in: [packages/nextjs/src/proxy/virtual-folder-proxy.ts:13](https://github.com/constellation4sitecore/content-sdk/blob/2e47e23613769e7eb9f79d846ccbfeb76eb17b3e/packages/nextjs/src/proxy/virtual-folder-proxy.ts#L13)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `proxyConfig` | [`VirtualFolderProxyConfig`](../type-aliases/VirtualFolderProxyConfig.md) |

#### Returns

`VirtualFolderProxy`

#### Overrides

`ProxyBase.constructor`

## Properties

### config

> `protected` **config**: `ProxyBaseConfig`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:50

#### Inherited from

`ProxyBase.config`

***

### defaultHostname

> `protected` **defaultHostname**: `string`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:51

#### Inherited from

`ProxyBase.defaultHostname`

***

### siteResolver

> `protected` **siteResolver**: `SiteResolver`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:52

#### Inherited from

`ProxyBase.siteResolver`

## Methods

### disabled()

> `protected` **disabled**(`req`, `res`): `undefined` \| `boolean`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:72

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `req` | `NextRequest` |
| `res` | `NextResponse` |

#### Returns

`undefined` \| `boolean`

#### Inherited from

`ProxyBase.disabled`

***

### extractDebugHeaders()

> `protected` **extractDebugHeaders**(`incomingHeaders`): `object`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:79

Safely extract all headers for debug logging
Necessary to avoid proxy issue https://github.com/vercel/next.js/issues/39765

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `incomingHeaders` | `Headers` | Incoming headers |

#### Returns

`object`

Object with headers as key/value pairs

#### Inherited from

`ProxyBase.extractDebugHeaders`

***

### getClientFactory()

> `protected` **getClientFactory**(`graphQLOptions`): `GraphQLRequestClientFactory`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:110

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `graphQLOptions` | `GraphQLClientOptions` |

#### Returns

`GraphQLRequestClientFactory`

#### Inherited from

`ProxyBase.getClientFactory`

***

### getHostHeader()

> `protected` **getHostHeader**(`req`): `undefined` \| `string`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:100

Extract 'host' header

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`undefined` \| `string`

#### Inherited from

`ProxyBase.getHostHeader`

***

### getLanguage()

> `protected` **getLanguage**(`req`, `res?`): `string`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:88

Provides used language

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |
| `res?` | `NextResponse`\<`unknown`\> | response |

#### Returns

`string`

language

#### Inherited from

`ProxyBase.getLanguage`

***

### getLanguageFromHeader()

> `protected` **getLanguageFromHeader**(`res?`): `undefined` \| `string`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:95

Extract language from locale header of the response
set by LocaleProxy for app router application

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `res?` | `NextResponse`\<`unknown`\> | response |

#### Returns

`undefined` \| `string`

language or undefined if not found

#### Inherited from

`ProxyBase.getLanguageFromHeader`

***

### getSite()

> `protected` **getSite**(`req`, `res?`): `SiteInfo`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:109

Get site information. If site name is stored in cookie, use it, otherwise resolve by hostname
- If site can't be resolved by site name cookie use default site info based on provided parameters
- If site can't be resolved by hostname throw an error

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |
| `res?` | `NextResponse`\<`unknown`\> | response |

#### Returns

`SiteInfo`

site information

#### Inherited from

`ProxyBase.getSite`

***

### handle()

> **handle**(`req`, `res`): `Promise`\<`NextResponse`\<`unknown`\>\>

Defined in: [packages/nextjs/src/proxy/virtual-folder-proxy.ts:17](https://github.com/constellation4sitecore/content-sdk/blob/2e47e23613769e7eb9f79d846ccbfeb76eb17b3e/packages/nextjs/src/proxy/virtual-folder-proxy.ts#L17)

Handler method to execute proxy logic

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |
| `res` | `NextResponse`\<`unknown`\> | response |

#### Returns

`Promise`\<`NextResponse`\<`unknown`\>\>

#### Overrides

`ProxyBase.handle`

***

### isAppRouter()

> `protected` **isAppRouter**(`res`): `boolean`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:65

Determines if the application is using the app router based on the locale header

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `res` | `NextResponse` | response |

#### Returns

`boolean`

true if app router is used

#### Inherited from

`ProxyBase.isAppRouter`

***

### isPrefetch()

> `protected` **isPrefetch**(`req`): `boolean`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:71

Determines if the request is a Next.js (next/link) prefetch request

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`boolean`

is prefetch

#### Inherited from

`ProxyBase.isPrefetch`

***

### isPreview()

> `protected` **isPreview**(`req`): `boolean`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:59

Determines if mode is preview

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`boolean`

is preview

#### Inherited from

`ProxyBase.isPreview`

***

### rewrite()

> `protected` **rewrite**(`rewritePath`, `req`, `res`, `skipHeader?`): `NextResponse`

Defined in: node\_modules/@sitecore-content-sdk/nextjs/types/proxy/proxy.d.ts:118

Create a rewrite response

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rewritePath` | `string` | the destionation path |
| `req` | `NextRequest` | the current request |
| `res` | `NextResponse` | the current response |
| `skipHeader?` | `boolean` | don't write 'x-sc-rewrite' header |

#### Returns

`NextResponse`

#### Inherited from

`ProxyBase.rewrite`
