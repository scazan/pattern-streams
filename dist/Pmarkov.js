"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var markovn_1 = require("markovn");
function Pmarkov(seed, order, initialState) {
    var markovChain = new markovn_1.MarkovN(seed, order);
    return markovChain.asPattern(initialState);
}
exports.default = Pmarkov;
;
