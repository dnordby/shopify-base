import $ from 'jquery';

export default function () {
  // ***************** //
  // ** ADD TO CART ** //
  // ***************** //

  $('#add').click(function(e){
    e.preventDefault();
    // VARIABLES DEPEND ON HTML STRUCTURE, MAY BE DIFFERENT FROM PROJECT-TO-PROJECT
    var form = $(this).closest('form');
    var variantId = $(form).find('.js-variant-id').val();
    var variantTitle = $(form).find('.js-variant-title').val();
    var variantPrice = $(form).find('.js-variant-price').val();
    var availableQuantity = $(form).find('.js-available-quantity').val();
    var newLineItem =   `<div class="js-line-item">
                          <input type="hidden" value=${variantId} class="js-variant-id">
                          <input type="hidden" value="1" class="js-quantity">
                          <input type="hidden" value=${availableQuantity} class="js-available-quantity">
                          <input type="hidden" value=${variantPrice} class="js-unit-price">
                          <h3>${variantTitle}</h3>
                          <p class="js-visual-quantity">Quantity: 1</p>
                          <p>Unit Price: ${variantPrice}</p>
                          <p class="js-total-price">Total Price: ${variantPrice}</p>
                          <p class="js-subtract pointer js-update" data-action="subtract">SUBTRACT</p>
                          <p class="js-add pointer js-update" data-action="increase">ADD</p>
                          <p class="js-remove pointer">REMOVE</p>
                        </div>`;

    // ADD TO CART ACCEPTS A FORM, BUTTON (OPTIONAL), AND A CALLBACK FUNCTION
    // RETURNS CART OBJECT OR ADD TO CART ERROR
    AjaxCart.addToCart(form, $(this), function(cartOrError){
      $('.cart-drawer').prepend(newLineItem);
      console.log(cartOrError);
    });
  });



  // ************** //
  // ** GET CART ** //
  // ************** //

  // ACCEPTS NO VALUES/ARGUMENTS
  // RETURNS CART OBJECT
  var getCart = AjaxCart.getCart();
  console.log(getCart);



  // ********************** //
  // ** REMOVE LINE ITEM ** //
  // ********************** //

  $(document).on('click', '.js-remove', function(){
    // VARIABLES DEPEND ON HTML STRUCTURE, MAY BE DIFFERENT FROM PROJECT-TO-PROJECT
    var line = $(this).closest('.js-line-item');
    var variantId = $(line).find('.js-variant-id').val();

    // REQUIRES VARIANT ID
    // RETURNS UPDATED CART OBJECT
    var updatedCart = AjaxCart.removeFromCart(variantId);

    $(line).remove();

    console.log(updatedCart);
  });



  // ********************* //
  // ** UPDATE QUANTITY ** //
  // ********************* //

  $(document).on('click', '.js-update', function(){
    // VARIABLES DEPEND ON HTML STRUCTURE, MAY BE DIFFERENT FROM PROJECT-TO-PROJECT
    var action = $(this).data('action');
    var currentQuantity = parseInt($(this).closest('.js-line-item').find('.js-quantity').val());
    var variantId = $(this).closest('.js-line-item').find('.js-variant-id').val();
    var availableQuantity = $(this).closest('.js-line-item').find('.js-available-quantity').val();
    console.log($(this));
    console.log(action);

    // REQUIRES ACTION ('increase' or 'subtract' ONLY), VARIANT ID, CURRENT QUANTITY IN CART, AND TOTAL AVAILABLE
    // RETURNS UPDATED CART OBJECT
    var updatedCart = AjaxCart.updateQuantity(action, variantId, currentQuantity, availableQuantity);

    // VISUAL UPDATES DEPEND ON HTML STRUCTURE, MAY BE DIFFERENT FROM PROJECT-TO-PROJECT
    if ( (currentQuantity == 1) && (action == 'subtract') ) {
      $(this).closest('.js-line-item').remove();
      console.log(updatedCart);
    } else if ( (currentQuantity > 1) && (action == 'subtract') ) {
      var visualQuantity = currentQuantity - 1;
      var updatedTotal = Number($(this).closest('.js-line-item').find('.js-unit-price').val().replace(/[^0-9\.-]+/g,"")) * 100 * visualQuantity;
      updatedTotal = '$' + ((updatedTotal / 100).toFixed(2)).toString();
      $(this).closest('.js-line-item').find('.js-visual-quantity').text('Quantity: ' + visualQuantity.toString());
      $(this).closest('.js-line-item').find('.js-total-price').text('Total Price: ' + updatedTotal);
      $(this).closest('.js-line-item').find('.js-quantity').val(visualQuantity);
      console.log(updatedCart);
    } else if ( (action == 'increase')  ) {
      var visualQuantity = currentQuantity + 1;
      var updatedTotal = Number($(this).closest('.js-line-item').find('.js-unit-price').val().replace(/[^0-9\.-]+/g,"")) * 100 * visualQuantity;
      if (visualQuantity <= availableQuantity) {
        updatedTotal = '$' + ((updatedTotal / 100).toFixed(2)).toString();
        $(this).closest('.js-line-item').find('.js-visual-quantity').text('Quantity: ' + visualQuantity.toString());
        $(this).closest('.js-line-item').find('.js-total-price').text('Total Price: ' + updatedTotal);
        $(this).closest('.js-line-item').find('.js-quantity').val(visualQuantity);
      } else {
        alert(updatedCart);
      }
    }
  });
}
