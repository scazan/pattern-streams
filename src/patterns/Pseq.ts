import { unwrapValue, resettableGenerator } from './pattern-utils';

export function* Pseq(values: any[], repetitions?: number) {
  let index: number = 0;
  let result = (): any => {
    let nextElement = values[index++ % values.length];
    let value;

    value = unwrapValue(nextElement);

    if (value == null && nextElement.next().done) {
      nextElement.reset();
      nextElement = values[index++ % values.length];

      value = unwrapValue(nextElement);
    }
    else if (value == null) {
      nextElement = values[index++ % values.length];
      value = unwrapValue(nextElement);
    }

    return value;
  };

  if(repetitions == null) {
    while(true) {
      yield result();
    }
  }
  else {
    // repetitions represents the number of times to repeat the entire given sequence
    for(let i=0; i < repetitions; i++) {
      for(let i=0; i < values.length; i++) {
        yield result();
      }
    }
  }
};

export default (values: any[], repetitions?: number) => resettableGenerator(Pseq)(values, repetitions);
