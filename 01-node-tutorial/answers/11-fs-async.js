// const { readFile, writeFile } = require("fs");
// console.log("at start");
// writeFile("./temporary/fileB.txt", "First Line Async");
// writeFile("./temporary/fileB.txt", "Second line", { flag: "a" });
// writeFile("./temporary/fileB.txt", "Third line", { flag: "a" });

// console.log(readFile("./temporary/fileB.txt", "utf-8"));


// writeFile("./temporary/output.txt", "This is line 1\n", (err, result) => {
//   console.log("at point 1");
//   if (err) {
//     console.log("This error happened: ", err);
//   } else {
//     // here you write your next line
//   }
// });
// console.log("at end");
const { writeFile } = require("fs");
console.log("at start");
writeFile("./temporary/output.txt", "This is line 1\n", (err, result) => {
  console.log("at point 1");
  if (err) {
    console.log("This error happened: ", err);
  } else {
    // here you write your next line
    writeFile("./temporary/output.txt", "This is line 2\n", (err, result) => {
      console.log("at point 2");
      if (err) {
        console.log("This error happened: ", err);
      } else {
        // here you write your next line
        writeFile(
          "./temporary/output.txt",
          "This is line 3\n",
          (err, result) => {
            console.log("at point 3");
            if (err) {
              console.log("This error happened: ", err);
            } else {
              // here you write your next line
            }
          }
        );
      }
    });
  }
});
console.log("at end");