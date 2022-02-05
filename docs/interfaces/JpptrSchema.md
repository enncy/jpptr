# Interface: JpptrSchema

json schema of actions file

## Properties

### actions

• `Optional` **actions**: [`ActionSchema`](../api.md#actionschema)[]

json schema of actions

___

### extends

• `Optional` **extends**: `string`

extends file.

you can use this option to merge other action file

which has same options of [JpptrSchema](JpptrSchema.md)

**`example`**

{
     "extends":"./base.config.json"
}

___

### launch

• `Optional` **launch**: [`PuppeteerOptions`](../api.md#puppeteeroptions)

___

### register

• `Optional` **register**: [`ModuleRegisterSchema`](ModuleRegisterSchema.md)

json schema of module register

___

### variables

• `Optional` **variables**: [`Variables`](../api.md#variables)
