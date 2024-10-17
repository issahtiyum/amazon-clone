import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader(){
  const cartQuantity = calculateCartQuantity()
  document.querySelector('.js-cart-quantity')
    .innerHTML = `${cartQuantity} items`;
}