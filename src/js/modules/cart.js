import $ from 'jquery';

const AjaxCart = {


  // ADD ITEM TO CART
  // RETURN ERROR, OR CART OBJECT
  addToCart(form, button = $('form').find('input[type=submit]'), fn) {
    var button = button;
    var cartForm = $(form).serialize();
    var completedText = $(button).attr('value');
    var cart = getCart();
    var product = productAdded();
    $(button).attr('value', 'adding...').prop('disabled', true);

    function productAdded() {
      return $.ajax({
        url: '/cart/add.js',
        type: 'POST',
        data: cartForm,
        dataType: 'json'
      });
    }
    function getCart() {
      return $.ajax({
        url: '/cart.js',
        type: 'GET',
        dataType: 'json'
      });
    }

    $.when(cart, product).done(function(cartData, productData){
      fn(cartData);
    }).fail(function(error){
      fn(error.responseJSON.description);
    });

    $(button).attr('value', completedText).prop('disabled', false);
  },


  // GET THE CART
  getCart() {
    var cart = getCart().done(function(data){
      return(data);
    });

    function getCart() {
      return $.ajax({
        url: '/cart.js',
        type: 'GET',
        dataType: 'json'
      });
    }

    return(cart);
  },


  // REMOVE ALL QUANTITIES OF VARIANT FROM CART
  removeFromCart(variantId) {
    var variantId = parseInt(variantId);
    var updateHash = {quantity: 0, id: variantId};
    var updatedCart = updateCart().done(function(data){
      return(data);
    });

    function updateCart() {
      return $.ajax({
        url: '/cart/change.js',
        type: 'POST',
        dataType: 'json',
        data: updateHash,
      });
    }

    return(updatedCart);
  },


  // CHANGE QUANTITY GIVEN VARIANT ID
  changeQuantity(variantId, quantity){
    var variantId = parseInt(variantId);
    var itemQuantity = parseInt(quantity);
    var updateHash = `{"updates": {"${variantId}": ${itemQuantity}}}`;
    updateHash = JSON.parse(updateHash);
    var updatedCart = quantityUpdate().done(function(data){
      return(data);
    });

    function quantityUpdate() {
      return $.ajax({
        url: '/cart/update.js',
        type: 'POST',
        dataType: 'json',
        data: updateHash
      });
    }

    return(updatedCart);
  },


  // UPDATE QUANTITY CHECK
  updateQuantity(action, variantId, currentQuantity, availableQuantity) {
    var action = action;
    var variantId = variantId;
    var currentQuantity = currentQuantity;
    var availableQuantity = availableQuantity;

    if ( (currentQuantity == 1) && (action == 'subtract') ) {
      // INVOKE REMOVE FROM CART
      return AjaxCart.removeFromCart(variantId);

    } else if ( (currentQuantity > 1) && (action == 'subtract') ) {
      // UPDATE CART QUANTITY
      currentQuantity--;
      return AjaxCart.changeQuantity(variantId, currentQuantity);

    } else if ( (action == 'increase')  ) {
      // CHECK FOR AVAILABILITY, AND THEN PROCESS
      currentQuantity++;
      return AjaxCart.variantAvailable(variantId, currentQuantity, availableQuantity);
    }
  },


  // ENSURE AVAILABILITY
  variantAvailable(variantId, requestedQuantity, availableQuantity) {
    var variantId = parseInt(variantId);
    var availableQuantity = parseInt(availableQuantity);
    var requestedQuantity = parseInt(requestedQuantity);
    var error = '';

    if ( availableQuantity <= 0 ) {
      return error = 'No additional product in stock.';
    } else if (requestedQuantity > availableQuantity) {
      return error = 'No additional product in stock.';
    } else if (availableQuantity >= requestedQuantity) {
      return AjaxCart.changeQuantity(variantId, requestedQuantity);
    }
  }
};

window.AjaxCart = AjaxCart;
