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
