// @ts-ignore
import LSystem from 'lindenmayer';
import { resettableGenerator } from './pattern-utils';

interface IRules {
  [key: string]: string;
}

interface IOptions {
  axiom: string; // A String or an Array of Objects to set the initial axiom (sometimes called axiom, start or initiator).
  rules: IRules; // key-value Object to set the productions from one symbol to its axiom. Used when calling iterate(). A production can be either a String, Object or a Function.
  finals?: { [key: string]: () => any }; // Optional key-value Object to set functions that should be executed each symbol in sequential order when calling final(). Useful for visualization.
  branchSymbols?: string; // A String of two characters. Only used when working with classic context sensitive productions. The first symbol is treated as start of a branch, the last symbol as end of a branch. (default: "[]", but only when using classic CS syntax)
  ignoredSymbols?: string; // A String of characters to ignore when using context sensitive productions. (default: "+-&^/|\\", but only when using classic CS syntax)
}

export function* Plsys(options: IOptions, repetitions?: number) {
  const { axiom, rules } = options;
  let currentIteration = 0;
  let lsys: LSystem = new LSystem({
    axiom,
    productions: rules,
  });


  while(true) {
    // if we have repetitions and we are at the limit, reset the lsys to loop
    if ((repetitions != null) && (currentIteration % repetitions) === 0)  {
      lsys.setAxiom(axiom);
    }

    let nextState: string = lsys.iterate();

    currentIteration++;
    yield nextState;
  }
};

export default (options: IOptions, repetitions?: number) => resettableGenerator(Plsys)(options, repetitions);
