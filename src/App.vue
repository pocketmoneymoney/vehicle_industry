<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
        <left-nav @viewchange="viewChange"></left-nav>
        <div class="main_right">
          <latest-activity carouselId="latest-activity-poster" :imgPaths="imgPaths">
		  </latest-activity>
        </div>
		<right-panel></right-panel>
          <latest-purchase></latest-purchase>
          <latest-event></latest-event>
          <latest-position></latest-position>
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

import LatestActivity from './util/carousel.vue'

export default {
  data: function() {
    return {
      viewName: "index",
      imgPaths: []
    }
  },
  methods: {
	viewChange: function(index) {
	  this.itemSeries = this.items[index];
	}
  },
  mounted: function() {
	var self = this;
	self.imgPaths = [];
    get('/api/activity/list', {num:3, page:0}, function(data) {
	  if (data.success) {
        for (let index in data.msg) {
		   if (data.msg[index].bigPoster) {
             self.imgPaths.push(data.msg[index].bigPoster);
		   } else if (data.msg[index].smallPoster) {
             self.imgPaths.push(data.msg[index].smallPoster);
		   }
        }
	  }
    }, false);
  },
  components: {LeftNav, MainHeader, TopBar, MainNav, LatestPurchase, LatestEvent, 
			   LatestPosition, LatestActivity, RightPanel, LastFooter}
}
</script>

<style lang="scss">
@import '../css/rem.scss';

.main_right{
	float: left;
	width: 740px;
	height: 330px;
	margin-bottom: 5px;
	padding: 0px 12px 10px 10px;
}
</style>
