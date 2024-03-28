// to run the app is:   npm run start

const express = require("express");
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const app = express();
const { products, people } = require("./data");
const peopleRouter = require("./routes/people");
const authRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");
// static assets
app.use(express.static("./methods-public"));
//parse form data
app.use(express.urlencoded({ extended: false }));
// parse from json
app.use(express.json());
// app.use([auth, logger]);
// app.use(logger);
// Parse cookies
// app.use(cookieParser());
app.use("/api/v1/people", peopleRouter);

// ----------for people--------------
app.get("/api/v1/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

// app.use(express.static("./public"));

// // ---------------for products---------------
app.get("/", (req, res) => {
  res.status(200).send("Home");
});
app.get("/about", (req, res) => {
  res.status(200).send("About page");
});
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.listen(3000, () => {
  console.log("the server is listen on port 3000...");
});
