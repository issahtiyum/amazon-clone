import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";


const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

describe('test suite: add to cart', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem')
  })

  it('adds an existing product to the cart', () =>{
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage()

    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }])
    )

    expect(cart.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart[0].quantity).toEqual(2);
  });



  it('adds a new product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage()
 
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    )
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1)
  });
});


describe('test suite: updateDeliveryOption', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    })
    loadFromStorage()
  });

  it('updates the delivery option of a product in the cart', () => {
    updateDeliveryOption(productId1, '3')

    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',
      JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '3'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }])
    )
    
  })

  it('does not update the delivery option if the the product is not in the cart', () => {
    updateDeliveryOption('invalidId', '3')
    expect(cart).toEqual(
      [{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }])
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })

  it('does nothing if the delivery option does not exist', () => {
    updateDeliveryOption(productId1, '4')
    expect(cart).toEqual(
      [{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]
    )
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })
});


describe('test suite: remove from cart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    })
  });


  it('removes a productId in the cart', () => {
    loadFromStorage()

    removeFromCart(productId1)

    expect(cart.length).toEqual(1);
    expect(cart).toEqual(
      [{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]
    )
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId2);
    expect(cart[0].quantity).toEqual(1)
  });


  it('does nothing if product is not in the cart', () => {
    loadFromStorage();

    removeFromCart('does-not-exist');
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }]));
  })
});