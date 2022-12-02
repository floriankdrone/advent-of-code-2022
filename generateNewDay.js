const fs = require('fs');

const today = new Date();
const date = today.getDate();
const dir = `./day${date}`
fs.mkdirSync(dir);
fs.writeFileSync(`${dir}/solution.ts`, '');
