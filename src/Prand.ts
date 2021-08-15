export default function* Prand(values: Array<any>, repetitions?: number){
  var result = (): any => values[Math.floor(Math.random() * values.length)];

  if(repetitions == undefined) {
    while(true) {
      yield result();
    }
  }
  else {
    for(var i=0; i<repetitions; i++) {
      yield result();
    }
  }
};
