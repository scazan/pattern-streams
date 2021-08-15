import { unwrapValue } from './pattern-utils';

export default function* Pseq(values: any[], repetitions?: number){
  let index: number = 0;
  let result = (): any => {
    const nextElement = values[index++ % values.length];

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
