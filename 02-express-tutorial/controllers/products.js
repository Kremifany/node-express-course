const { products } = require("../data");

const getProducts = (req, res) => {
  res.status(200).json({ success: true, data: products });
};

const getProduct = (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  // if (!product) {
  //   res.status(404).json({ message: "No such a product!" });
  // } else {
  //   res.status(200).json(product);
  // }
  return product
    ? res.status(200).json(product)
    : res.status(404).json({ message: "No such a product!" });
};

const searchProduct = (req, res) => {
  console.log(req.query);
  const { search, limit, priceLess } = req.query;

  if (search) {
    sortedItems = sortedItems.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    sortedItems = sortedItems.slice(0, Number(limit));
  }

  if (priceLess) {
    sortedItems = sortedItems.filter((product) => {
      return product.price < priceLess;
    });
  }

  if (sortedItems.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }
  return res.status(200).json(sortedItems);
};

module.exports = {
  getProducts,
  getProduct,
  searchProduct,
};
