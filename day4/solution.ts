import helper from '../helper'

class Assignement {
  first: Range;
  second: Range;
  constructor(first:string,second:string) {
    const [firstStart, firstEnd] = first.split('-');
    const [secondStart, secondEnd] = second.split("-");
    this.first = new Range(firstStart, firstEnd);
    this.second = new Range(secondStart, secondEnd);
  }
  fullyContains(){
    return this.first.fullyContains(this.second) || this.second.fullyContains(this.first);
  }
  overlaps() {
    return this.first.overlaps(this.second);
  }
}

class Range {
  start: number;
  end: number;
  constructor(start: string, end: string) {
    this.start = parseInt(start,10);
    this.end = parseInt(end, 10);
  }
  fullyContains(other : Range) {
    return this.start <= other.start && this.end >= other.end;
  }
  overlaps(other: Range) {
    if (this.start < other.start) return this.end >= other.start;
    else if (this.start >= other.start) return this.start <= other.end;
  }
}

async function findSolution(inputs: Array<string>) : Promise<number> {
  console.log('Finding solution');
  let count : number = 0;
  for(let i = 0; i < inputs.length; i++) {
     if (inputs[i] === "") continue;
     const ranges = inputs[i].split(",");
     // console.log("🚀 ~ file: solution.ts:35 ~ findSolution ~ ranges", ranges)
     const assignment = new Assignement(ranges[0],ranges[1]);
     if (assignment.overlaps()){
     // console.log(
     // "🚀 ~ file: solution.ts:36 ~ findSolution ~ assignment",
     // assignment
     // );
     count += 1;
     }
    }
  return count;
}

async function main() {
  let inputs : Array<string> = [];
  if (helper.shouldUseTestInput()) {
    console.log('using test input')
    inputs = [
      '2-4,6-8',
      '2-3,4-5',
      '5-7,7-9',
      '2-8,3-7',
      '6-6,4-6',
      '2-6,4-8'
    ];
  } else {
    inputs = await helper.getInputs();
  }
  const solution = await findSolution(inputs)
  console.log(solution)
}

main()
