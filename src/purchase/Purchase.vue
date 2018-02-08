<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav :currentView="viewName"></main-nav>
        <div>
          <event-enroll-panel></event-enroll-panel>
          <supplier-recom></supplier-recom>
          <div class="clearfix">
            <purchase-product></purchase-product>
          </div>
        </div>
      </div>
      <interview></interview>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'

import EventEnrollPanel from '../util/event_enroll_panel.vue'
import PurchaseProduct from './list_purchase_product.vue'

import SupplierRecom from '../util/supplier_recommend.vue'

import Interview from '../util/interview.vue'
import LastFooter from '../util/footer.vue'

export default {
  data: function() {
    return {
      viewName: "purchase",
      topProduct: "eventEnroll",
      topTitle: "活动预告及报名",
      topComponent: "event-enroll-panel"
    }
  },
  methods: {
	viewChange: function(index) {
	  this.itemSeries = this.items[index];
	}
  },
  components: {MainHeader, TopBar, MainNav, EventEnrollPanel, PurchaseProduct, SupplierRecom, Interview, LastFooter}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';

.back_wrapper{
  width: t(1200);
  background-color:#f9f9f8;
}
.main{
	width: 1200px;
	margin: 0 auto;
}

/* clearfix elimate float:left has no height */
.clearfix:before,
.clearfix:after {
  content: '\0020';
  display: block;
  overflow: hidden;
  visibility: hidden;
  width: 0;
  height: 0;
}

.clearfix:after {
  clear: both;
}

.main_right{
	float: right;
	width: 970px;
	margin-bottom: 20px;
}

h3{
	height: 14px;
	line-height: 14px;
	font-size: 14px;
	color: #333333;
  margin: 0;
  font-weight: bold;
}
</style>
