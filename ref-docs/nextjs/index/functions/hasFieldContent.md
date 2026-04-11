[**@constellation4sitecore-content-sdk/nextjs**](../../README.md)

***

[@constellation4sitecore-content-sdk/nextjs](../../README.md) / [index](../README.md) / hasFieldContent

# Function: hasFieldContent()

> **hasFieldContent**(`page`, `field`): `boolean`

Defined in: [packages/nextjs/src/helpers/fields.ts:37](https://github.com/constellation4sitecore/content-sdk/blob/2e47e23613769e7eb9f79d846ccbfeb76eb17b3e/packages/nextjs/src/helpers/fields.ts#L37)

Checks if a field has content.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `page` | `Page` | THis is supported for App Router. |
| `field` | `ImageField` \| `LinkField` \| `Field`\<`string`\> | The field to check. Example: LinkField, ImageField, Field<string> |

## Returns

`boolean`

True if the field has content, false otherwise.
