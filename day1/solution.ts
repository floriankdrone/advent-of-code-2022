import helper from '../helper'

async function findSolution(inputs: Array<string>) : Promise<number> {
  console.log('Finding solution');
  let elfCarryingMostCalories = 1;
  let mostCalories = 0;
  let currentElfCalories = 0;
  let currentElf = 1;
  let elfs : Array<number> = [];
  for(let i = 0; i < inputs.length; i++) {
    if (inputs[i] === '') {
      elfs.push(currentElfCalories)
      currentElfCalories = 0;
    } else {
      currentElfCalories += parseInt(inputs[i],10);
    }
  }
  return elfs.sort((a,b)=>b-a).slice(0,3).reduce((acc, value) => acc += value, 0);
}

async function main() {
  let inputs : Array<string> = [];
  if (helper.shouldUseTestInput()) {
    console.log('using test input')
    inputs = [
      '1000',
      '2000',
      '3000',
      '',
      '4000',
      '',
      '5000',
      '6000',
      '',
      '7000',
      '8000',
      '9000',
      '',
      '10000'
    ];
  } else {
    inputs = await helper.getInputs();
  }
  const solution = await findSolution(inputs)
  console.log(solution)
}

main()
