"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSequentialRandomIndex = exports.mod = exports.isEquivalent = exports.normalize = exports.windex = exports.makeFunction = exports.flipCoin = exports.mapToDomain = exports.findInCollection = exports.getClosestMember = exports.getRateFromFrequencies = exports.choose = exports.ftom = exports.mtof = void 0;
var mtof = function (note) { return Math.pow(2, (note) / 12) * 440; };
exports.mtof = mtof;
var ftom = function (note) { return Math.sqrt(note / 440) / 12; };
exports.ftom = ftom;
var choose = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};
exports.choose = choose;
var getRateFromFrequencies = function (freq, baseFreq) {
    return freq / baseFreq;
};
exports.getRateFromFrequencies = getRateFromFrequencies;
var getClosestMember = function (subject, set) {
    return set.reduce(function (accum, member) {
        var prevDistance = accum - subject;
        var currentDistance = member - subject;
        return Math.abs(currentDistance) < Math.abs(prevDistance) ? member : accum;
    }, set[0]);
};
exports.getClosestMember = getClosestMember;
var findInCollection = function (collection, predicateFunction) {
    return collection.reduce(function (accum, member) { return predicateFunction(member) ? member : accum; });
};
exports.findInCollection = findInCollection;
var mapToDomain = function (set, domain) {
    var setOffset = Math.min.apply(Math, domain) - Math.min.apply(Math, set);
    var domainRange = (Math.max.apply(Math, domain) - Math.min.apply(Math, domain));
    var setRange = (Math.max.apply(Math, set) - Math.min.apply(Math, set));
    return set.map(function (member) { return exports.getClosestMember((((member - Math.min.apply(Math, set)) / setRange) * domainRange) + setOffset, domain); });
};
exports.mapToDomain = mapToDomain;
var flipCoin = function (probability) {
    if (probability === void 0) { probability = 0.5; }
    return (Math.random() < probability) ? true : false;
};
exports.flipCoin = flipCoin;
var makeFunction = function (value) {
    if (typeof value === "function") {
        return value;
    }
    else {
        return function () { return value; };
    }
};
exports.makeFunction = makeFunction;
var windex = function (weights) {
    var sumOfWeights = weights.reduce(function (prev, curr) { return prev + curr; });
    var randNum = Math.random() * sumOfWeights;
    var weightSum = 0;
    for (var i = 0; i < weights.length; i++) {
        weightSum += weights[i];
        weightSum = +weightSum.toFixed(2);
        if (randNum <= weightSum) {
            return i;
        }
    }
    // Returning the first member if a proper weight couldn't be found
    return 0;
};
exports.windex = windex;
var normalize = function (coll) {
    var collSum = coll.reduce(function (a, b) { return a + b; });
    return collSum > 0 ? coll.map(function (weight) { return weight / collSum; }) : coll.map(function () { return 0; });
};
exports.normalize = normalize;
var isEquivalent = function (a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    // If we made it this far, objects
    // are considered equivalent
    return true;
};
exports.isEquivalent = isEquivalent;
var mod = function (num, modulo) { return (num % modulo + modulo) % modulo; };
exports.mod = mod;
var getSequentialRandomIndex = function (lastIndex, length) {
    var possibleIndexes = Array(length).fill(0).map(function (item, i) { return i; }).filter(function (item) { return item !== lastIndex; });
    return exports.choose(possibleIndexes);
};
exports.getSequentialRandomIndex = getSequentialRandomIndex;
exports.default = {
    mtof: exports.mtof,
    ftom: exports.ftom,
    choose: exports.choose,
    getRateFromFrequencies: exports.getRateFromFrequencies,
    getClosestMember: exports.getClosestMember,
    findInCollection: exports.findInCollection,
    mapToDomain: exports.mapToDomain,
    flipCoin: exports.flipCoin,
    makeFunction: exports.makeFunction,
    windex: exports.windex,
    normalize: exports.normalize,
    isEquivalent: exports.isEquivalent,
    mod: exports.mod,
    getSequentialRandomIndex: exports.getSequentialRandomIndex,
};
