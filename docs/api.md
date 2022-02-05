# Jpptr API - v1.6.2

## Classes

- [ActionExecutor](classes/ActionExecutor.md)
- [Jpptr](classes/Jpptr.md)
- [ModuleRegister](classes/ModuleRegister.md)
- [Parser](classes/Parser.md)
- [Register](classes/Register.md)
- [Walker](classes/Walker.md)

## Interfaces

- [ActionExecutorEvents](interfaces/ActionExecutorEvents.md)
- [ActionExecutorOptions](interfaces/ActionExecutorOptions.md)
- [ActionParser](interfaces/ActionParser.md)
- [ConditionWrapper](interfaces/ConditionWrapper.md)
- [JpptrOptions](interfaces/JpptrOptions.md)
- [JpptrSchema](interfaces/JpptrSchema.md)
- [ModuleRegisterSchema](interfaces/ModuleRegisterSchema.md)
- [PluginParams](interfaces/PluginParams.md)
- [PluginParamsWithName](interfaces/PluginParamsWithName.md)
- [SwitchCase](interfaces/SwitchCase.md)

## Other Type aliases

- [Action](api.md#action)
- [ActionSchema](api.md#actionschema)
- [ApplyPluginParams](api.md#applypluginparams)
- [ArrayAction](api.md#arrayaction)
- [Context](api.md#context)
- [DebugOptions](api.md#debugoptions)
- [ObjectAction](api.md#objectaction)
- [ParserContext](api.md#parsercontext)
- [ParserFunction](api.md#parserfunction)
- [PluginFunction](api.md#pluginfunction)
- [PluginReturnType](api.md#pluginreturntype)
- [PuppeteerOptions](api.md#puppeteeroptions)
- [SetPluginParams](api.md#setpluginparams)
- [Variables](api.md#variables)

## Plugin Params Type aliases

- [ForPluginParams](api.md#forpluginparams)
- [FramePluginParams](api.md#framepluginparams)
- [FunctionPluginParams](api.md#functionpluginparams)
- [PagePluginParams](api.md#pagepluginparams)
- [SwitchPluginParams](api.md#switchpluginparams)
- [VariablesPluginParams](api.md#variablespluginparams)

## Plugin Functions

- [ForPlugin](api.md#forplugin)
- [FramePlugin](api.md#frameplugin)
- [FunctionPlugin](api.md#functionplugin)
- [PagePlugin](api.md#pageplugin)
- [SwitchPlugin](api.md#switchplugin)
- [VariablesPlugin](api.md#variablesplugin)

## Parser Functions

- [ArrayParser](api.md#arrayparser)
- [FrameParser](api.md#frameparser)
- [PageParser](api.md#pageparser)
- [VariablesParser](api.md#variablesparser)

## Other Type aliases

### Action

Ƭ **Action**: [`ArrayAction`](api.md#arrayaction) \| [`PluginParams`](interfaces/PluginParams.md)[keyof [`PluginParams`](interfaces/PluginParams.md)] \| [`ObjectAction`](api.md#objectaction)

type of action

___

### ActionSchema

Ƭ **ActionSchema**: [`ArrayAction`](api.md#arrayaction) \| [`PluginParamsWithName`](interfaces/PluginParamsWithName.md)[keyof [`PluginParamsWithName`](interfaces/PluginParamsWithName.md)] \| { `use`: `string`  } \| { `use`: keyof [`PluginParams`](interfaces/PluginParams.md)  }

___

### ApplyPluginParams

Ƭ **ApplyPluginParams**: { `args?`: `any`[] ; `reassign?`: `boolean`  } & { `name`: keyof `String` \| keyof `any`[] \| keyof `Object` \| keyof `Boolean`  } \| { `name`: `string`  }

param of {@link VariablesApplyPlugin}

___

### ArrayAction

Ƭ **ArrayAction**: [keyof `Page` \| keyof `Frame` \| keyof `Browser`, ...any[]]

array-like action.

use [ArrayParser](api.md#arrayparser) to parse

**`example`**
```json
["goto","https://example.com"]
```

___

### Context

Ƭ **Context**<`T`\>: `Object`

context of parser and plugin

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Action`](api.md#action) |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | `T` | the action of json file with actions, could be [ArrayAction](api.md#arrayaction) or [ObjectAction](api.md#objectaction), also could be customize action |
| `browser?` | `Browser` | puppeteer Browser |
| `frame?` | `Frame` | puppeteer Frame |
| `page?` | `Page` | puppeteer Page |
| `variables?` | [`Variables`](api.md#variables) | variables pool |

___

### DebugOptions

Ƭ **DebugOptions**: `SonicBoomOpts` & { `formatter?`: `string` \| (`opts`: `Partial`<{ `action`: [`ObjectAction`](api.md#objectaction) ; `frame`: `Frame` ; `page`: `Page` ; `step`: `number` ; `time`: `number`  }\>) => `undefined` \| `string`  }

options with SonicBoomOpts

**`see`** https://github.com/pinojs/pino/blob/HEAD/docs/api.md#pino-destination

___

### ObjectAction

Ƭ **ObjectAction**: { `actions?`: [`Action`](api.md#action)[] ; `description?`: `string` ; `frame?`: `string` \| `number` ; `page?`: `number`  } & { `use`: keyof [`PluginParams`](interfaces/PluginParams.md)  } \| { `use`: `string`  }

basic action

**`example`**
```json
{
     "use":"xxx",
     // ...options
}
```

___

### ParserContext

Ƭ **ParserContext**<`T`\>: `Pick`<[`Context`](api.md#context)<`T`\>, ``"variables"`` \| ``"action"``\>

context of parser

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Action`](api.md#action) |

___

### ParserFunction

Ƭ **ParserFunction**: (`actionContext`: [`ParserContext`](api.md#parsercontext)<`any`\>) => [`ObjectAction`](api.md#objectaction) \| `undefined`

#### Type declaration

▸ (`actionContext`): [`ObjectAction`](api.md#objectaction) \| `undefined`

function type of parser

The parser can be used to parse an action.

you can also use plugin to do that, but this is not necessary if the action dose not involve the content of the page.

**`example`**
```js
function myParser({action}){
     if(typeof action === 'number'){
         return {
             "use":"number-plugin"
         }
     }
}

jpptr.options.register.parser.use("my-parser",myParser)
```

and use in actions file
```json
{
     "actions":[
         1
     ]
}
```
will be parsed to
```json
{
     "actions":[
         {
             "use":"number-plugin"
         }
     ]
}
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `actionContext` | [`ParserContext`](api.md#parsercontext)<`any`\> |

##### Returns

[`ObjectAction`](api.md#objectaction) \| `undefined`

___

### PluginFunction

Ƭ **PluginFunction**: (`ctx`: [`Context`](api.md#context)<`any`\>) => [`PluginReturnType`](api.md#pluginreturntype)<[`Action`](api.md#action)\> \| `Promise`<[`PluginReturnType`](api.md#pluginreturntype)<[`Action`](api.md#action)\>\>

#### Type declaration

▸ (`ctx`): [`PluginReturnType`](api.md#pluginreturntype)<[`Action`](api.md#action)\> \| `Promise`<[`PluginReturnType`](api.md#pluginreturntype)<[`Action`](api.md#action)\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`Context`](api.md#context)<`any`\> |

##### Returns

[`PluginReturnType`](api.md#pluginreturntype)<[`Action`](api.md#action)\> \| `Promise`<[`PluginReturnType`](api.md#pluginreturntype)<[`Action`](api.md#action)\>\>

___

### PluginReturnType

Ƭ **PluginReturnType**<`T`\>: `void` \| `undefined` \| `T`[] \| `Partial`<[`Context`](api.md#context)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Action`](api.md#action) |

___

### PuppeteerOptions

Ƭ **PuppeteerOptions**: `LaunchOptions` & `BrowserLaunchArgumentOptions` & `BrowserConnectOptions` & { `extraPrefsFirefox?`: `Record`<`string`, `unknown`\> ; `product?`: `Product`  }

options of puppeteer

**`see`** https://pptr.dev/#?product=Puppeteer&version=v13.0.1&show=api-puppeteerlaunchoptions

___

### SetPluginParams

Ƭ **SetPluginParams**: `Object`

params of {@link VariablesSetPlugin}

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `attribute?` | `Object` | the attributes of the element selected by the element selector |
| `attribute.key` | `string` | key of attributes |
| `attribute.selector` | `string` | element selector |
| `const?` | `any` | constant value |
| `cookie?` | `string` | name of cookie |
| `evaluate?` | `string` | return value of evaluate function |
| `range` | [`number`, `number`, `number`] | range: start, end, step |
| `target?` | ``"page"`` \| ``"frame"`` | execution target |
| `text?` | `string` | the innerText of the element selected by the element selector |
| `url?` | `string` | name of url param |

___

### Variables

Ƭ **Variables**: `Record`<`string`, `any`\>

type of variables pool

___

## Plugin Params Type aliases

### ForPluginParams

Ƭ **ForPluginParams**: [`VariablesPluginParams`](api.md#variablespluginparams) & { `template`: [`Action`](api.md#action)[] \| [`Action`](api.md#action)  }

params of [ForPlugin](api.md#forplugin)

___

### FramePluginParams

Ƭ **FramePluginParams**: [`ObjectAction`](api.md#objectaction) & { `index?`: `number` ; `name?`: `string`  }

params of [FramePlugin](api.md#frameplugin)

___

### FunctionPluginParams

Ƭ **FunctionPluginParams**: [`ObjectAction`](api.md#objectaction) & { `args?`: `any`[] ; `name`: keyof `Page` \| keyof `Frame` \| keyof `Browser` ; `target?`: ``"browser"`` \| ``"page"`` \| ``"frame"`` ; `wait?`: `boolean`  }

params of [FunctionPlugin](api.md#functionplugin)

___

### PagePluginParams

Ƭ **PagePluginParams**: [`ObjectAction`](api.md#objectaction) & { `index?`: `number`  }

params of [PagePlugin](api.md#pageplugin)

___

### SwitchPluginParams

Ƭ **SwitchPluginParams**: [`ObjectAction`](api.md#objectaction) & { `case?`: [`SwitchCase`](interfaces/SwitchCase.md)[] ; `default?`: [`Action`](api.md#action)[] \| [`Action`](api.md#action)  }

params of [SwitchPlugin](api.md#switchplugin)

Iterate over each case-list, until a case is return an actions list

___

### VariablesPluginParams

Ƭ **VariablesPluginParams**: [`ObjectAction`](api.md#objectaction) & { `apply?`: [`ApplyPluginParams`](api.md#applypluginparams) ; `set?`: [`SetPluginParams`](api.md#setpluginparams) ; `var`: `string`  }

params of  [VariablesPlugin](api.md#variablesplugin)

## Plugin Functions

### ForPlugin

▸ **ForPlugin**(`opts`): `Promise`<`undefined` \| `any`[]\>

for-plugin

The variables set in this loop are `local variables`
can only be used in the template actions.

**`example`**
```json
{
     "use":"for",
     "var":"i",
     "set":{"range":[0,10]},
     "template":["type","#password","#{i}"]
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`Context`](api.md#context)<[`ForPluginParams`](api.md#forpluginparams)\> |

#### Returns

`Promise`<`undefined` \| `any`[]\>

___

### FramePlugin

▸ **FramePlugin**(`options`): `undefined` \| { `frame`: `undefined` \| `Frame`  }

a plugin that provides function of switch frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`Context`](api.md#context)<[`FramePluginParams`](api.md#framepluginparams)\> | Context\<[FramePluginParams](api.md#framepluginparams)\> |

#### Returns

`undefined` \| { `frame`: `undefined` \| `Frame`  }

___

### FunctionPlugin

▸ **FunctionPlugin**(`options`): `Promise`<`void`\>

a plugin that provides puppeteer function execution

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`Context`](api.md#context)<[`FunctionPluginParams`](api.md#functionpluginparams)\> | Context\<[FunctionPluginParams](api.md#functionpluginparams)\> |

#### Returns

`Promise`<`void`\>

___

### PagePlugin

▸ **PagePlugin**(`options`): `Promise`<`undefined` \| { `frame`: `Frame` = newFrame; `page`: `Page` = newPage } \| { `frame`: `undefined` = newFrame; `page`: `Page` = newPage }\>

a plugin that provides function of switch page

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`Context`](api.md#context)<[`PagePluginParams`](api.md#pagepluginparams)\> | Context\<[PagePluginParams](api.md#pagepluginparams)\> |

#### Returns

`Promise`<`undefined` \| { `frame`: `Frame` = newFrame; `page`: `Page` = newPage } \| { `frame`: `undefined` = newFrame; `page`: `Page` = newPage }\>

___

### SwitchPlugin

▸ **SwitchPlugin**(`options`): `Promise`<`undefined` \| [`Action`](api.md#action)[]\>

plugin of actions switch

Iterate over each [SwitchCase](interfaces/SwitchCase.md), until a case is return an actions list

**`example`**
```json
{
     "use":"switch",
     "case":[
         {
             //...condition1
             "actions":[...]
         },
         {
             //...condition2
             "actions":[...]
         },
         {
             //...condition3
             "actions":[...]
         },
     ],
     "default":[...]
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`Context`](api.md#context)<[`SwitchPluginParams`](api.md#switchpluginparams)\> | Context\<[SwitchPluginParams](api.md#switchpluginparams)\> |

#### Returns

`Promise`<`undefined` \| [`Action`](api.md#action)[]\>

___

### VariablesPlugin

▸ **VariablesPlugin**(`opts`): `undefined` \| `Promise`<{ `variables`: [`Variables`](api.md#variables)  }\> \| { `variables`: [`Variables`](api.md#variables)  }

A plugin that provides support for variable operation and creation.

**`example`**
```json
{
     "use":"variables",
     "var":"my-name",
     // variables creation, see VariablesPluginParams.set
     "set":{...},
     // variables operation, see VariablesPluginParams.apply
     "apply":{...}
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`Context`](api.md#context)<[`VariablesPluginParams`](api.md#variablespluginparams)\> |

#### Returns

`undefined` \| `Promise`<{ `variables`: [`Variables`](api.md#variables)  }\> \| { `variables`: [`Variables`](api.md#variables)  }

___

## Parser Functions

### ArrayParser

▸ **ArrayParser**(`options`): [`PluginParamsWithName`](interfaces/PluginParamsWithName.md)[``"function"``] \| `undefined`

Array-like action parser

it will parse action which is [ArrayAction](api.md#arrayaction) to object action

**`example`**
```json
["goto", "https://example.com"]
//  will be parsed to
{
    "use": "function",
    "name": "goto",
    "args": ["https://example.com"]
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ParserContext`](api.md#parsercontext)<`any`\> | [Action](api.md#action) |

#### Returns

[`PluginParamsWithName`](interfaces/PluginParamsWithName.md)[``"function"``] \| `undefined`

___

### FrameParser

▸ **FrameParser**(`options`): [`PluginParamsWithName`](interfaces/PluginParamsWithName.md)[``"frame"``] \| `undefined`

syntactic sugar parser of {@link ObjectAction.frame}

**`example`**
```json
{
     "use": "function",
     "name": "goto",
     "args": ["https://example.com"],

     "frame": "test_frame",
     "frame": -1,

     "actions": [["click", "#btn"]]

 }
// will be parsed to
{
     "use": "frame",
     "name": "test_frame",
     "index": -1,

     "actions": [
         {
         "use": "function",
         "name": "goto",
         "args": ["https://example.com"]
         },
         ["click","#btn"]
     ]
 }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ParserContext`](api.md#parsercontext)<`any`\> | [ObjectAction](api.md#objectaction) |

#### Returns

[`PluginParamsWithName`](interfaces/PluginParamsWithName.md)[``"frame"``] \| `undefined`

___

### PageParser

▸ **PageParser**(`options`): [`PluginParamsWithName`](interfaces/PluginParamsWithName.md)[``"page"``] \| `undefined`

syntactic sugar parser of {@link ObjectAction.page}

**`example`**
```json
{
     "use":"function",
     "name":"goto",
     "args":["https://example.com"],
     "page":-1,
     "actions":[["click","#btn"]]
}
// will be parsed to
{
     "use":"page",
     "index":-1,
     "actions":[
         {
             "use":"function",
"name":"goto",
"args":["https://example.com"],
         },
["click","#btn"]
     ]
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ParserContext`](api.md#parsercontext)<`any`\> | [ObjectAction](api.md#objectaction) |

#### Returns

[`PluginParamsWithName`](interfaces/PluginParamsWithName.md)[``"page"``] \| `undefined`

___

### VariablesParser

▸ **VariablesParser**(`options`): `any`

parser of variable placeholder

**`example`**

```json
// 1. set variables in actions file
{
     "variables":{
         "func":"goto",
         "domain":"example.com"
     }
}
// or use variables plugin
{
     "use":"variables",
     "var":"domain",
     "set":{
         "const":"example.com"
     }
}
// 2. and then use in any plugin at any arguments
{
     "use":"function",
     "name":"#{func}",
     "args":["https://#{domain}"]
},
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ParserContext`](api.md#parsercontext)<`any`\> | [ObjectAction](api.md#objectaction) |

#### Returns

`any`
