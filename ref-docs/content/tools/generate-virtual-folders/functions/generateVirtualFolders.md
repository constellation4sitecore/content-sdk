[**@constellation4sitecore-content-sdk/content**](../../../README.md)

***

[@constellation4sitecore-content-sdk/content](../../../README.md) / [tools/generate-virtual-folders](../README.md) / generateVirtualFolders

# Function: generateVirtualFolders()

> **generateVirtualFolders**(`config`): (`args`) => `Promise`\<`void`\>

Defined in: [packages/content/src/tools/generate-virtual-folders.ts:35](https://github.com/constellation4sitecore/content-sdk/blob/2e47e23613769e7eb9f79d846ccbfeb76eb17b3e/packages/content/src/tools/generate-virtual-folders.ts#L35)

Generates site information and writes it to a specified destination path.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`GenerateSitesConfig`](../type-aliases/GenerateSitesConfig.md) | The configuration for generating site info. |

## Returns

- A promise that resolves to an asynchronous function that fetches site information and writes it to a file.

> (`args`): `Promise`\<`void`\>

### Parameters

| Parameter | Type |
| ------ | ------ |
| `args` | \{ `scConfig`: `SitecoreConfig`; \} |
| `args.scConfig` | `SitecoreConfig` |

### Returns

`Promise`\<`void`\>
