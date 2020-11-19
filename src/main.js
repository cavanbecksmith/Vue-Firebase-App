// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import Vue2Filters from 'vue2-filters'
import { rtdbPlugin } from 'vuefire'

window.$ = $;
window.jQuery = $;
var VueFire = require('vuefire');
require('prismjs/themes/prism-twilight.css');

// TinyMCE CSS
require('./css/content.min.css');
require('./css/skin.min.css')

// Alert
// http://t4t5.github.io/sweetalert/
require('sweetalert');

// Use vuefire
Vue.use(VueFire);
Vue.use(rtdbPlugin);


// Use Vue 2 filters | Port of vue 1 filters for vue 2
// https://012.vuejs.org/api/filters.html
Vue.use(Vue2Filters)

Vue.config.productionTip = false;


// Window locking
import _position from './scripts/_positioning';
_position._position.scrollLocking();

// Vue validate
// https://github.com/logaretm/vee-validate

// Simple vue validator
// http://simple-vue-validator.maijin.info/
var SimpleVueValidation = require('simple-vue-validator');
Vue.use(SimpleVueValidation);

// window.Tether = require('tether/dist/js/tether.js');
// require('bootstrap/dist/js/bootstrap.js');

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


window.vm = vm;