[**@constellation4sitecore-content-sdk/content**](../../README.md)

***

[@constellation4sitecore-content-sdk/content](../../README.md) / [config](../README.md) / DeepRequired

# Type Alias: DeepRequired\<T\>

> **DeepRequired**\<`T`\> = `Required`\<`{ [K in keyof T]: T[K] extends Required<T[K]> ? T[K] : DeepRequired<T[K]> }`\>

Defined in: [packages/content/src/config/models.ts:5](https://github.com/constellation4sitecore/content-sdk/blob/2e47e23613769e7eb9f79d846ccbfeb76eb17b3e/packages/content/src/config/models.ts#L5)

Utility type to make every property in a type required

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
