<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header currentView="company"></main-header>
      </div>
      <div class="main clearfix">
        <main-nav :currentView="viewName"></main-nav>
        <div>
          <event-enroll-panel></event-enroll-panel>
          <div class="main_middle">
            <latest-purchase></latest-purchase>
            <category></category>
          </div>
	      <right-panel></right-panel>
        </div>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import LastFooter from '../util/footer.vue'

import EventEnrollPanel from '../util/event_enroll_panel.vue'
import LatestPurchase from '../util/latest_purchase.vue'
import RightPanel from '../util/right_panel.vue'

import Category from './category.vue'

export default {
  data: function() {
    return {
      viewName: "company"
    }
  },
  methods: {
	viewChange: function(index) {
	  this.itemSeries = this.items[index];
	}
  },
  components: {MainHeader, TopBar, EventEnrollPanel, LatestPurchase,
			   Category, RightPanel, LastFooter}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';

</style>
