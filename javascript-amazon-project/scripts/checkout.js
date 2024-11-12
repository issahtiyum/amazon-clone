import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
// import '../data/cart-class.js';
//import '../data/backend-practice.js'

async function loadPage(){
  Promise.all([
    loadProductsFetch(),
    loadCartFetch()
  ]).catch (() => {
    console.log('Unexpected error. Please try again later.')
  }).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader(); 
  })
}

loadPage();

// Promise.all([
//  loadProductsFetch(),
//   new Promise ((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   })

// ]).then((values) => {
//   console.log(values)
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeader();
// });

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value)
  return new Promise ((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary()
  renderPaymentSummary()
  renderCheckoutHeader()
});*/

// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary()
//     renderPaymentSummary()
//     renderCheckoutHeader()
//   })
// });