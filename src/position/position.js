import Vue from 'vue'
//import store from '../store/index'
import App from './Position.vue'

global.bus = new Vue();

var app = new Vue({
  el: '#main',
  //store,
  render: h=>h(App)
});
