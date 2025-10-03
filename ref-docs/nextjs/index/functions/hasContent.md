[**@constellation4sitecore-content-sdk/nextjs**](../../README.md)

***

[@constellation4sitecore-content-sdk/nextjs](../../README.md) / [index](../README.md) / hasContent

# Function: hasContent()

> **hasContent**(`ctx`, `field`): `boolean`

Defined in: [packages/nextjs/src/helpers/fields.ts:13](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/helpers/fields.ts#L13)

Checks if a field has content.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ctx` | `SitecoreContext` | The Sitecore context. |
| `field` | `ImageField` \| `LinkField` \| `Field`\<`string`\> | The field to check. Example: LinkField, ImageField, Field<string> |

## Returns

`boolean`

True if the field has content, false otherwise.
