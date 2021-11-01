
export const unwrapValue = (value: any) => {
  if (value.hasOwnProperty('next')) {
    return value.next().value;
  }

  if (typeof value === 'function') {
    return value();
  }

  return value;
};

export const resettableGenerator = (f: any) => {
  const proxy = new Proxy(f,{
    apply(target, thisArg, argumentsList) {
      const base = target.call(thisArg, ...argumentsList),
       basenext = base.next;
      let generator = base;
      base.next = function next() {
       return generator===base
         ? basenext.call(base) // generator is the original one
         : generator.next(); // generator is the reset one
      }
      // define reset to use the original arguments to create
      // a new generator and assign it to the generator variable
      Object.defineProperty(generator,"reset",{
        enumerable:false,
        value: () => 
          generator =  target.call(thisArg, ...argumentsList)
      });
      // return the generator, which now has a reset method
      return generator;
    }
  });
  // return proxy which will create a generator with a reset method
  return proxy;
};
