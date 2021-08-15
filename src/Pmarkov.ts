import { MarkovN } from 'markovn';

export default function Pmarkov(seed: any[], order: number, initialState: any[]) {
  const markovChain = new MarkovN(seed, order);

  return markovChain.asPattern(initialState);
};
