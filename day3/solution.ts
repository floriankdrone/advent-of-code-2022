import helper from "../helper";

class Rucksack {
  items: Array<string>;
  firstCompartiment: Array<string>;
  secondCompartiment: Array<string>;

  constructor(itemList: Array<string>) {
    this.items = itemList;
    this.firstCompartiment = this.items.slice(0, this.items.length / 2);
    this.secondCompartiment = this.items.slice(this.items.length / 2);
  }

  includes(letter: string): boolean {
    return this.items.includes(letter);
  }

  getItems(): Array<string> {
    return this.items;
  }

  containedInBothCompartiment(): Set<string> {
    return this.firstCompartiment.reduce(
      (acc: Set<string>, letter: string): Set<string> => {
        if (this.secondCompartiment.includes(letter)) {
          acc.add(letter);
        }
        return acc;
      },
      new Set([])
    );
  }

  calcPriority(letters: Set<string>): number {
    let prioritySum = 0;
    letters.forEach((letter) => {
      prioritySum += new Letter(letter).getPriority();
      console.log(
        "🚀 ~ file: solution.ts:27 ~ Rucksack ~ letters.forEach ~ new Letter(letter).getPriority();",
        letter,
        new Letter(letter).getPriority()
      );
    });
    return prioritySum;
  }
}

class Letter {
    letter:string
    constructor(letter : string) {
        if (letter.length !== 1) throw new Error(`Bad letter "${letter}"`)
        this.letter = letter;
    }
    getPriority() : number {
        if (this.isUpperCase()){
            return this.letter.toLowerCase().charCodeAt(0) - 96 + 26;
        }
        return this.letter.charCodeAt(0) - 96
    }
    isUpperCase() : boolean {
return this.letter === this.letter.toUpperCase()
    }
}

class Group {
  first: Rucksack;
  second: Rucksack;
  third: Rucksack;
  constructor(first: Rucksack, second: Rucksack, third: Rucksack) {
    this.first = first;
    this.second = second;
    this.third = third;
  }
  findBadge() : string | undefined{
    return this.first.getItems().find((letter) :boolean => {
        return this.second.includes(letter) && this.third.includes(letter);
    	})
  }
}

async function findSolution(inputs: Array<string>): Promise<number> {
  console.log("Finding solution");
  let result = 0;
  for (let i = 0; i < inputs.length; i+=3) {
     if (inputs[i] === "") continue;
    const group = new Group(
      new Rucksack(inputs[i].split("")),
      new Rucksack(inputs[i+1].split("")),
      new Rucksack(inputs[i+2].split(""))
    );
    const badge = group.findBadge() || '';
    result += new Letter(badge).getPriority();
  }
  return result;
}

async function main() {
  let inputs: Array<string> = [];
  if (helper.shouldUseTestInput()) {
    console.log("using test input");
    inputs = [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw"
    ];
  } else {
    inputs = await helper.getInputs();
  }
  const solution = await findSolution(inputs);
  console.log(solution);
}

main();
