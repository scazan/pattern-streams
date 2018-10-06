export default function* Pseq(values: any[], repetitions?: number){
  var index: number = 0;
  var result = (): any => values[index++ % values.length];

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
