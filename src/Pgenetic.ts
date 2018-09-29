import { Genetic } from "./Genetic";

export default function* Pgenetic(inputPopulation: number[][], goal: number[]) {
  let genetic: Genetic = new Genetic(inputPopulation, goal);

  let lastState: number[] = goal;

  while(true) {
    let nextState: any = genetic.getNextState(lastState);

    lastState = [lastState[lastState.length-1], nextState];

    yield nextState;
  }
};
