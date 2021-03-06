# nanobus [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Tiny message bus.

## Usage
```js
var nanobus = require('nanobus')
var bus = nanobus()

bus.on('foo', function (color) {
  console.log('color is', color)
})

bus.emit('foo', 'blue')
```

## FAQ
### Why not use the Node API?
We had the requirement for a `*` event to catch all calls, and figured we could
improve the file size at the same time. This library is about 1/3rd the size of
Node's version. And it was easy to build, so yeah good enough of an excuse hah.

### How do I listen for replies?
You can do this by using the `.once()` listener and establishing a convention
around naming schemas.

```js
bus.on('foo', function (color) {
  console.log('foo called')
  bus.emit('foo:res')
})

bus.once('foo:res', function () {
  console.log('response received')
})
bus.emit('foo')
```

### When shouldn't I use this package?
If you're only writing code that runs inside Node and don't need a `'*'`
listener, consider using the built-in event emitter API instead.

### Are the emitters asynchronous?
No. If you're interested in doing that, use something like
[nanotick](https://github.com/yoshuawuyts/nanotick) to batch events and ensure
they run asynchronously.

## API
### `bus = nanobus()`
Create a new `nanobus` instance

### `bus.emit(eventName, [data])`
Emit an event. Arbitrary data can optionally be passed as an argument.

### `bus.on(eventName, listener([data]))`
Listen to an event.

### `bus.addListener(eventName, listener(eventName, [data]))`
Listen to an event.

### `bus.on('*', listener(eventName, [data]))`
Listen to `'*'` if you want to subscribe to all events.

### `bus.addListener('*', listener(eventName, [data]))`
Listen to `'*'` if you want to subscribe to all events.

### `bus.once(eventName, listener([data]))`
Listen to an event, and clear it after it's been called once.

### `bus.once('*', listener(eventName, [data]))`
Listen to `'*'` if you want to subscribe to all events.

### `bus.removeListener(eventName, listener)`
Remove a specific listener to an event.

### `listeners = bus.listeners(eventName)`
Return all listeners for a given event

### `bus.removeAllListeners([eventName])`
Remove all listeners to an event. If no event name is passed, removes all
listeners on the message bus.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/nanobus.svg?style=flat-square
[3]: https://npmjs.org/package/nanobus
[4]: https://img.shields.io/travis/yoshuawuyts/nanobus/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/nanobus
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/nanobus/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/nanobus
[8]: http://img.shields.io/npm/dm/nanobus.svg?style=flat-square
[9]: https://npmjs.org/package/nanobus
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
