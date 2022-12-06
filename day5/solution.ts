import helper from '../helper'

class Stack {
  crates : Crate[]
  constructor(crates : Crate[]){
    this.crates = crates;
  }

  getTopCrate() {
    return this.crates[this.crates.length-1]
  }

  addCrate(crate: Crate) {
    this.crates.push(crate);
  }

  addCrates(crates: Crate[]){
    this.crates.push(...crates);
  }

  popCrate() {
    return this.crates.pop();
  }
}

class Crate {
  letter : string
  constructor(letter: string) {
    this.letter = letter;
  }

  getLetter() {
    return this.letter;
  }
}

class Crane {
  stacks: Stack[]
  constructor(stacks: Stack[]){
    this.stacks = stacks;
  }
  moveCrates(numberOfCrates: number,from:number,to:number) {
    const fromStack = this.stacks[from];
    const toStack = this.stacks[to];
    for(let i = 0; i < numberOfCrates; i++) {
      const crate = fromStack.popCrate();
      if (crate) toStack.addCrate(crate);
    }
  }
  getTop() {
    return this.stacks.reduce((acc,stack) => `${acc}${stack.getTopCrate().getLetter()}`, '');
  }
}

class Crane2 extends Crane {
  moveCrates(numberOfCrates: number,from:number,to:number) {
    const fromStack = this.stacks[from];
    const toStack = this.stacks[to];
    const tmpArray : Crate[] = [];
    for(let i = 0; i < numberOfCrates; i++) {
      const crate = fromStack.popCrate();
      if (crate) tmpArray.unshift(crate);
    }
    toStack.addCrates(tmpArray);
  }
}

async function findSolution(inputs: Array<string>) : Promise<string> {
  console.log('Finding solution');
  const crane1 = new Crane2([
    new Stack([new Crate("Z"), new Crate("N")]),
    new Stack([
      new Crate("M"),
      new Crate("C"),
      new Crate("D"),
    ]),
    new Stack([new Crate("P")]),
  ]);

  const crane = new Crane2([
    new Stack([new Crate("N"), new Crate("R"), new Crate("G"), new Crate("P")]),
    new Stack([
      new Crate("J"),
      new Crate("T"),
      new Crate("B"),
      new Crate("L"),
      new Crate("F"),
      new Crate("G"),
      new Crate("D"),
      new Crate("C"),
    ]),
    new Stack([new Crate("M"), new Crate("S"), new Crate("V")]),
    new Stack([
      new Crate("L"),
      new Crate("S"),
      new Crate("R"),
      new Crate("C"),
      new Crate("Z"),
      new Crate("P"),
    ]),
    new Stack([
      new Crate("P"),
      new Crate("S"),
      new Crate("L"),
      new Crate("V"),
      new Crate("C"),
      new Crate("W"),
      new Crate("D"),
      new Crate("Q"),
    ]),
    new Stack([
      new Crate("C"),
      new Crate("T"),
      new Crate("N"),
      new Crate("W"),
      new Crate("D"),
      new Crate("M"),
      new Crate("S"),
    ]),
    new Stack([
      new Crate("H"),
      new Crate("D"),
      new Crate("G"),
      new Crate("W"),
      new Crate("P"),
    ]),
    new Stack([
      new Crate("Z"),
      new Crate("L"),
      new Crate("P"),
      new Crate("H"),
      new Crate("S"),
      new Crate("C"),
      new Crate("M"),
      new Crate("V"),
    ]),
    new Stack([
      new Crate("R"),
      new Crate("P"),
      new Crate("F"),
      new Crate("L"),
      new Crate("W"),
      new Crate("G"),
      new Crate("Z"),
    ]),
  ]);
  for(let i = 0; i  < inputs.length; i++) {
     if (inputs[i].startsWith("move")){
      const r = inputs[i].match(/move (\d+) from (\d+) to (\d+)/);
      if (r) {
        crane.moveCrates(
          parseInt(r[1], 10),
          parseInt(r[2], 10) - 1,
          parseInt(r[3], 10) - 1
        );
      }
     }
  }
  return crane.getTop();
}

async function main() {
  let inputs : Array<string> = [];
  if (helper.shouldUseTestInput()) {
    console.log('using test input')
    inputs = [
      'move 1 from 2 to 1',
      'move 3 from 1 to 3',
      'move 2 from 2 to 1',
      'move 1 from 1 to 2',
    ];
  } else {
    inputs = await helper.getInputs();
  }
  const solution = await findSolution(inputs)
  console.log(solution)
}

main()
