const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    name: "a first wooden table",
  });
  // throw new Error("Throw async errors");
  res.status(200).json({ products });
};
const getAllProductsStaticLiddy = async (req, res) => {
  const products = await Product.find({
    company: "liddy",
  });
  // throw new Error("Throw async errors");
  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  console.log(req.query);
  const { featured } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? "true" : "false";
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
