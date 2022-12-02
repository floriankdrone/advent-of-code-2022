import helper from "../helper";

const OUTCOME_POINTS = { DRAW: 3, LOSE: 0, WIN: 6 };

class Thing {
  point: number;
  constructor(point: number) {
    this.point = point;
  }

  computePoints(anotherThing: Thing): number {
    if (anotherThing.constructor.name === this.constructor.name) {
      return this.point + OUTCOME_POINTS.DRAW;
    }
    return 0;
  }
  toLose(): Thing {
    throw new Error("Need to implement toLose");
  }

  toWin(): Thing {
    throw new Error("Need to implement toWin");
  }

  toDraw(): Thing {
    throw new Error("Need to implement toDraw");
  }
}

class Rock extends Thing {
  constructor() {
    super(1);
  }

  computePoints(anotherThing: Thing): number {
    let points = super.computePoints(anotherThing);
    if (points === 0) {
      if (anotherThing instanceof Paper) {
        return this.point + OUTCOME_POINTS.LOSE;
      } else if (anotherThing instanceof Scissors) {
        return this.point + OUTCOME_POINTS.WIN;
      }
    }
    return points;
  }

  toWin(): Thing {
    return new Paper();
  }

  toLose(): Thing {
    return new Scissors();
  }

  toDraw(): Thing {
    return new Rock();
  }
}

class Paper extends Thing {
  constructor() {
    super(2);
  }

  computePoints(anotherThing: Thing): number {
    let points = super.computePoints(anotherThing);
    if (points === 0) {
      if (anotherThing instanceof Scissors) {
        return this.point + OUTCOME_POINTS.LOSE;
      } else if (anotherThing instanceof Rock) {
        return this.point + OUTCOME_POINTS.WIN;
      }
    }
    return points;
  }

  toWin(): Thing {
    return new Scissors();
  }

  toLose(): Thing {
    return new Rock();
  }

  toDraw(): Thing {
    return new Paper();
  }
}

class Scissors extends Thing {
  constructor() {
    super(3);
  }

  computePoints(anotherThing: Thing): number {
    let points = super.computePoints(anotherThing);
    if (points === 0) {
      if (anotherThing instanceof Rock) {
        return this.point + OUTCOME_POINTS.LOSE;
      } else if (anotherThing instanceof Paper) {
        return this.point + OUTCOME_POINTS.WIN;
      }
    }
    return points;
  }

  toWin(): Thing {
    return new Rock();
  }

  toLose(): Thing {
    return new Paper();
  }

  toDraw(): Thing {
    return new Scissors();
  }
}

class ThingFactory {
  create(code: string): Thing {
    if (["A"].includes(code)) {
      return new Rock();
    } else if (["B"].includes(code)) {
      return new Paper();
    } else if (["C"].includes(code)) {
      return new Scissors();
    }
    throw Error(`Incorrect code: "${code}"`);
  }
}

async function findSolution(inputs: Array<string>): Promise<number> {
  console.log("Finding solution");
  const factory = new ThingFactory();
  let score = 0;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i] === "") continue;
    const round = inputs[i].split(" ");
    const elfThing = factory.create(round[0]);
    let myThing: Thing;
    if (round[1] === "X") {
      myThing = elfThing.toLose();
    } else if (round[1] === "Y") {
      myThing = elfThing.toDraw();
    } else {
      myThing = elfThing.toWin();
    }
    const roundScore = myThing.computePoints(elfThing);
    score += roundScore;
  }
  return score;
}

async function main() {
  let inputs: Array<string> = [];
  if (helper.shouldUseTestInput()) {
    console.log("using test input");
    inputs = ["A Y", "B X", "C Z"];
  } else {
    inputs = await helper.getInputs();
  }
  const solution = await findSolution(inputs);
  console.log(solution);
}

main();
