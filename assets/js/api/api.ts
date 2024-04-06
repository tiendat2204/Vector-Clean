import { fetchData, putData, deleteData, postData } from "./getData";

const baseUrl: string = "http://localhost:3000";
interface Product {
  id: string;
  name: string;
  price: number;
  size: number;
  image: string;
  view: number;
}
function fetchProducts(): Promise<any> {
  return fetchData(`${baseUrl}/products`);
}

function fetchCategories(): Promise<any> {
  return fetchData(`${baseUrl}/categories`);
}

function fetchOrders(): Promise<any> {
  return fetchData(`${baseUrl}/orders`);
}

function fetchProductsByCategory(categoryId: string): Promise<any> {
  return fetchData(`${baseUrl}/categories/${categoryId}/products`);
}

function getProductDetails(productId: string): Promise<any> {
  return fetchData(`${baseUrl}/products/${productId}`);
}

function updateProduct(productId: string, productData: any): Promise<any> {
  return putData(`${baseUrl}/products/${productId}`, productData);
}

function deleteProduct(productId: string): Promise<any> {
  return deleteData(`${baseUrl}/products/${productId}`);
}

async function addCategory(categoryData: any): Promise<any> {
  const categories: any = await fetchCategories();
  const highestId: number = categories.reduce(
    (maxId: number, category: any) =>
      Math.max(maxId, parseInt(category.id) || 0),
    0
  );
  categoryData.id = (highestId + 1).toString();
  return postData(`${baseUrl}/categories`, categoryData);
}

async function getCategoryDetails(categoryId: string): Promise<any> {
  return fetchData(`${baseUrl}/categories/${categoryId}`);
}

function updateCategory(categoryId: string, categoryData: any): Promise<any> {
  return putData(`${baseUrl}/categories/${categoryId}`, categoryData);
}

function deleteCategory(categoryId: string): Promise<any> {
  return deleteData(`${baseUrl}/categories/${categoryId}`);
}

async function addOrder(orderData: any): Promise<any> {
  return postData(`${baseUrl}/orders`, orderData);
}

function fetchOrderDetails(orderId: string): Promise<any> {
  return fetchData(`${baseUrl}/orders/${orderId}`);
}

function updateOrder(orderId: string, orderData: any): Promise<any> {
  return putData(`${baseUrl}/orders/${orderId}`, orderData);
}

function deleteOrder(orderId: string): Promise<any> {
  return deleteData(`${baseUrl}/orders/${orderId}`);
}

export {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  getProductDetails,
  updateProduct,
  deleteProduct,
  addCategory,
  getCategoryDetails,
  updateCategory,
  deleteCategory,
  addOrder,
  fetchOrders,
  fetchOrderDetails,
  updateOrder,
  deleteOrder,
  Product,
};
