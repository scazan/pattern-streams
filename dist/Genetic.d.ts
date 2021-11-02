declare class Genetic {
    population: number[][];
    private goal;
    private scores;
    private lastState;
    constructor(inputPopulation: number[][], goal: number[]);
    getTotalFitnessRating(collection: number[], goal: number[]): number;
    getTopTwoGenerations(scores: number[], population: number[][]): number[][];
    mateGenerations(parents: number[][]): number[][];
    getInterlacedOffspring(parentOne: number[], parentTwo: number[]): number[];
    getSplicedOffspring(parentOne: number[], parentTwo: number[]): number[];
    getDistance(input: number, goal: number): number;
    getPopulationScores(population: number[][], goal: number[]): number[];
    getNextGeneration(population: number[][], goal: number[]): number[];
    getNextState(state: number[]): number[];
    asPattern(): (initialState: number[]) => Generator<number[], never, unknown>;
}
export { Genetic };
