import { orders } from "../data/orders.js";
import { formatDate } from "./utils/formatDate.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";

async function renderOrders() {
  let ordersHTML = ''
  orders.forEach((order) => {
    ordersHTML += `
      <div class="order-container js-order-container" data-order-id = "${order.id}">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formatDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid js-order-details-grid js-order-details-${order.id}" data-order-id="${order.id}">
        </div>
      </div>
    `
  });

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML

  await loadProductsFetch()

  document.querySelectorAll('.js-order-details-grid')
    .forEach((orderContainer) => {
      const {orderId} = orderContainer.dataset;        
      orders.forEach((order) => {
        if (order.id === orderId) {
          order.products.forEach((product) => {
            let matchingProduct = getProduct(product.productId)
            document.querySelector(`.js-order-details-${orderId}`).innerHTML+=`
              <div class="product-image-container">
                <img src="${matchingProduct.image}">
              </div>
  
              <div class="product-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">
                  Arriving on: ${formatDate(product.estimatedDeliveryTime)}
                </div>
                <div class="product-quantity">
                  Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary buy-${product.productId} js-buy-again" data-product-id=${product.productId}>
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message ">Buy it again</span>
                </button>
              </div>
  
              <div class="product-actions">
                  <button class="track-package-button button-secondary js-track-package js-track-package-${orderId}-${product.productId}" data-order-id="${orderId}" data-product-id="${product.productId}">
                    Track package
                  </button>
                </a>
              </div>
            `
          })
        }
      })
  })

  cart.updateCartQuantity()

  document.querySelectorAll('.js-buy-again')
  .forEach((button) => {
    button.addEventListener('click', () => {
      cart.addToCart(button.dataset.productId)
      cart.updateCartQuantity()
      button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1500);
    })
  })

  document.querySelectorAll('.js-track-package')
  .forEach((button) => {
    button.addEventListener('click', () => {
      window.location.href = `tracking.html?orderId="${button.dataset.orderId}"&productId="${button.dataset.productId}"`;
    })
  })

}
renderOrders()
