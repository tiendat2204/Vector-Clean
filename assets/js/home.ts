import { fetchProducts, Product } from "./api/api";
import { getProductHTML } from "./markups/productMarkup";
import { clickCart, addProductToCart } from "./utils/cartUtils";
import { updateCartNumber, updateHeader } from "./utils/updateHeader";
import { registerUser, loginUser } from "./user";

const productsPerPage: number = 8;
let currentPage: number = 1;

async function mainHomeLogic(): Promise<void> {
  updateCartNumber();
  updateHeader();
  try {
    const products: Product[] = await fetchProducts();
    displayPage(products, currentPage);
    document.addEventListener("click", (event: MouseEvent) => handleCartClick(event, products));
    registerUser();
    loginUser();
  } catch (error) {
    console.error("Error in mainHomeLogic:", error);
  }
}
function handleCartClick(event: MouseEvent, products: Product[]): void {
    const target: HTMLElement = event.target as HTMLElement;
    const cartButton: HTMLElement | null = target.closest(".cart-btn"); // Sử dụng lớp thực tế của nút giỏ hàng
    if (cartButton) {
      const productId: string | undefined = cartButton.dataset.productId;
      if (productId) {
        const productToAdd: Product | undefined = products.find((product: Product) => product.id === productId);
        if (productToAdd) {
          const itemToAdd = {
            id: productToAdd.id,
            name: productToAdd.name,
            price: productToAdd.price,
            quantity: 1, // Số lượng có thể được điều chỉnh hoặc lấy từ một input nào đó nếu cần
            size: 35, // Kích thước có thể được lấy từ một tùy chọn được chọn bởi người dùng nếu cần
            image: productToAdd.image,
          };
          clickCart(itemToAdd);
        } else {
          console.error("Product not found with ID:", productId);
        }
      }
    }
  }

function displayProducts(products: Product[], container: HTMLElement): void {
  container.innerHTML = "";
  products.forEach((product: Product) => {
    const productHTML: string = getProductHTML(product);
    container.insertAdjacentHTML("beforeend", productHTML);
  });
  
  const handleClick = (event: Event): void => {
    const target: HTMLElement = event.target as HTMLElement;
    const cartButton: HTMLElement | null = target.closest(".cart-btn"); // Use the actual class of your cart button
    if (cartButton) {
      const productId: string | undefined = cartButton.dataset.productId;
      if (productId) {
        const productToAdd: Product | undefined = products.find((product: Product) => product.id === productId);
        if (productToAdd) {
          const itemToAdd = {
            id: productToAdd.id,
            name: productToAdd.name,
            price: productToAdd.price,
            quantity: 1, // The quantity can be adjusted or retrieved from some input if needed
            size: 35, // The size can be retrieved from some option selected by the user if needed
            image: productToAdd.image,
          };
          clickCart(itemToAdd);
        } else {
          console.error("Product not found with ID:", productId);
        }
      }
    }
  };

  container.addEventListener("click", handleClick);
}

function displayPage(products: Product[], page: number): void {
  const startIndex: number = (page - 1) * productsPerPage;
  const endIndex: number = page * productsPerPage;

  const productsToDisplay: Product[] = products.slice(startIndex, endIndex);

  const productContainer: HTMLElement | null = document.getElementById("productContainer");
  const hotProductsContainer: HTMLElement | null = document.getElementById("productContainerHot");
  
  if (productContainer && hotProductsContainer) {
    const productsViewSorted: Product[] = [...products].sort((a, b) => b.view - a.view);
    const hotProductsToDisplay: Product[] = productsViewSorted.slice(0, productsPerPage);

    displayProducts(hotProductsToDisplay, hotProductsContainer);
    displayProducts(productsToDisplay, productContainer);
  }
}

document.addEventListener("DOMContentLoaded", mainHomeLogic);