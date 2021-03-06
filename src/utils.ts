
export const mtof = (note: number): number => Math.pow(2, (note)/12) * 440;

export const ftom = (note: number): number => Math.sqrt(note/440)/12;

export const choose = (array: Array<any>): any => {
    return array[Math.floor(Math.random() * array.length)];
  };

export const getRateFromFrequencies = (freq: number, baseFreq: number): number => {
  return freq/baseFreq;
};

export const getClosestMember = (subject: any, set: any[]) => {
  return set.reduce( (accum, member) => {
    const prevDistance = accum - subject;
    const currentDistance = member - subject;

    return Math.abs( currentDistance ) < Math.abs( prevDistance ) ? member : accum;
  }, set[0]);
};

export const findInCollection = (collection: any[], predicateFunction: Function) => {
  return collection.reduce( (accum, member) => predicateFunction(member) ? member : accum );
};

export const mapToDomain = (set: number[], domain: number[]) => {
  const setOffset = Math.min(...domain) - Math.min(...set);
  const domainRange = ( Math.max(...domain) - Math.min(...domain) );
  const setRange = ( Math.max(...set) - Math.min(...set) );

  return set.map( member => getClosestMember( (( (member - Math.min(...set)) / setRange) * domainRange ) + setOffset, domain));
};

export const flipCoin = (probability=0.5): boolean => (Math.random() < probability) ? true : false;

export const makeFunction = (value: any): Function => {
  if(typeof value === "function") {
    return value;
  }
  else {
    return () => value;
  }
};

export const windex = (weights: number[]): number => {
  let sumOfWeights = weights.reduce( (prev, curr) => prev + curr);

  let randNum = Math.random() * sumOfWeights;
  let weightSum = 0;

  for (let i = 0; i < weights.length; i++) {
    weightSum += weights[i];
    weightSum = +weightSum.toFixed(2);

    if (randNum <= weightSum) {
      return i;
    }
  }

  // Returning the first member if a proper weight couldn't be found
  return 0;
};

export const normalize = (coll: number[]): number[] => {
  let collSum = coll.reduce((a,b) => a+b);
  return collSum > 0 ? coll.map( (weight) => weight / collSum) : coll.map(() => 0);
};

export const isEquivalent = (a: object|any, b: object|any): boolean => {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
};

export const mod = (num: number, modulo: number) => (num % modulo + modulo) % modulo;

export const getSequentialRandomIndex = ( lastIndex: number, length: number ): number => {
  const possibleIndexes = Array(length).fill(0).map( (item,i) => i).filter(item => item !== lastIndex);

  return choose(possibleIndexes);
};


export default {
  mtof,
  ftom,
  choose,
  getRateFromFrequencies,
  getClosestMember,
  findInCollection,
  mapToDomain,
  flipCoin,
  makeFunction,
  windex,
  normalize,
  isEquivalent,
  mod,
  getSequentialRandomIndex,
};
