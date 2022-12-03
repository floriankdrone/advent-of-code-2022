const fs = require('fs');
const pkgJson = require('./package.json');

const today = new Date();
const date = today.getDate();
const adventOfCodeDay = `day${date}`;
const dir = `./${adventOfCodeDay}`;
const filePath =  `${dir}/solution.ts`;
fs.mkdirSync(dir);
fs.copyFileSync("base/solution.ts",filePath);
pkgJson.scripts[`${adventOfCodeDay}`] = `ts-node ${filePath}`;
pkgJson.scripts["start"] = `ts-node ${filePath}`;
fs.writeFileSync('./package.json', JSON.stringify(pkgJson, null,2));