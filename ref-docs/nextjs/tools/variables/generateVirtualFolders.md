[**@constellation4sitecore-content-sdk/nextjs**](../../README.md)

***

[@constellation4sitecore-content-sdk/nextjs](../../README.md) / [tools](../README.md) / generateVirtualFolders

# Variable: generateVirtualFolders()

> `const` **generateVirtualFolders**: (`{ c4sConfig, destinationPath, }`) => (`args`) => `Promise`\<`void`\>

Defined in: packages/content/types/tools/generate-virtual-folders.d.ts:21

Generates site information and writes it to a specified destination path.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `{ c4sConfig, destinationPath, }` | `GenerateSitesConfig` |

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
