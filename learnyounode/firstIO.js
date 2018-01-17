const fs = require('fs');

let file = fs.readFileSync(process.argv[2]).toString();
let lines = file.toString().split('\n').length - 1;
console.log(lines);