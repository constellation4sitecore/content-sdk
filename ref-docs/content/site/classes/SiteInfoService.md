[**@constellation4sitecore-content-sdk/content**](../../README.md)

***

[@constellation4sitecore-content-sdk/content](../../README.md) / [site](../README.md) / SiteInfoService

# Class: SiteInfoService

Defined in: [packages/content/src/site/siteinfo-service.ts:37](https://github.com/constellation4sitecore/content-sdk/blob/2e47e23613769e7eb9f79d846ccbfeb76eb17b3e/packages/content/src/site/siteinfo-service.ts#L37)

## Extends

- `SiteInfoService`

## Constructors

### Constructor

> **new SiteInfoService**(`siteConfig`): `SiteInfoService`

Defined in: [packages/content/src/site/siteinfo-service.ts:40](https://github.com/constellation4sitecore/content-sdk/blob/2e47e23613769e7eb9f79d846ccbfeb76eb17b3e/packages/content/src/site/siteinfo-service.ts#L40)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `siteConfig` | `SiteInfoServiceConfig` |

#### Returns

`SiteInfoService`

#### Overrides

`SiteInfoServiceBase.constructor`

## Accessors

### siteQuery

#### Get Signature

> **get** `protected` **siteQuery**(): `string`

Defined in: node\_modules/@sitecore-content-sdk/content/types/site/siteinfo-service.d.ts:47

site query is available on XM Cloud and XP 10.4+

##### Returns

`string`

#### Inherited from

`SiteInfoServiceBase.siteQuery`

## Methods

### fetchSiteInfo()

> **fetchSiteInfo**(`fetchOptions?`): `Promise`\<`SiteInfo`[]\>

Defined in: node\_modules/@sitecore-content-sdk/content/types/site/siteinfo-service.d.ts:48

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fetchOptions?` | `FetchOptions` |

#### Returns

`Promise`\<`SiteInfo`[]\>

#### Inherited from

`SiteInfoServiceBase.fetchSiteInfo`

***

### fetchSiteInfoWithAttributes()

> **fetchSiteInfoWithAttributes**(`fetchOptions?`): `Promise`\<[`SiteInfoWithVirtualFolder`](../type-aliases/SiteInfoWithVirtualFolder.md)[]\>

Defined in: [packages/content/src/site/siteinfo-service.ts:58](https://github.com/constellation4sitecore/content-sdk/blob/2e47e23613769e7eb9f79d846ccbfeb76eb17b3e/packages/content/src/site/siteinfo-service.ts#L58)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fetchOptions?` | `FetchOptions` |

#### Returns

`Promise`\<[`SiteInfoWithVirtualFolder`](../type-aliases/SiteInfoWithVirtualFolder.md)[]\>

***

### getCacheClient()

> `protected` **getCacheClient**(): `CacheClient`\<`SiteInfo`[]\>

Defined in: node\_modules/@sitecore-content-sdk/content/types/site/siteinfo-service.d.ts:54

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

`CacheClient`\<`SiteInfo`[]\>

CacheClient instance

#### Inherited from

`SiteInfoServiceBase.getCacheClient`

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): `GraphQLClient`

Defined in: node\_modules/@sitecore-content-sdk/content/types/site/siteinfo-service.d.ts:61

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Inherited from

`SiteInfoServiceBase.getGraphQLClient`

***

### getSiteCacheClient()

> `protected` **getSiteCacheClient**(): `CacheClient`\<[`SiteInfoWithVirtualFolder`](../type-aliases/SiteInfoWithVirtualFolder.md)[]\>

Defined in: [packages/content/src/site/siteinfo-service.ts:51](https://github.com/constellation4sitecore/content-sdk/blob/2e47e23613769e7eb9f79d846ccbfeb76eb17b3e/packages/content/src/site/siteinfo-service.ts#L51)

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

`CacheClient`\<[`SiteInfoWithVirtualFolder`](../type-aliases/SiteInfoWithVirtualFolder.md)[]\>

CacheClient instance
