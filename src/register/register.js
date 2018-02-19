import Vue from 'vue'
import App from './Register.vue'

global.bus = new Vue();

var app = new Vue({
  el: '#main',
  //store,
  render: h=>h(App)
});
