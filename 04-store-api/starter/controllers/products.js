const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "a";
  const products = await Product.find({})
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(1);
  // throw new Error("Throw async errors");
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  console.log(req.query);
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? "true" : "false";
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  console.log("queryObject:");
  console.log(queryObject);
  let result = Product.find(queryObject);

  //sort
  if (sort) {
    console.log(sort);
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //select
  if (fields) {
    console.log("select");
    const fieldstList = fields.split(",").join(" ");
    result = result.select(fieldstList);
  }

  //skip, limit

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const fieldstList = fields.split(",").join(" ");
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
