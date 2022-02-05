# Class: Jpptr

jpptr class

help create jpptr and create actions executor

**`example`**
```ts

;(async ()=>{

const jpptr = Jpptr.from("./test.json")

const executor = await jpptr.createExecutor()

await executor.executeAll()

})()

```

## Constructors

### constructor

• **new Jpptr**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`JpptrOptions`](../interfaces/JpptrOptions.md) |

## Properties

### actions

• **actions**: `undefined` \| [`Action`](../api.md#action)[]

___

### debug

• **debug**: `undefined` \| `boolean` \| [`DebugOptions`](../api.md#debugoptions)

___

### launch

• **launch**: `undefined` \| [`PuppeteerOptions`](../api.md#puppeteeroptions)

___

### options

• **options**: [`JpptrOptions`](../interfaces/JpptrOptions.md)

___

### register

• **register**: `undefined` \| [`ModuleRegister`](ModuleRegister.md)

___

### variables

• **variables**: `undefined` \| [`Variables`](../api.md#variables)

## Methods

### createExecutor

▸ **createExecutor**(`options?`): `Promise`<[`ActionExecutor`](ActionExecutor.md)<`any`\>\>

create [ActionExecutor](ActionExecutor.md) with jpptr options

the parameters passed in can override the initialization parameters of jpptr.

**`example`**
```ts

;(async ()=>{

const jpptr = Jpptr.from("./test.json")

const executor = await jpptr.createExecutor()

await executor.executeAll()

})()

```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`JpptrOptions`](../interfaces/JpptrOptions.md) | [JpptrOptions](../interfaces/JpptrOptions.md) |

#### Returns

`Promise`<[`ActionExecutor`](ActionExecutor.md)<`any`\>\>

Promise<[ActionExecutor](ActionExecutor.md)<any>>

___

### create

▸ `Static` **create**(`schema`, `options?`): [`Jpptr`](Jpptr.md)

create jpptr with JpptrSchema object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | [`JpptrSchema`](../interfaces/JpptrSchema.md) | [JpptrSchema](../interfaces/JpptrSchema.md) |
| `options?` | `Object` | \{cwd: string} |
| `options.cwd` | `string` | - |

#### Returns

[`Jpptr`](Jpptr.md)

<[Jpptr](Jpptr.md)>

___

### defaultParsers

▸ `Static` **defaultParsers**(): [`Register`](Register.md)<``"variables"`` \| ``"page"`` \| ``"frame"`` \| ``"array"``, [`ActionParser`](../interfaces/ActionParser.md)\>

default parsers

ArrayParser priority is 100, the rest is the default 10

#### Returns

[`Register`](Register.md)<``"variables"`` \| ``"page"`` \| ``"frame"`` \| ``"array"``, [`ActionParser`](../interfaces/ActionParser.md)\>

___

### defaultPlugins

▸ `Static` **defaultPlugins**(): [`Register`](Register.md)<keyof [`PluginParams`](../interfaces/PluginParams.md), [`PluginFunction`](../api.md#pluginfunction)\>

default plugins

#### Returns

[`Register`](Register.md)<keyof [`PluginParams`](../interfaces/PluginParams.md), [`PluginFunction`](../api.md#pluginfunction)\>

___

### execute

▸ `Static` **execute**(`path`, `options?`): `Promise`<`void`\>

execute the json file with actions

same as
```shell
$ jpptr exec ./test.json
```

**`see`** executeCommandAction

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `options?` | `Object` |
| `options.cwd?` | `string` |

#### Returns

`Promise`<`void`\>

Promise<void>

___

### from

▸ `Static` **from**(`path`, `options?`): [`Jpptr`](Jpptr.md)

create jpptr with json file with actions
****
If your json file is not in the root directory, add `__dirname` to locate the path to the file.

Or use the `options.cwd` to specify
```js

const jpptr = Jpptr.from(path.resolve(__dirname,"./test.json"));
// or
const jpptr = Jpptr.from("./test.json",{cwd:__dirname});

```

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `options?` | `Object` |
| `options.cwd` | `string` |

#### Returns

[`Jpptr`](Jpptr.md)

<[Jpptr](Jpptr.md)>

___

### launch

▸ `Static` **launch**(`path`, `options?`): `Promise`<`void`\>

execute the file with jpptr configs

same as
```shell
$ jpptr ./jpptr.config.json
```

**`see`** launchCommandAction

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `options?` | `Object` |
| `options.cwd?` | `string` |

#### Returns

`Promise`<`void`\>

Promise<void>

___

### readJsonFile

▸ `Static` **readJsonFile**(`path`): `any`

read jsonc `(json with comments)` file

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`any`
