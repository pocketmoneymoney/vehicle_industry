import Vue from 'vue'
import App from './purchase_publish_record.vue'

global.bus = new Vue();

var app = new Vue({
  el: '#main',
  //store,
  render: h=>h(App)
});
