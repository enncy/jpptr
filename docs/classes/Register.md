# Class: Register<T, M\>

## Type parameters

| Name |
| :------ |
| `T` |
| `M` |

## Constructors

### constructor

• **new Register**<`T`, `M`\>()

#### Type parameters

| Name |
| :------ |
| `T` |
| `M` |

## Properties

### items

• `Private` **items**: `Map`<`T`, `M`\>

## Methods

### clear

▸ **clear**(): [`Register`](Register.md)<`T`, `M`\>

#### Returns

[`Register`](Register.md)<`T`, `M`\>

___

### entries

▸ **entries**(): [`T`, `M`][]

#### Returns

[`T`, `M`][]

___

### get

▸ **get**(`name`): `undefined` \| `M`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `T` |

#### Returns

`undefined` \| `M`

___

### keys

▸ **keys**(): `T`[]

#### Returns

`T`[]

___

### remove

▸ **remove**(`name`): [`Register`](Register.md)<`T`, `M`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `T` |

#### Returns

[`Register`](Register.md)<`T`, `M`\>

___

### toString

▸ **toString**(): [`T`, `M`][]

#### Returns

[`T`, `M`][]

___

### use

▸ **use**(`name`, `item`): [`Register`](Register.md)<`T`, `M`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `T` |
| `item` | `M` |

#### Returns

[`Register`](Register.md)<`T`, `M`\>

___

### useAll

▸ **useAll**(`items`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `IterableIterator`<[`T`, `M`]\> \| [`T`, `M`][] |

#### Returns

`void`

___

### values

▸ **values**(): `M`[]

#### Returns

`M`[]
