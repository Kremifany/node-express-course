const { readFileSync, writeFileSync } = require("fs");

const first = readFileSync("./content/first.txt", "utf-8");
const second = readFileSync("./content/second.txt", "utf-8");

console.log(first, second);

writeFileSync("./temporary/fileA.txt",`Here the result: \n${first},\n${second}`);

writeFileSync(
  "./temporary/fileA.txt",
  `Here the result: \n${first},\n${second}`,
  {flag: 'a'}
);
console.log(readFileSync("./temporary/fileA.txt", "utf-8"));