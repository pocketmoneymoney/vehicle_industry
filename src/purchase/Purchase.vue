<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav :currentView="viewName"></main-nav>
        <div>
          <event-enroll-panel></event-enroll-panel>
		  <new-purchase-next v-if="newPurchaseNext" :newPurchaseBasicInfo="newPurchaseBasicInfo"></new-purchase-next>
		  <new-purchase v-else @newPurchaseNext="showNewPurchaseNext"></new-purchase>
		  <right-panel></right-panel>
          <purchase-product></purchase-product>
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
import RightPanel from '../util/right_panel.vue'
import LastFooter from '../util/footer.vue'

import EventEnrollPanel from '../util/event_enroll_panel.vue'
import NewPurchase from './new_purchase.vue'
import NewPurchaseNext from './new_purchase_next.vue'
import PurchaseProduct from './list_purchase_product.vue'

import Interview from '../util/interview.vue'

export default {
  data: function() {
    return {
      viewName: "purchase",
      topProduct: "eventEnroll",
      topTitle: "活动预告及报名",
      topComponent: "event-enroll-panel",
	  newPurchaseBasicInfo: {},
	  newPurchaseNext: false
    }
  },
  methods: {
	showNewPurchaseNext: function(data) {
		this.newPurchaseBasicInfo = data;
		this.newPurchaseNext = true;
	},
	viewChange: function(index) {
	  this.itemSeries = this.items[index];
	}
  },
  components: {MainHeader, TopBar, MainNav, EventEnrollPanel, PurchaseProduct, 
			   NewPurchase, NewPurchaseNext, RightPanel, Interview, LastFooter}
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
