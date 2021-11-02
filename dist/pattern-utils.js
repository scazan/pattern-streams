"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resettableGenerator = exports.unwrapValue = void 0;
var unwrapValue = function (value) {
    if (value.hasOwnProperty('next')) {
        return value.next().value;
    }
    if (typeof value === 'function') {
        return value();
    }
    return value;
};
exports.unwrapValue = unwrapValue;
var resettableGenerator = function (f) {
    var proxy = new Proxy(f, {
        apply: function (target, thisArg, argumentsList) {
            var base = target.call.apply(target, __spreadArray([thisArg], argumentsList)), basenext = base.next;
            var generator = base;
            base.next = function next() {
                return generator === base
                    ? basenext.call(base) // generator is the original one
                    : generator.next(); // generator is the reset one
            };
            // define reset to use the original arguments to create
            // a new generator and assign it to the generator variable
            Object.defineProperty(generator, "reset", {
                enumerable: false,
                value: function () {
                    return generator = target.call.apply(target, __spreadArray([thisArg], argumentsList));
                }
            });
            // return the generator, which now has a reset method
            return generator;
        }
    });
    // return proxy which will create a generator with a reset method
    return proxy;
};
exports.resettableGenerator = resettableGenerator;
