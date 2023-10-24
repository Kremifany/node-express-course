const { readFileSync, writeFileSync } = require("fs");
writeFileSync(
  "./temporary/fileA.txt",
  `\nFirst Line \nSecond Line \nThird Line`,
  { flag: "a" }
);
console.log(`${readFileSync("./temporary/fileA.txt")}`);
