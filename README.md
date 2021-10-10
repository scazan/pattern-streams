# pattern-streams
A collection of patterns for generating streams/sequences inspired by SuperCollider patterns.

### An example with nested patterns
```
// I'm omitting the repetitions on these but they could be passed as the second argument
const sequence = Pseq([Prand([1,2,3]), Pseq([90,91,92, Prand([11,12,13])]), 20]);

let intervalId = setInterval(() => console.log(sequence.next()), 1000);
// to stop: clearInterval(intervalId);
```

### Using the markov chain pattern
```
// the signature of Pmarkov
// Pmarkov(seed: any[], order: number, initialState: any[])

// example
const sequence = Pmarkov([1,2,3,2,4,1,2], 2, [1,2]);

let intervalId = setInterval(() => console.log(sequence.next()), 1000);
// to stop: clearInterval(intervalId);
```

