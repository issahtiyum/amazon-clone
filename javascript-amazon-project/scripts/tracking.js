import { orders } from "../data/orders.js";
import { loadProductsFetch, getProduct} from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart } from "../data/cart-class.js";

async function renderTrackingPage() {
  await loadProductsFetch()
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  cart.updateCartQuantity()

  let matchingOrder;
  orders.forEach(order => {
    if (orderId === `"${order.id}"`) {
      matchingOrder = order;
    }
  });

  let matchingProduct;
  matchingOrder.products.forEach((product) => {
    if (productId === `"${product.productId}"`) {
      matchingProduct = getProduct(product.productId)
      document.querySelector('.main').innerHTML = `
          <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
              View all orders
            </a>
    
            <div class="delivery-date">
              Arriving on ${dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D')}
            </div>
    
            <div class="product-info">
              ${matchingProduct.name}
            </div>
    
            <div class="product-info">
              Quantity: ${product.quantity}
            </div>
    
            <img class="product-image" src=${matchingProduct.image}>
    
            <div class="progress-labels-container">
              <div class="progress-label">
                Preparing
              </div>
              <div class="progress-label current-status">
                Shipped
              </div>
              <div class="progress-label">
                Delivered
              </div>
            </div>
    
            <div class="progress-bar-container">
              <div class="progress-bar"></div>
            </div>
          </div>
      `
    }
  })
}

renderTrackingPage()