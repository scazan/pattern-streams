"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genetic = void 0;
var utils_1 = require("./utils");
var Genetic = /** @class */ (function () {
    function Genetic(inputPopulation, goal) {
        this.population = inputPopulation;
        this.scores = Array(inputPopulation.length).fill(0);
        this.goal = goal;
        this.lastState = inputPopulation[Math.floor(Math.random() * (inputPopulation.length - 1))];
    }
    // Accumulate and return the score for a single collection
    Genetic.prototype.getTotalFitnessRating = function (collection, goal) {
        var score = 0; // lower is better
        var normalizedCollection = collection.map(function (num) { return num - Math.min.apply(null, collection); });
        for (var i = normalizedCollection.length - 1; i >= 0; i--) {
            score += this.getDistance(normalizedCollection[i], goal[i]);
        }
        return score;
    };
    // TODO: test
    // Using the given scores, get the most "fit" two generations out of the population
    Genetic.prototype.getTopTwoGenerations = function (scores, population) {
        var indexOfHighestScore = 0;
        for (var i = scores.length - 1; i >= 0; i--) {
            if (scores[indexOfHighestScore] < scores[i]) {
                indexOfHighestScore = i;
            }
            // If there are two of the same scores, choose one randomly
            if (scores[indexOfHighestScore] === scores[i]) {
                var coinFlip = (0, utils_1.flipCoin)(0.5);
                indexOfHighestScore = coinFlip ? indexOfHighestScore : i;
            }
        }
        var indexOfNextHighestScore = 0;
        var topGenerationScore = scores[indexOfHighestScore];
        var coinFlipForMutate = (0, utils_1.flipCoin)(0.75);
        if (coinFlipForMutate) {
            indexOfNextHighestScore = Math.floor(Math.random() * scores.length);
        }
        else {
            for (var i = scores.length - 1; i >= 0; i--) {
                // Ignore any scores that are already the highest score
                if (scores[i] !== topGenerationScore) {
                    if (scores[indexOfNextHighestScore] < scores[i]) {
                        indexOfNextHighestScore = i;
                    }
                    // If there are two of the same scores, choose one randomly
                    if (scores[indexOfNextHighestScore] === scores[i]) {
                        var coinFlip = Math.random();
                        indexOfNextHighestScore = (coinFlip > 0.5) ? indexOfNextHighestScore : i;
                    }
                }
            }
        }
        return [population[indexOfHighestScore], population[indexOfNextHighestScore]];
    };
    // Take in two arrays (parents) and mate them in a number of different ways to produce multiple offspring
    // TODO: Make more than one type of mating
    Genetic.prototype.mateGenerations = function (parents) {
        var splicedOffspring = this.getSplicedOffspring(parents[0], parents[1]);
        var interlacedOffspring = this.getInterlacedOffspring(parents[0], parents[1]);
        // Generate more than one offspring
        return [splicedOffspring, interlacedOffspring];
    };
    // Splice two equal-length arrays together and return the result
    Genetic.prototype.getInterlacedOffspring = function (parentOne, parentTwo) {
        var interlacedOffspring = Array(parentOne.length);
        for (var i = interlacedOffspring.length - 1; i >= 0; i--) {
            interlacedOffspring[i] = (i % 2) === 0 ? parentOne[i] : parentTwo[i];
        }
        return interlacedOffspring;
    };
    Genetic.prototype.getSplicedOffspring = function (parentOne, parentTwo) {
        var coinFlip = Math.random() > 0.5 ? 1 : 0;
        var parents = coinFlip == 0 ? [parentOne, parentTwo] : [parentTwo, parentOne];
        var splitPoint = Math.floor(parentOne.length / 2);
        var splicedOffspring = __spreadArray(__spreadArray([], (parents[0].slice(0, splitPoint)), true), (parents[1].slice(splitPoint - 1, parents[1].length - 1)), true);
        return splicedOffspring;
    };
    // Returns a numerical distance between an input and a goal
    Genetic.prototype.getDistance = function (input, goal) {
        var rating = goal - input;
        return rating;
    };
    // Calculate and return the scores for all current collections
    Genetic.prototype.getPopulationScores = function (population, goal) {
        var scores = Array(population.length).fill(0);
        for (var i = (population.length - 1); i >= 0; i--) {
            scores[i] = this.getTotalFitnessRating(population[i], goal);
        }
        return scores;
    };
    Genetic.prototype.getNextGeneration = function (population, goal) {
        var populationScores = this.getPopulationScores(population, goal);
        var topTwoGenerations = this.getTopTwoGenerations(populationScores, population);
        var newGenerations = this.mateGenerations(topTwoGenerations);
        for (var i = 0; i < (newGenerations.length - 1); i++) {
            this.population.splice(Math.floor(Math.random() * (this.population.length - 1)), 1);
        }
        this.population = __spreadArray(__spreadArray([], this.population, true), newGenerations, true);
        // For now randomly select one of the best generations
        var bestFitGeneration = newGenerations[Math.floor(Math.random() * (newGenerations.length * 0.999))];
        return bestFitGeneration;
    };
    Genetic.prototype.getNextState = function (state) {
        // TODO: Use state to add into the population
        var nextState = this.getNextGeneration(this.population, this.goal);
        return nextState;
    };
    Genetic.prototype.asPattern = function () {
        var self = this;
        return function asPattern(initialState) {
            var nextState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self.lastState = initialState;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 3];
                        nextState = self.getNextState(self.lastState);
                        self.lastState = nextState;
                        return [4 /*yield*/, nextState];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        };
    };
    return Genetic;
}());
exports.Genetic = Genetic;
;
