const Markov = require('markovn').default;

export default function Pmarkov(seed: any[], order: number, initialState: any[]) {
  const markovChain = new Markov(seed, order);

  return markovChain.asPattern(initialState);
};
