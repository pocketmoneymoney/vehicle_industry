<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav :currentView="viewName"></main-nav>
			<div style="width:750px; float:left;">
              <list-purchase-product></list-purchase-product>
			</div>
			<div style="width:400px; float:right;">
		      <new-purchase-next v-if="newPurchaseNext" 
			    :newPurchaseBasicInfo="newPurchaseBasicInfo"
				:person="person"
				@cancelPurchase="cancelPurchase"> </new-purchase-next>
		      <new-purchase v-else 
				:person="person" @newPurchaseNext="showNewPurchaseNext"></new-purchase>
		  </div>
      </div>
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
import ListPurchaseProduct from './list_purchase_product.vue'

export default {
  data: function() {
    return {
      viewName: "purchase",
      topProduct: "eventEnroll",
      topTitle: "活动预告及报名",
      topComponent: "event-enroll-panel",
	  person: {},
	  newPurchaseBasicInfo: {},
	  newPurchaseNext: false
    }
  },
  methods: {
	showNewPurchaseNext: function(basic) {
		this.newPurchaseBasicInfo = basic;
		this.newPurchaseNext = true;
	},
    cancelPurchase: function () {
		this.newPurchaseNext = false;
    },
	viewChange: function(index) {
	  this.itemSeries = this.items[index];
	}
  },
  mounted: function () {
    var self = this;
    getLoginInfo(function(person) {
      self.person = person; 
    });
  },
  components: {MainHeader, TopBar, MainNav, EventEnrollPanel, 
			   ListPurchaseProduct, NewPurchase, NewPurchaseNext, 
			   RightPanel, LastFooter}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
