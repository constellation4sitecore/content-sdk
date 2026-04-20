[**@constellation4sitecore-content-sdk/nextjs**](../../README.md)

***

[@constellation4sitecore-content-sdk/nextjs](../../README.md) / [index](../README.md) / hasContent

# Function: hasContent()

> **hasContent**(`ctx`, `field`): `boolean`

Defined in: [packages/nextjs/src/helpers/fields.ts:13](https://github.com/constellation4sitecore/content-sdk/blob/2e47e23613769e7eb9f79d846ccbfeb76eb17b3e/packages/nextjs/src/helpers/fields.ts#L13)

Checks if a field has content. For App Router use hasFieldContent instead.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ctx` | `SitecoreContext` | The Sitecore context. |
| `field` | `ImageField` \| `LinkField` \| `Field`\<`string`\> | The field to check. Example: LinkField, ImageField, Field<string> |

## Returns

`boolean`

True if the field has content, false otherwise.
