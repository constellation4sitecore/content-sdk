[**@constellation4sitecore-content-sdk/nextjs**](../../README.md)

***

[@constellation4sitecore-content-sdk/nextjs](../../README.md) / [index](../README.md) / ExtendedImageProps

# Interface: ExtendedImageProps

Defined in: [packages/nextjs/src/fields-extensions/Image.tsx:4](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/fields-extensions/Image.tsx#L4)

## Extends

- `ImageProps`

## Indexable

\[`attributeName`: `string`\]: `unknown`

## Properties

### editable?

> `optional` **editable**: `boolean`

Defined in: node\_modules/@sitecore-content-sdk/react/types/components/sharedTypes/props.d.ts:9

Can be used to explicitly disable inline editing.

#### Default

```ts
true
```

#### Inherited from

`ImageProps.editable`

***

### emptyFieldEditingComponent?

> `optional` **emptyFieldEditingComponent**: `ComponentClass`\<`ImageProps`, `any`\> \| `FC`\<`ImageProps`\>

Defined in: node\_modules/@sitecore-content-sdk/react/types/components/sharedTypes/props.d.ts:13

Custom element to render in Pages in edit mode if field value is empty

#### Inherited from

`ImageProps.emptyFieldEditingComponent`

***

### field?

> `optional` **field**: (ImageField \| ImageFieldValue) & FieldMetadata

Defined in: node\_modules/@sitecore-content-sdk/react/types/components/Image.d.ts:31

Image field data (consistent with other field types)

#### Inherited from

`ImageProps.field`

***

### imageParams?

> `optional` **imageParams**: `object`

Defined in: node\_modules/@sitecore-content-sdk/react/types/components/Image.d.ts:35

Parameters that will be attached to Sitecore media URLs

#### Index Signature

\[`paramName`: `string`\]: `string` \| `number`

#### Inherited from

`ImageProps.imageParams`

***

### isSvg?

> `optional` **isSvg**: `boolean`

Defined in: [packages/nextjs/src/fields-extensions/Image.tsx:5](https://github.com/constellation4sitecore/content-sdk/blob/68f5636dd87f6bb306e4c2c6ae8cb62f4f86e925/packages/nextjs/src/fields-extensions/Image.tsx#L5)

***

### mediaUrlPrefix?

> `optional` **mediaUrlPrefix**: `RegExp`

Defined in: node\_modules/@sitecore-content-sdk/react/types/components/Image.d.ts:46

Custom regexp that finds media URL prefix that will be replaced by `/-/jssmedia` or `/~/jssmedia`.

#### Example

```ts
//([-~]{1})assets//i
/-assets/website -> /-/jssmedia/website
/~assets/website -> /~/jssmedia/website
```

#### Inherited from

`ImageProps.mediaUrlPrefix`

***

### srcSet?

> `optional` **srcSet**: `ImageSizeParameters`[]

Defined in: node\_modules/@sitecore-content-sdk/react/types/components/Image.d.ts:38

#### Inherited from

`ImageProps.srcSet`
