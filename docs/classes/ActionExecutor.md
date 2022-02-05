# Class: ActionExecutor<T\>

executor of action

**`see`** Walker

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Action`](../api.md#action) |

## Hierarchy

- [`Walker`](Walker.md)<[`Context`](../api.md#context)<`T`\>\>

  ↳ **`ActionExecutor`**

## Constructors

### constructor

• **new ActionExecutor**<`T`\>(`options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Action`](../api.md#action) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`ActionExecutorOptions`](../interfaces/ActionExecutorOptions.md)<`T`\> |

#### Overrides

[Walker](Walker.md).[constructor](Walker.md#constructor)

## Properties

### \_step

• `Protected` **\_step**: `number` = `0`

walk step index

#### Inherited from

[Walker](Walker.md).[_step](Walker.md#_step)

___

### currentContext

• `Private` `Optional` **currentContext**: [`Context`](../api.md#context)<`T`\>

___

### parser

• **parser**: [`Parser`](Parser.md)

___

### register

• **register**: [`ModuleRegister`](ModuleRegister.md)

___

### variables

• **variables**: [`Variables`](../api.md#variables)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](Walker.md#capturerejectionsymbol)

#### Inherited from

[Walker](Walker.md).[captureRejectionSymbol](Walker.md#capturerejectionsymbol)

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

[Walker](Walker.md).[captureRejections](Walker.md#capturerejections)

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

[Walker](Walker.md).[defaultMaxListeners](Walker.md#defaultmaxlisteners)

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](Walker.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

#### Inherited from

[Walker](Walker.md).[errorMonitor](Walker.md#errormonitor)

## Accessors

### step

• `get` **step**(): `number`

#### Returns

`number`

#### Inherited from

Walker.step

• `set` **step**(`s`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `number` |

#### Returns

`void`

#### Inherited from

Walker.step

## Methods

### add

▸ **add**(...`actions`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

add data at next

#### Parameters

| Name | Type |
| :------ | :------ |
| `...actions` | [`Context`](../api.md#context)<`T`\>[] |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[add](Walker.md#add)

___

### addActions

▸ **addActions**(`actions`, `ctx?`): `void`

add actions

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | `any`[] |
| `ctx?` | `Omit`<[`Context`](../api.md#context)<`T`\>, ``"action"``\> |

#### Returns

`void`

___

### addAt

▸ **addAt**(`step`, ...`actions`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

add data at some step

#### Parameters

| Name | Type |
| :------ | :------ |
| `step` | `number` |
| `...actions` | [`Context`](../api.md#context)<`T`\>[] |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[addAt](Walker.md#addat)

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

Alias for `emitter.on(eventName, listener)`.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[addListener](Walker.md#addlistener)

___

### append

▸ **append**(...`actions`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

add data at tail

#### Parameters

| Name | Type |
| :------ | :------ |
| `...actions` | [`Context`](../api.md#context)<`T`\>[] |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[append](Walker.md#append)

___

### back

▸ **back**(): [`ActionExecutor`](ActionExecutor.md)<`T`\>

let step minus 1

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[back](Walker.md#back)

___

### context

▸ **context**(): `undefined` \| [`Context`](../api.md#context)<`T`\>

#### Returns

`undefined` \| [`Context`](../api.md#context)<`T`\>

current [Context](../api.md#context)

___

### ctx

▸ **ctx**(): `undefined` \| [`Context`](../api.md#context)<`T`\>

same as function [context](ActionExecutor.md#context)

#### Returns

`undefined` \| [`Context`](../api.md#context)<`T`\>

___

### emit

▸ **emit**<`E`\>(`event`, `value`, ...`args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof [`ActionExecutorEvents`](../interfaces/ActionExecutorEvents.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `value` | [`ActionExecutorEvents`](../interfaces/ActionExecutorEvents.md)<`T`\>[`E`] |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Overrides

[Walker](Walker.md).[emit](Walker.md#emit)

___

### end

▸ **end**(): `boolean`

is walk end

#### Returns

`boolean`

#### Inherited from

[Walker](Walker.md).[end](Walker.md#end)

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`since`** v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[Walker](Walker.md).[eventNames](Walker.md#eventnames)

___

### execute

▸ **execute**(): `Promise`<`void`\>

execute the plugin and call `walk()` to increase the number of action steps,

and resolve child actions

**`example`**
```ts

;(async ()=>{

const jpptr = Jpptr.from("./test.json")

const executor = await jpptr.createExecutor({
     // cover all the actions
     actions:[{"user":"function","name":"goto","args":["https://example.com"]}]
})

await executor.execute() // goto https://example.com

})()

```

#### Returns

`Promise`<`void`\>

___

### executeAll

▸ **executeAll**(): `Promise`<`void`\>

execute all the actions

```ts
while (!executor.end()) {
     await executor.execute();
}
```

**`see`** end

**`see`** execute

#### Returns

`Promise`<`void`\>

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](ActionExecutor.md#defaultmaxlisteners).

**`since`** v1.0.0

#### Returns

`number`

#### Inherited from

[Walker](Walker.md).[getMaxListeners](Walker.md#getmaxlisteners)

___

### isStop

▸ **isStop**(): `boolean`

is walk stop

#### Returns

`boolean`

#### Inherited from

[Walker](Walker.md).[isStop](Walker.md#isstop)

___

### jump

▸ **jump**(`step`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

jump to some step

#### Parameters

| Name | Type |
| :------ | :------ |
| `step` | `number` |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[jump](Walker.md#jump)

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`since`** v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

[Walker](Walker.md).[listenerCount](Walker.md#listenercount)

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[Walker](Walker.md).[listeners](Walker.md#listeners)

___

### off

▸ **off**<`E`\>(`event`, `handler`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

Alias for `emitter.removeListener()`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof [`ActionExecutorEvents`](../interfaces/ActionExecutorEvents.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `handler` | (`value`: [`ActionExecutorEvents`](../interfaces/ActionExecutorEvents.md)<`T`\>[`E`], ...`args`: `any`[]) => `void` |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Overrides

[Walker](Walker.md).[off](Walker.md#off)

___

### on

▸ **on**<`E`\>(`event`, `handler`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof [`ActionExecutorEvents`](../interfaces/ActionExecutorEvents.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `handler` | (`value`: [`ActionExecutorEvents`](../interfaces/ActionExecutorEvents.md)<`T`\>[`E`], ...`args`: `any`[]) => `void` |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Overrides

[Walker](Walker.md).[on](Walker.md#on)

___

### once

▸ **once**<`E`\>(`event`, `handler`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof [`ActionExecutorEvents`](../interfaces/ActionExecutorEvents.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `handler` | (`value`: [`ActionExecutorEvents`](../interfaces/ActionExecutorEvents.md)<`T`\>[`E`], ...`args`: `any`[]) => `void` |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Overrides

[Walker](Walker.md).[once](Walker.md#once)

___

### peek

▸ **peek**(`step?`): `undefined` \| [`Context`](../api.md#context)<`T`\>

get the data of a step, but do not update the step

#### Parameters

| Name | Type |
| :------ | :------ |
| `step?` | `number` |

#### Returns

`undefined` \| [`Context`](../api.md#context)<`T`\>

#### Inherited from

[Walker](Walker.md).[peek](Walker.md#peek)

___

### peekAll

▸ **peekAll**(): [`Context`](../api.md#context)<`T`\>[]

get all the data of a step, but do not update the step

#### Returns

[`Context`](../api.md#context)<`T`\>[]

#### Inherited from

[Walker](Walker.md).[peekAll](Walker.md#peekall)

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[prependListener](Walker.md#prependlistener)

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[prependOnceListener](Walker.md#prependoncelistener)

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

**`since`** v9.4.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[Walker](Walker.md).[rawListeners](Walker.md#rawlisteners)

___

### reWalk

▸ **reWalk**(): [`ActionExecutor`](ActionExecutor.md)<`T`\>

make the step 0

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[reWalk](Walker.md#rewalk)

___

### remove

▸ **remove**(`count?`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

remove current data and return

#### Parameters

| Name | Type |
| :------ | :------ |
| `count?` | `number` |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[remove](Walker.md#remove)

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[removeAllListeners](Walker.md#removealllisteners)

___

### removeAt

▸ **removeAt**(`index`, `count?`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

remove data at some step and return

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `count?` | `number` |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[removeAt](Walker.md#removeat)

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and_before_ the last listener finishes execution will
not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[removeListener](Walker.md#removelistener)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`ActionExecutor`](ActionExecutor.md)<`T`\>

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[setMaxListeners](Walker.md#setmaxlisteners)

___

### start

▸ **start**(): [`ActionExecutor`](ActionExecutor.md)<`T`\>

make stop false

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[start](Walker.md#start)

___

### stop

▸ **stop**(): [`ActionExecutor`](ActionExecutor.md)<`T`\>

stop walking

let all walk function waiting until method `walker.start()` is called

#### Returns

[`ActionExecutor`](ActionExecutor.md)<`T`\>

#### Inherited from

[Walker](Walker.md).[stop](Walker.md#stop)

___

### walk

▸ **walk**(): `undefined` \| [`Context`](../api.md#context)<`T`\> \| `Promise`<`undefined` \| [`Context`](../api.md#context)<`T`\>\>

fetch data in list, also let the step plus 1.

if your data is promise function, use `await` to wait.

#### Returns

`undefined` \| [`Context`](../api.md#context)<`T`\> \| `Promise`<`undefined` \| [`Context`](../api.md#context)<`T`\>\>

#### Inherited from

[Walker](Walker.md).[walk](Walker.md#walk)

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
const { getEventListeners, EventEmitter } = require('events');

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  getEventListeners(ee, 'foo'); // [listener]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  getEventListeners(et, 'foo'); // [listener]
}
```

**`since`** v15.2.0, v14.17.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| `DOMEventTarget` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[Walker](Walker.md).[getEventListeners](Walker.md#geteventlisteners)

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
const { EventEmitter, listenerCount } = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

**`since`** v0.9.12

**`deprecated`** Since v3.2.0 - Use `listenerCount` instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

#### Inherited from

[Walker](Walker.md).[listenerCount](Walker.md#listenercount)

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

```js
const { on, EventEmitter } = require('events');

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo')) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
const { on, EventEmitter } = require('events');
const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

**`since`** v13.6.0, v12.16.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`<`any`\>

that iterates `eventName` events emitted by the `emitter`

#### Inherited from

[Walker](Walker.md).[on](Walker.md#on)

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
const { once, EventEmitter } = require('events');

async function run() {
  const ee = new EventEmitter();

  process.nextTick(() => {
    ee.emit('myevent', 42);
  });

  const [value] = await once(ee, 'myevent');
  console.log(value);

  const err = new Error('kaboom');
  process.nextTick(() => {
    ee.emit('error', err);
  });

  try {
    await once(ee, 'myevent');
  } catch (err) {
    console.log('error happened', err);
  }
}

run();
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.log('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

**`since`** v11.13.0, v10.16.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `NodeEventTarget` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

[Walker](Walker.md).[once](Walker.md#once)

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `DOMEventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

[Walker](Walker.md).[once](Walker.md#once)
