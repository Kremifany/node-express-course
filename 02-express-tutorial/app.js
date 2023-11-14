console.log("Express Tutorial");
const http = require("http");
const express = require("express");
const { products } = require("./data");
const { stringify } = require("querystring");
const { readFileSync } = require("fs");
const logger = require("./logger");
const peopleRouter = require("./routes/people");

const app = express();

//HW4
app.use(logger);
//parse form data
app.use(express.urlencoded({ extended: false }));
//parse json
app.use(express.json());

//people router
app.use("/api/v1/people", peopleRouter);

// app.get("/", logger, (req, res) => {
//   res.send("HOME");
// });

// app.get("/about", logger, (req, res) => {
//   res.send("ABOUT");
// });

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please Provide Credentials");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});
