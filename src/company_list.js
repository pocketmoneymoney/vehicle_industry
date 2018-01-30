import Vue from 'vue'
//import store from '../store/index'
import App from './Company_list.vue'

global.bus = new Vue();

var app = new Vue({
  el: '#main',
  //store,
  render: h=>h(App)
});
