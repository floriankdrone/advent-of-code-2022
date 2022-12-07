import helper from '../helper'

class Buffer {
  buffer: string
  constructor(buffer:string){
    this.buffer = buffer;
  }

  getStartMarker(){
    for (let i = 0; i < this.buffer.length ; i++) {
     if (this.charAreAllDifferent(this.buffer.substring(i, i+14))) {
      console.log("🚀 ~ file: solution.ts:12 ~ Buffer ~ getStartMarker ~ this.buffer.substring(i, i+4))", this.buffer.substring(i, i+14))
      return i+14;
     }
    }return 0;
  }

  charAreAllDifferent(sample:string) : boolean{
    let arr = Array.from(sample);
    let result = false;
    for(let i = 0; !result && i < 14; i++){
      const letter = arr.pop();
      if (letter) {
      console.log(
        "🚀 ~ file: solution.ts:23 ~ Buffer ~ charAreAllDifferent ~ arr",
        arr,
        letter,
        i,
        arr.includes(letter)
      );
      result = arr.includes(letter);
      }
    }
            console.log(
              "🚀 ~ file: solution.ts:23 ~ Buffer ~ charAreAllDifferent ~ letter",
              sample,
              !result
            );
    return !result;
  }
}


async function findSolution(inputs: Array<string>) : Promise<number> {
  console.log('Finding solution');
  return new Buffer(inputs[0]).getStartMarker();
}

async function main() {
  let inputs : Array<string> = [];
  if (helper.shouldUseTestInput()) {
    console.log('using test input')
    inputs = ["mjqjpqmgbljsphdztnvjfqwrcgsmlb"];
  } else {
    inputs = await helper.getInputs();
  }
  const solution = await findSolution(inputs)
  console.log(solution)
}

main()
