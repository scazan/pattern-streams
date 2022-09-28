import { unwrapValue } from './pattern-utils';

export default function* Prand(values: Array<any>, repetitions?: number){
  const result = (): any => {
    const nextElement = values[Math.floor(Math.random() * values.length)];

    return unwrapValue(nextElement);
  };

  if(repetitions == undefined) {
    while(true) {
      yield result();
    }
  }
  else {
    for(let i=0; i < repetitions; i++) {
      yield result();
    }
  }
};
