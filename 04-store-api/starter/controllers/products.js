const Product = require("../models/product");
//////////////////////////////////////////////////////////////////STATIC/////////////////////////////////////////////////////////////////////////////

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 100 } })
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(1);
  // throw new Error("Throw async errors");
  res.status(200).json({ products, nbHits: products.length });
};

//////////////////////////////////////////////////////////////////
const getAllProducts = async (req, res) => {
  console.log(req.query);
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true";
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
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const allowedFilterProps = {
      price: "price",
      rating: "rating",
    };

    // first, split the query into filters: [ "price>10", "price<20", "rating=4.5" ],
    // then iterate over each filter
    numericFilters.split(",").forEach((filter) => {
      // sanitize filter by keeping Aa-Zz, 0-9, <, =, >, .
      const santizedFilter = filter.replace(/[^\w<=>\.]/g, "");

      // find the matching operator
      const operator = santizedFilter.match(/\b(<|>|>=|=|<=)\b/g);

      // match operator to Mongo string
      const allowedOperator = operatorMap[operator];

      // split filter via operator: "price<20" becomes ["price", "20"]
      const [prop, value] = santizedFilter.split(operator);

      // match prop to allowed filter property
      const allowedFilter = allowedFilterProps[prop];

      if (allowedFilter && allowedOperator && value) {
        // assign filter to query: { price: { $gt: 10, $lt: 20 }, rating: { $eq: 4.5 } }
        queryObject[allowedFilter] = {
          ...queryObject[allowedFilter],
          [allowedOperator]: parseFloat(value),
        };
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

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
