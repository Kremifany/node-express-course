const productsData = document.getElementById("productDivs");

const fetchData = async () => {
  const data = await fetch("/api/v1/products", {
    method: "GET",
  });
  const result = await data.json();
  if (!result) {
    productsData.innerHTML = "<h3>Empty list</h3>";
    return;
  }

  const { products } = result;
  productsData.innerHTML = products
    .map((product) => {
      const productName =
        product.name.charAt(0).toUpperCase() + product.name.slice(1);
      console.log("product", product.id, product.name);
      return `<ul class="product_id">Product #${product.id}
            <li class="product_name">Product Name: ${productName}
            </li>
            <li class="product_price">Price: $${product.price}
            </li>
            </ul>`;
    })
    .join("");
};
