// const EventEmitter = require("events");

// // Create an event emitter.
// const myEmitter = new EventEmitter();

// // event handlers.
// myEmitter.on("greeting", (name) => {
//   console.log(`Hello, ${name}!`);
// });

// myEmitter.on("farewell", (name) => {
//   console.log(`Goodbye, ${name}.`);
// });

// // Emit some events.
// myEmitter.emit("greeting", "Alice");
// myEmitter.emit("greeting", "Bob");
// myEmitter.emit("farewell", "Carol");

// // Emit an event with a parameter.
// myEmitter.emit("farewell", "Dave");
// myEmitter.emit("farewell", "Eve");

const EventEmitter = require("events");

const emitter = new EventEmitter();

const waitForEvent = () => {
  return new Promise((resolve) => {
    emitter.on("happens", (msg) => resolve(msg));
  });
};

const doWait = async () => {
  const msg = await waitForEvent();
  console.log("We got an event! Here it is: ", msg);
};

doWait();
emitter.emit("happens", "Hello World!");
