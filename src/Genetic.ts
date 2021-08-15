import { flipCoin } from "./utils";

class Genetic {
  public population: number[][];
  private goal: number[];
  private scores: number[];
  private lastState: number[];

  constructor(inputPopulation: number[][], goal: number[]) {
    this.population = inputPopulation;
    this.scores = Array(inputPopulation.length).fill(0);
    this.goal = goal;
    this.lastState = inputPopulation[Math.floor( Math.random() * (inputPopulation.length-1)) ];
  }


  // Accumulate and return the score for a single collection
  getTotalFitnessRating(collection: number[], goal: number[]) {
    let score: number = 0; // lower is better
    let normalizedCollection = collection.map((num: number) => num - Math.min.apply(null, collection) );

    for(let i=normalizedCollection.length-1; i >= 0; i--) {
      score += this.getDistance(normalizedCollection[i], goal[i]);
    }

    return score;
  }

  // TODO: test
  // Using the given scores, get the most "fit" two generations out of the population
  getTopTwoGenerations(scores: number[], population: number[][]): number[][] {

    let indexOfHighestScore = 0;

    for(let i=scores.length-1; i>=0; i--) {
      if(scores[indexOfHighestScore] < scores[i]) {
        indexOfHighestScore = i;
      }

      // If there are two of the same scores, choose one randomly
      if(scores[indexOfHighestScore] === scores[i]) {
        const coinFlip = flipCoin(0.5);

        indexOfHighestScore = coinFlip ? indexOfHighestScore : i;
      }
    }

    let indexOfNextHighestScore: number = 0;
    const topGenerationScore: number = scores[indexOfHighestScore];


    const coinFlipForMutate = flipCoin(0.75);

    if(coinFlipForMutate) {
      indexOfNextHighestScore = Math.floor(Math.random() * scores.length);
    }
    else {
      for(let i=scores.length-1; i>=0; i--) {
        // Ignore any scores that are already the highest score
        if(scores[i] !== topGenerationScore) {

          if(scores[indexOfNextHighestScore] < scores[i]) {
            indexOfNextHighestScore = i;
          }

          // If there are two of the same scores, choose one randomly
          if(scores[indexOfNextHighestScore] === scores[i]) {
            const coinFlip = Math.random();

            indexOfNextHighestScore = (coinFlip > 0.5) ? indexOfNextHighestScore : i;
          }
        }
      }
    }

    return [population[indexOfHighestScore], population[indexOfNextHighestScore] ];
  }

  // Take in two arrays (parents) and mate them in a number of different ways to produce multiple offspring
  // TODO: Make more than one type of mating
  mateGenerations(parents: number[][]): number[][] {

    const splicedOffspring = this.getSplicedOffspring(parents[0], parents[1]);
    const interlacedOffspring = this.getInterlacedOffspring(parents[0], parents[1]);

    // Generate more than one offspring
    return [splicedOffspring, interlacedOffspring];
  }

  // Splice two equal-length arrays together and return the result
  getInterlacedOffspring(parentOne: number[], parentTwo: number[]): number[] {
    const interlacedOffspring = Array(parentOne.length);

    for(let i=interlacedOffspring.length-1; i>=0; i--) {
      interlacedOffspring[i] = (i%2) === 0 ? parentOne[i] : parentTwo[i];
    }

    return interlacedOffspring;
  }

  getSplicedOffspring(parentOne: number[], parentTwo: number[]): number[] {
    const coinFlip: number = Math.random() > 0.5 ? 1 : 0;
    const parents = coinFlip == 0 ? [parentOne, parentTwo] : [parentTwo, parentOne];
    const splitPoint: number = Math.floor(parentOne.length / 2);

    const splicedOffspring = [...(parents[0].slice(0, splitPoint)), ...(parents[1].slice(splitPoint-1, parents[1].length-1)) ];

    return splicedOffspring;
  }

  // Returns a numerical distance between an input and a goal
  getDistance(input: number, goal: number) {
    let rating: number = goal - input;

    return rating;
  }





  // Calculate and return the scores for all current collections
  getPopulationScores(population: number[][], goal: number[]): number[] {
    let scores = Array(population.length).fill(0);

    for(let i=(population.length-1); i>=0; i--) {
      scores[i] = this.getTotalFitnessRating(population[i], goal);
    }

    return scores;
  }

  getNextGeneration(population: number[][], goal: number[]) {
    const populationScores:number[] = this.getPopulationScores(population, goal);
    const topTwoGenerations:number[][] = this.getTopTwoGenerations(populationScores, population);
    const newGenerations:number[][] = this.mateGenerations(topTwoGenerations);

    for(let i=0; i < (newGenerations.length-1); i++) {
      this.population.splice(Math.floor(Math.random() * (this.population.length-1)), 1);
    }
    this.population = [...this.population, ...newGenerations];
    // For now randomly select one of the best generations
    const bestFitGeneration = newGenerations[Math.floor(Math.random() * (newGenerations.length * 0.999))];

    return bestFitGeneration;
  }

  getNextState(state: number[]) {
    // TODO: Use state to add into the population

    const nextState: number[] = this.getNextGeneration(this.population, this.goal);

    return nextState;
  }

  asPattern() {
    const self = this;

    return function* asPattern(initialState: number[]) {
      self.lastState = initialState;

      while(true) {
        const nextState = self.getNextState(self.lastState);
        self.lastState = nextState;

        yield nextState;
      }
    };
  }

};

export { Genetic };
