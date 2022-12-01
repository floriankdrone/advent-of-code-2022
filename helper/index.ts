import got from 'got';
import path from 'path';
import {CookieJar} from 'tough-cookie';

const ADVENT_OF_CODE_BASE_URL = "https://adventofcode.com/2022/day";
const ADVENT_OF_CODE_INPUT_SUFFIX = "input";
const cookieJar = new CookieJar();

async function getInputs() : Promise<string[]>  {
    // get day
    const day = await getDayAccordingToPath()
    // retrieve inputs
    const inputs = await getInputsForDay(day);
    return inputs;
}

let getDayAccordingToPath = async () => {
    // Where is this file being executed
    const dir = path.basename(path.dirname(process.argv[1]));
    return parseInt(dir.substring(3),10)
}

async function getInputsForDay (dayNumber: number) : Promise<string[]> {
    await cookieJar.setCookie('session=53616c7465645f5f2da51a1c90c4ac3aeed80d4943d56bebb378966082e57500241b7a5315bc7d654b96d23ce35f749b1926c1f4fb58b3cd44ba49323ad26768', 'https://adventofcode.com');
    // retrieve inputs
    const url = getAdventOfCodeUrl(dayNumber);
    const {body} = await got.get(url,{cookieJar});
    return body.split('\n');
}

let shouldUseTestInput = () => {
    return process.env.USE_TEST_INPUT === "true";
}

function getAdventOfCodeUrl(dayNumber: number) : string {
    return `${ADVENT_OF_CODE_BASE_URL}/${dayNumber}/${ADVENT_OF_CODE_INPUT_SUFFIX}`;
}

export default {
    getInputs,
    getDayAccordingToPath,
    shouldUseTestInput
}