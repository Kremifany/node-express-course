const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

let item = "Enter your guess below.";
let randomNumber = Math.floor(Math.random() * 100) + 1;
let userGuess;
const form = () => {
  return `
    <body>
    <p>${item}</p>
    <form method="POST">
    <input name="item"></input>
    <button type="submit">Submit</button>
    </form>
    </body>
    `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);

      // Get the user's guess.
      userGuess = parseInt(body["item"]);

      // Check if the user guessed correctly.
      if (userGuess === randomNumber) {
        item = "Congratulations! You guessed correctly!";
      } else if (userGuess < randomNumber) {
        item = "Your guess is too low.";
      } else if (userGuess > randomNumber) {
        item = "Your guess is too high.";
      }

      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
