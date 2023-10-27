const { writeFile, readFile, existsSync } = require("fs").promises;

writeFile("./temporary/temp1.txt", "First Line\n", { flag: "a" })
  .then(() => {
    return writeFile("./temporary/temp1.txt", "Second Line\n", { flag: "a" });
  })
  .then(() => {
    return writeFile("./temporary/temp1.txt", "Third Line\n", { flag: "a" });
  })
  // Read the file contents.
  .then(() => {
    return readFile("./temporary/temp1.txt", "utf8");
  })
  // Log each line from the file.
  .then((fileContents) => {
    const lines = fileContents.split("\n");
    for (const line of lines) {
      console.log(line);
    }
  })
  .catch((error) => {
    console.log("An error occurred:", error);
  });
