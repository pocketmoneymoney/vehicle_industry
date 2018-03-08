<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
        <left-nav @viewchange="viewChange"></left-nav>
        <div class="main_right">
          <latest-purchase></latest-purchase>
          <latest-event></latest-event>
          <latest-position></latest-position>
        </div>
		<right-panel></right-panel>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from './util/topbar.vue'
import LeftNav from './index/left_nav.vue'
import MainHeader from './util/header.vue'
import MainNav from './util/main_nav.vue'
import RightPanel from './util/right_panel.vue'
import LastFooter from './util/footer.vue'

import LatestPurchase from './util/latest_purchase.vue'
import LatestEvent from './util/latest_event.vue'
import LatestPosition from './util/latest_position.vue'

export default {
  data: function() {
    return {
      viewName: "index"
    }
  },
  methods: {
	viewChange: function(index) {
	  this.itemSeries = this.items[index];
	}
  },
  components: {LeftNav, MainHeader, TopBar, MainNav, LatestPurchase, LatestEvent, 
			   LatestPosition, RightPanel, LastFooter}
}
</script>

<style lang="scss">
@import '../css/rem.scss';

.main_right{
	float: left;
	width: 740px;
	margin-bottom: 20px;
	padding: 0px 12px 10px 10px;
}
</style>
