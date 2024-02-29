// create a read stream for the big file (../content/big.txt) with encoding of "utf8" and a highWaterMark of 200

const fs = require("fs");

// Create a read stream for the big file with encoding of "utf8" and a highWaterMark of 200.
const readStream = fs.createReadStream("../content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200,
});

// Initialize a counter to 0.
let chunkCount = 0;

// Handle the "data" event for the stream.
readStream.on("data", (chunk) => {
  // Increment the counter.
  chunkCount++;

  // Log the event result to the screen.
  console.log(`Received chunk ${chunkCount}.`);
});

// Handle the "end" event for the stream.
readStream.on("end", () => {
  // Report the number of cnks received.
  console.log(`Received a total of ${chunkCount} chunks.`);
});

// Handle the stream "error" event.
readStream.on("error", (error) => {
  // Log the error to the console.
  console.log(`Error occurred: ${error.message}`);
});