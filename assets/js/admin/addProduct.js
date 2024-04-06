// addProduct.js

const BASE_URL = "http://localhost:3000";

const fetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
};

function addProduct(productData) {
  const url = `${BASE_URL}/products`;
  return fetch(`${BASE_URL}/products`)
    .then((response) => {
      if (!response.ok) {
        
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((products) => {
      const highestId = products.reduce(
        (maxId, product) => Math.max(maxId, parseInt(product.id) || 0),
        0
      );

      productData.id = (highestId + 1).toString();

      const options = {
        ...fetchOptions,
        body: JSON.stringify(productData),
      };
      return fetch(url, options);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error in addProduct:", error);
      throw error;
    });
}

export { addProduct };