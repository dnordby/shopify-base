import bootstrapScss from "./../scss/bootstrap/bootstrap.scss";
import appSass from "./../scss/app.scss";

import $ from 'jquery';
import AjaxCart from '../js/modules/cart';
import product from '../js/pages/product';

const CartJs = {
  settings: {},
  init() {
    if ($('body').hasClass('template-product')) {
      product();
    }
  }
};

window.CartJs = CartJs;

$(function(){
  CartJs.init();
})
