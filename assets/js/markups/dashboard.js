import { initializeChart } from "../utils/chart.js";
import { fetchOrders, fetchOrderDetails } from "../api/api.js";
import { formatPrice } from "../utils/formatPrice.js";

async function renderDashboard() {
  try {
    const orders = await fetchOrders();

    const ordersByDate = {};

    for (const order of orders) {
      const orderDetails = await fetchOrderDetails(order.id);
      const orderDate = new Date(orderDetails.createdAt).toLocaleDateString(
        "vi-VN"
      );
      if (ordersByDate[orderDate]) {
        ordersByDate[orderDate].revenue += order.products.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
      } else {
        ordersByDate[orderDate] = {
          revenue: order.products.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          ),
        };
      }
    }

    const revenueElement = document.getElementById("revenue");

    const totalRevenue = Object.values(ordersByDate).reduce(
      (total, order) => total + order.revenue,
      0
    );

    revenueElement.textContent = `${formatPrice(totalRevenue)}`;

    const chartLabels = Object.keys(ordersByDate);
    const revenueCounts = Object.values(ordersByDate).map(
      (order) => order.revenue
    );

    initializeChart("myChart", revenueCounts, chartLabels, 'bar'); 
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
}

export { renderDashboard };