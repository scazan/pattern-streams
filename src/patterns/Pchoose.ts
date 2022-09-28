import { unwrapValue } from './pattern-utils';
import { getSequentialRandomIndex } from '../utils';

export default function* Pchoose(values: Array<any>, repetitions?: number){
  let lastIndex = 0;

  const result = (): any => {
    const nextIndex = getSequentialRandomIndex(lastIndex, values.length);
    const nextElement = values[nextIndex];

    lastIndex = nextIndex;

    return unwrapValue(nextElement);
  };

  if(repetitions == undefined) {
    while(true) {
      yield result();
    }
  }
  else {
    for(let i=0; i<repetitions; i++) {
      yield result();
    }
  }
};
