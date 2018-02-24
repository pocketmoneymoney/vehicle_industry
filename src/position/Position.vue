<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav :currentView="viewName"></main-nav>
        <div>
         <event-enroll-panel></event-enroll-panel>
          <div class="main_middle">
          <list-position></list-position>
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
import MainNav from '../util/main_nav.vue'
import LastFooter from '../util/footer.vue'
import RightPanel from '../util/right_panel.vue'

import EventEnrollPanel from '../util/event_enroll_panel.vue'
import LatestPurchase from '../util/latest_purchase.vue'
import ListPosition from './list_position.vue'


export default {
  data: function() {
    return {
      viewName: "position"
    }
  },
  methods: {
	viewChange: function(index) {
	  this.itemSeries = this.items[index];
	}
  },
  components: {MainHeader, TopBar, MainNav, EventEnrollPanel, LatestPurchase, 
			   ListPosition, RightPanel, LastFooter}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';

</style>
