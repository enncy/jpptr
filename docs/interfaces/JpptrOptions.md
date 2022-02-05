# Interface: JpptrOptions

jpptr options

## Properties

### actions

• `Optional` **actions**: [`Action`](../api.md#action)[]

list of actions

___

### debug

• `Optional` **debug**: `boolean` \| [`DebugOptions`](../api.md#debugoptions)

if `true` use [ora](https://www.npmjs.com/package/ora) to output in console.

set `debug.formatter` to change style of console.

****
and you can use `debug.dest` to customize the path of debug file

**`see`** [DebugOptions](../api.md#debugoptions)

___

### launch

• `Optional` **launch**: [`PuppeteerOptions`](../api.md#puppeteeroptions)

launch options of puppeteer

___

### register

• `Optional` **register**: [`ModuleRegister`](../classes/ModuleRegister.md)

module register

___

### variables

• `Optional` **variables**: [`Variables`](../api.md#variables)

variables pool.

you can set any variable in this.

we will use [VariablesParser](../api.md#variablesparser) to parse.

and you can use placeholder : {@link defaultPlaceholder} to use you variables

**`example`**
```js
"variables":{
     "username":"Jimmy",
     "password":"123456",
}
```
