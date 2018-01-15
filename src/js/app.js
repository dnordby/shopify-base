import bootstrapSass from "./../scss/bootstrap/bootstrap.scss";
import appSass from "./../scss/app.scss";

import $ from 'jquery';
import AjaxCart from './modules/cart';
import product from './pages/product';

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
