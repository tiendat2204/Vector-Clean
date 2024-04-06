interface ProductData {
    name: string;
    price: string;
    description: string;
    categoryId: string | null;
    status: string;
    image: string;
  }
  
  interface CategoryData {
    name: string;
    status: string;
  }
  
  interface OrderData {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    products: {
      id: string;
      name: string;
      price: string;
      size: number;
      image: string;
      quantity: number;
    }[];
    userId: string;
    status: string;
    createdAt: string;
    paymentMethod: string;
  }
  
  function getDataAdmin(): ProductData {
    const name = (document.querySelector(
      '.modal-product input[name="name"]'
    ) as HTMLInputElement).value;
    const price = (document.querySelector(
      '.modal-product input[name="price"]'
    ) as HTMLInputElement).value;
    const description = (document.querySelector(
      '.modal-product input[name="description"]'
    ) as HTMLInputElement).value;
    const status = (document.querySelector(
      '.modal-product select[name="status"]'
    ) as HTMLSelectElement).value;
  
    const imageInput = document.querySelector(
      '.modal-product input[type="file"]'
    ) as HTMLInputElement;
    const image = imageInput.files?.length ? imageInput.files[0].name : "";
  
    const categorySelect = document.querySelector(
      '.modal-product select[name="category"]'
    ) as HTMLSelectElement;
    const categoryId = categorySelect
      ? categorySelect.options[categorySelect.selectedIndex]?.getAttribute(
          "data-category-id"
        )
      : null;
  
    const productData: ProductData = {
      name,
      price,
      description,
      categoryId,
      status,
      image,
    };
  
    return productData;
  }
  function getDataAdminEditProduct(): ProductData {
    const name = (document.querySelector(
      '.form-edit input[name="name"]'
    ) as HTMLInputElement).value;
    const price = (document.querySelector(
      '.form-edit input[name="price"]'
    ) as HTMLInputElement).value;
    const description = (document.querySelector(
      '.form-edit input[name="description"]'
    ) as HTMLInputElement).value;
    const status = (document.querySelector(
      '.form-edit select[name="status"]'
    ) as HTMLSelectElement).value;
    const imageInput = document.querySelector(
      '.form-edit input[type="file"]'
    ) as HTMLInputElement;
    const image = imageInput.files?.length ? imageInput.files[0].name : "";

  
    const categorySelect = document.querySelector(
      '.form-edit select[name="category"]'
    ) as HTMLSelectElement;
    const categoryId = categorySelect
      ? categorySelect.options[categorySelect.selectedIndex]?.getAttribute(
          "data-category-id"
        )
      : null;
  
    const productData: ProductData = {
      name,
      price,
      description,
      categoryId,
      status,
      image,
    };
  
    return productData;
  }
  
  function getDataAdminEditCategory(): CategoryData {
    const name = (document.querySelector(
      '.edit-category-modal input[name="name"]'
    ) as HTMLInputElement).value;
    const status = (document.querySelector(
      '.edit-category-modal select[name="status"]'
    ) as HTMLSelectElement).value;
  
    const categoryData: CategoryData = {
      name,
      status,
    };
  
    return categoryData;
  }
  
  function getOrderDataFrom(): OrderData {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const phoneNumber = (document.getElementById("phone-number") as HTMLInputElement).value;
    const email = (document.getElementById("email-out") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement).value;
  
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const products = cartItems.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      size: item.size,
      image: item.image,
      quantity: item.quantity,
    }));
  
    const userId = JSON.parse(localStorage.getItem("user") || "{}");
    const highestOrderId = parseInt(localStorage.getItem("highestOrderId") || "0") || 0;
    const newOrderId = highestOrderId + 1;
    localStorage.setItem("highestOrderId", newOrderId.toString());
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    let paymentMethod = "";
    const paymentMethodRadios: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="payment-method"]');


    for (let i = 0; i < paymentMethodRadios.length; i++) {
        const radio = paymentMethodRadios[i];
        if (radio.checked) {
            paymentMethod = radio.value;
            break;
        }
    }
    
    
  
    const order: OrderData = {
      id: newOrderId.toString(),
      name,
      phoneNumber,
      email,
      address,
      products,
      userId: userId.id,
      status: "Chờ xác nhận",
      createdAt: formattedDate,
      paymentMethod,
    };
    return order;
  }
  
  function getDataAdminEditOrder(): Partial<OrderData> {
    const editedOrderData: Partial<OrderData> = {
      name: (document.getElementById("customer-name-input") as HTMLInputElement).value,
      phoneNumber: (document.getElementById("customer-phone-input") as HTMLInputElement).value,
      email: (document.getElementById("customer-email-input") as HTMLInputElement).value,
      address: (document.getElementById("customer-address-input") as HTMLInputElement).value,
      status: (document.getElementById("order-status-select") as HTMLSelectElement).value,
    };
    return editedOrderData;
  }
  
  export {
    getDataAdmin,
    getDataAdminEditProduct,
    getDataAdminEditCategory,
    getOrderDataFrom,
    getDataAdminEditOrder,
  };
  