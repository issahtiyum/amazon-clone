import { cart } from '../data/cart-class.js';
import {products, loadProducts} from '../data/products.js';
import { searchForProduct } from './utils/search.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  
  let productsHTML = ''
  const url = new URL(window.location.href)
  const search = url.searchParams.get('search')
  let filteredProducts = products;

  if(search) {
    filteredProducts = products.filter((product) => {
      const productNameLowerCase = product.name.toLowerCase();
      let validProduct;
      if(productNameLowerCase.includes(search.toLowerCase())){
        validProduct = true;
        return validProduct
      } 
      product.keywords.forEach((keyword) => {
        if(keyword.includes(search.toLowerCase())){
          validProduct = true
        }
      })
      
      return validProduct;
    })
  }

  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class = "js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart added-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
          Add to Cart
        </button>
      </div>
    `
  })
  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  cart.updateCartQuantity()

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      let addedMessageTimeoutId;

      button.addEventListener('click', ()=>{
        const {productId} = button.dataset;
        cart.addToCart(productId);
        cart.updateCartQuantity()
      
        document.querySelector(`.added-${productId}`)
          .classList.add('show-added')

        if (addedMessageTimeoutId) clearTimeout(addedMessageTimeoutId);
        addedMessageTimeoutId = setTimeout(() => {
          document.querySelector(`.added-${productId}`)
          .classList.remove('show-added')
        },2000)
      });   
    });

  // This is for the search
  document.querySelector('.js-search-button')
  .addEventListener('click', () => {
    searchForProduct()
  })

  document.querySelector('.js-search-bar')
  .addEventListener('keydown', (value) => {
    if (value.key === 'Enter') {
      searchForProduct()
    }
  })

  

}