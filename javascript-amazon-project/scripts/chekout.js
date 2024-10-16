import {calculateCartQuantity, cart, removeFromCart, updateQuantity} from "../data/cart.js";
import {products} from "../data/products.js"
import {formatCurrency} from "./utils/money.js";
import {hello} from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js'

hello();

const today = dayjs()

const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D')
)
let cartSummaryHTML = ''
cart.forEach((cartItem) => {
  const productId = cartItem.productId
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId){
      matchingProduct = product
    }
  })

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option
    }
  })

  const today = dayjs();

  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

  const dateString = deliveryDate.format('dddd, MMMM, D');

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id = "${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
            <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id = "${matchingProduct.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
});


function deliveryOptionsHTML(matchingProduct, cartItem){
  let html = ''

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();

    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

    const dateString = deliveryDate.format('dddd, MMMM, D');

    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`
      
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option">
        <input type="radio" 
        ${isChecked ? 'checked' : '' }
        class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  })

  return html
}

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', ()=> {
        const {productId} = link.dataset;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove()

        updateCartQuantity()
      })
    })

    document.querySelectorAll('.js-update-quantity-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const {productId} =link.dataset;

          document.querySelector(`.js-cart-item-container-${productId}`).
            classList.add('is-editing-quantity')
        })
      })

    document.querySelectorAll('.js-save-quantity-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const {productId} =link.dataset;

          const newQuantityInput = document.querySelector(`.js-quantity-input-${productId}`)
          const newQuantity = Number(newQuantityInput.value)

          if (newQuantity <= 0 || newQuantity >= 1000) {
            alert('Quantity must be between 0 and 1000');
            return;
          }

          updateQuantity(productId, newQuantity)

          document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity
          updateCartQuantity()

          document.querySelector(`.js-cart-item-container-${productId}`).
            classList.remove('is-editing-quantity')
        })
      })

    document.querySelectorAll('.js-quantity-input')
      .forEach((input) => {
        input.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            const {productId} =input.dataset;

            const newQuantityInput = document.querySelector(`.js-quantity-input-${productId}`)
            const newQuantity = Number(newQuantityInput.value)

            if (newQuantity <= 0 || newQuantity >= 1000) {
              alert('Quantity must be between 0 and 1000');
              return;
            }
  
            updateQuantity(productId, newQuantity)
  
            document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity
            updateCartQuantity()
  
            document.querySelector(`.js-cart-item-container-${productId}`).
              classList.remove('is-editing-quantity')
          }
        })
      })


    updateCartQuantity()

    function updateCartQuantity(){
      const cartQuantity = calculateCartQuantity()
      document.querySelector('.js-cart-quantity')
        .innerHTML = `${cartQuantity} items`;
    }