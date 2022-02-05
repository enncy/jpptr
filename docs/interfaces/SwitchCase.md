# Interface: SwitchCase

params of {@link SwitchPluginParams.case}

if any params return true ,then this plugin will execute this actions

## Properties

### actions

• `Optional` **actions**: [`Action`](../api.md#action)[]

___

### evaluate

• `Optional` **evaluate**: `string`

call the function of {@link Page.evaluate} or {@link Frame.evaluate}.

if return true, then execute the child actions [SwitchCase.actions](SwitchCase.md#actions)

**`example`**
```js
// <body><h1 class="title">hello<h1><h2>world<h2><body>
{
     "use":"switch",
     "case":[
         {
             evaluate:"document.querySelector('.title')?.innerText==='hello'",
             actions:[...]
         }
     ]

}
```

___

### include

• `Optional` **include**: [`ConditionWrapper`](ConditionWrapper.md)

include value in page or frame

___

### match

• `Optional` **match**: [`ConditionWrapper`](ConditionWrapper.md)

match value in page or frame

___

### selector

• `Optional` **selector**: `string`

is element of selector exist

**`example`**
```js
// <body><h1 class="title">hello<h1><h2>world<h2><body>
{
     "use":"switch",
     "case":[
         {
             selector:".title",
             actions:[...]
         }
     ]

}
```

___

### target

• **target**: ``"page"`` \| ``"frame"``

target of operate
