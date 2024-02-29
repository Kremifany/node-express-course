const EventEmitter = require("events");
const emitter = new EventEmitter();
const waitForEvent = () => {
  return new Promise((resolve) => {
    emitter.on("sayHi", (msg) => resolve(msg));
  });
};
const doWait = async () => {
  const msg = await waitForEvent();
  console.log("We got an event! Here it is: ", msg);
};
doWait();
emitter.emit("sayHi", "Hi!");
// emitter.on("response", (name,id) => {
//   console.log(`data recieved ${name} with id: ${id}`);
// });
// emitter.on("response", () => {
//   console.log("some other logic");
// });
// emitter.emit("response","Fany",1234);
