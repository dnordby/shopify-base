<<<<<<< HEAD
// REQUIRE ALL SCSS FROM APP.SCSS
import './../scss/app.scss';

// REQUIRE EACH JS MODULE
import landing from '../js/pages/landing.js';
import about from '../js/pages/about.js';

const CarhartWip = {
  settings: {},
  init() {
    landing();
    about();
  }
};

window.CarhartWip = CarhartWip;

$(function(){
  CarhartWip.init();
});
=======
require("./../scss/app.scss");

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
>>>>>>> a7e5df2ea6b67f499d7035fd5d47bf9a05def636
