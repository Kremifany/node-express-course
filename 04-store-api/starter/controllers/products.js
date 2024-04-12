const Product = require("../models/product");
//////////////////////////////////////////////////////////////////STATIC/////////////////////////////////////////////////////////////////////////////

const getAllProductsStatic = async (req, res) => {
  const search = "a";
  const products = await Product.find({ price: { $gt: 100 } })
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(1).numericFilters;
  // throw new Error("Throw async errors");
  res.status(200).json({ products, nbHits: products.length });
};

//////////////////////////////////////////////////////////////////
const getAllProducts = async (req, res) => {
  console.log(req.query);
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((element) => {
      const [field, operator, value] = element.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    });
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
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
