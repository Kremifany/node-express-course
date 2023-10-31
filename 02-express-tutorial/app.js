console.log("Express Tutorial");
const http = require("http");
const express = require("express");
const { products } = require("./data");
const { stringify } = require("querystring");
const { readFileSync } = require("fs");

const app = express();

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

// retrieve a particular product by ID.
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "That product was not found" });
  }
});

//the products are filtered by first two letters of the product.name to be 'req.query.search'
// and show only first 'req.query.limit'
app.get("/api/v1/query", (req, res) => {
  const filteredProducts = products.filter((product) =>
    product.name.startsWith(req.query.search)
  );
  const firstArr = filteredProducts.slice(0, req.query.limit);
  res.json(firstArr);
});

//the products are filtered by product.price cost to be less then 'req.query.price'
// and show only first 'req.query.limit'
// app.get("/api/v1/query", (req, res) => {
//   const filteredProducts = products.filter(
//     (product) => product.price <= parseFloat(req.query.price)
//   );
//     const firstArr = filteredProducts.slice(0,req.query.limit);
//     res.json(firstArr);
// });

app.all("*", (req, res) => {
  res.status(404).send("<h1>resourse not found</h1>");
});

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});
