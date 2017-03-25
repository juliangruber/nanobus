var assert = require('assert')
var EventEmitter = require('events').EventEmitter

module.exports = Nanobus

function Nanobus () {
  if (!(this instanceof Nanobus)) return new Nanobus()
  this._emitter = new EventEmitter()
}

Nanobus.prototype.emit = function (eventName, data) {
  assert.equal(typeof eventName, 'string', 'nanobus.emit: eventName should be type string')
  this._emitter.emit(eventName, data)
  var listeners = this.listeners('*')
  for (var i = 0; i < listeners.length; i++) {
    listeners[i].call(this._emitter, data)
  }
  return this
}

Nanobus.prototype.on = Nanobus.prototype.addListener = function (eventName, listener) {
  assert.equal(typeof eventName, 'string', 'nanobus.on: eventName should be type string')
  assert.equal(typeof listener, 'function', 'nanobus.on: listener should be type function')
  this._emitter.on(eventName, listener)
  return this
}

Nanobus.prototype.once = function (eventName, listener) {
  assert.equal(typeof eventName, 'string', 'nanobus.once: eventName should be type string')
  assert.equal(typeof listener, 'function', 'nanobus.once: listener should be type function')
  this._emitter.once(eventName, listener)
  return this
}

Nanobus.prototype.removeListener = function (eventName, listener) {
  assert.equal(typeof eventName, 'string', 'nanobus.removeListener: eventName should be type string')
  assert.equal(typeof listener, 'function', 'nanobus.removeListener: listener should be type function')
  this._emitter.removeListener(eventName, listener)
}

Nanobus.prototype.removeAllListeners = function (eventName) {
  if (eventName) {
    this._emitter.removeAllListeners(eventName)
  } else {
    this._emitter.removeAllListeners()
  }
  return this
}

Nanobus.prototype.listeners = function (eventName) {
  return this._emitter.listeners(eventName)
}
