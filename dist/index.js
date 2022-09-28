"use strict";
/*
 * Basic collection of Patterns using generators
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.Pgenetic = exports.Pmarkov = exports.Pchoose = exports.Prand = exports.Pseq = exports.Pattern = void 0;
var Pattern = function (pattern) { return [function () { return pattern.next().value; }]; };
exports.Pattern = Pattern;
var Pseq_1 = require("./patterns/Pseq");
Object.defineProperty(exports, "Pseq", { enumerable: true, get: function () { return __importDefault(Pseq_1).default; } });
var Prand_1 = require("./patterns/Prand");
Object.defineProperty(exports, "Prand", { enumerable: true, get: function () { return __importDefault(Prand_1).default; } });
var Pchoose_1 = require("./patterns/Pchoose");
Object.defineProperty(exports, "Pchoose", { enumerable: true, get: function () { return __importDefault(Pchoose_1).default; } });
var Pmarkov_1 = require("./patterns/Pmarkov");
Object.defineProperty(exports, "Pmarkov", { enumerable: true, get: function () { return __importDefault(Pmarkov_1).default; } });
var Pgenetic_1 = require("./patterns/Pgenetic");
Object.defineProperty(exports, "Pgenetic", { enumerable: true, get: function () { return __importDefault(Pgenetic_1).default; } });
var utils_1 = require("./utils");
Object.defineProperty(exports, "utils", { enumerable: true, get: function () { return __importDefault(utils_1).default; } });
// export { default as TempoClock } from 'TempoClock';
// export type Pattern = typeof Pseq | typeof Prand | typeof Pchoose | typeof Pmarkov | typeof Pgenetic;
