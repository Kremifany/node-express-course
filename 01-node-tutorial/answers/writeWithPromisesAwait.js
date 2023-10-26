const { writeFile, readFile, existsSync } = require("fs").promises;

// Asynchronous function to write into a file.
const writer = async (filePath, text) => {
  try {
    await writeFile(filePath, text, {
      flag: "a",
    });
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

// Asynchronous function to read a file and log the contents to the screen.
const reader = async (filePath) => {
  try {
    // Read the file contents.
    const fileContents = await readFile(filePath, "utf8");

    // Log the file contents to the screen.
    console.log(fileContents);
  } catch (error) {
    console.log("An error occurred while reading the file:", error);
  }
};
// // Asynchronous function to call the reader and writer functions in order.
const readWrite = async (filePath, text) => {
  // Write to the file.
  await writer(filePath, text);

  // Read the file and log the contents to the screen.
  await reader(filePath);
};

// Add the filename to the .gitignore file.
require("fs").appendFileSync(".gitignore", "\ntemp.txt\n");

//Call the readWrite function.
readWrite("./temporary/temp.txt", `\nFirst Line \nSecond Line \nThird Line`);
