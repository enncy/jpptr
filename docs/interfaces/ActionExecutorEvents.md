# Interface: ActionExecutorEvents<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Action`](../api.md#action) |

## Hierarchy

- `WalkerEvents`<`T`\>

  ↳ **`ActionExecutorEvents`**

## Properties

### add

• **add**: [`number`, `T`[]]

#### Inherited from

WalkerEvents.add

___

### append

• **append**: [`number`, `T`[]]

#### Inherited from

WalkerEvents.append

___

### back

• **back**: `number`

#### Inherited from

WalkerEvents.back

___

### executeerror

• **executeerror**: [`Context`](../api.md#context)<`T`\>

___

### executefinish

• **executefinish**: [`Context`](../api.md#context)<`T`\>

___

### executestart

• **executestart**: [`Context`](../api.md#context)<`T`\>

___

### jump

• **jump**: `number`

#### Inherited from

WalkerEvents.jump

___

### parsefinish

• **parsefinish**: [`Context`](../api.md#context)<`T`\>

___

### parsestart

• **parsestart**: [`Context`](../api.md#context)<`T`\>

___

### peek

• **peek**: `T`

#### Inherited from

WalkerEvents.peek

___

### peekall

• **peekall**: `T`[]

#### Inherited from

WalkerEvents.peekall

___

### remove

• **remove**: [`number`, `number`]

#### Inherited from

WalkerEvents.remove

___

### rewalk

• **rewalk**: `number`

#### Inherited from

WalkerEvents.rewalk

___

### start

• **start**: `number`

#### Inherited from

WalkerEvents.start

___

### stop

• **stop**: `number`

#### Inherited from

WalkerEvents.stop

___

### update

• **update**: `number`

#### Inherited from

WalkerEvents.update

___

### walk

• **walk**: `T`

#### Inherited from

WalkerEvents.walk
