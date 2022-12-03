import helper from '../helper'

async function findSolution(inputs: Array<string>) : Promise<number> {
  console.log('Finding solution');
  for(let i = 0; i < inputs.length; i++) {
     if (inputs[i] === "") continue;
    }
  return 0
}

async function main() {
  let inputs : Array<string> = [];
  if (helper.shouldUseTestInput()) {
    console.log('using test input')
    inputs = [
    ];
  } else {
    inputs = await helper.getInputs();
  }
  const solution = await findSolution(inputs)
  console.log(solution)
}

main()
