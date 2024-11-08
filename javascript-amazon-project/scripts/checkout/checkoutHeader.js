import { cart } from "../../data/cart-class.js";

export function renderCheckoutHeader(){
  const cartQuantity = cart.calculateCartQuantity()
  document.querySelector('.js-cart-quantity')
    .innerHTML = `${cartQuantity} items`;
}