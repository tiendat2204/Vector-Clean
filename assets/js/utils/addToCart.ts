import { updateCartNumber } from "./updateHeader";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: number;
  image: string;
}

function addToCart(productToAdd: CartItem, products: CartItem[]): CartItem[] {
  const existingProductIndex: number = products.findIndex(
    (item) => item.id === productToAdd.id && item.size === productToAdd.size
  );

  if (existingProductIndex !== -1) {
    products[existingProductIndex].quantity += productToAdd.quantity;
  } else {
    products.push(productToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(products));
  updateCartNumber();
  return products;
}

export { addToCart };
