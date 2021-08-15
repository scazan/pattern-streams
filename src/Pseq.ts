export default function* Pseq(values: any[], repetitions?: number){
  let index: number = 0;
  let result = (): any => {
    const nextElement = values[index++ % values.length];

    // if we passed in a pattern/generator then we want to call next on it instead to get the value
    if (nextElement.hasOwnProperty('next')) {
      return nextElement.next().value;
    }

    return nextElement;
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
