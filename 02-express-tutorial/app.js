const express = require("express");
const app = express();
const { products } = require("./data");

app.use(express.static("./public"));
app.get("/", (req, res) => {
  res.status(200).send("Home page");
});
app.get("/about", (req, res) => {
  res.status(200).send("About page");
});
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});
app.get("/api/v1/products", (req, res) => {
  res.json({ products });
});
app.get("/api/v1/products/:productID", (req, res) => {
  //res.json(req.params);
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    return res.status(404).send("Product does not exist!");
  }
  res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  console.log(req.query);
  const { search, limit, price } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  
  if (price) {
    sortedProducts = sortedProducts.filter((product) => {
      return (Number(product.price)) < price;
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    res.status(200).send("no product matches");
  }
  return res.status(200).send(sortedProducts);
});

app.get("/api/v1/products/not-there", (req, res) => {
  res.status(400).json({ message: "That product was not found." });
});

app.all("*", (req, res) => {
  console.log(req.method);
  res.status(404).send("<h1>resource not found</h1>");
});
app.listen(3000, () => {
  console.log("the server is listen on port 3000...");
});
