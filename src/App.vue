<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header currentView="index"></main-header>
      </div>
      <div class="main clearfix">
        <left-nav @viewchange="viewChange"></left-nav>
        <div class="main_right">
          <latest-activity carouselId="latest-activity-poster" :imgPaths="imgPaths"
			:imgHrefs="imgHrefs"> </latest-activity>
        </div>
		<right-panel></right-panel>
          <latest-purchase></latest-purchase>
          <latest-event></latest-event>
          <latest-position></latest-position>
      </div>
	  <div style="clear:both;"> </div>
      <div class="main clearfix">
	  	<div class="supplier_panel clearfix">
    		<h3>
        		<span>合作供应商推荐</span>
    		</h3>
      			<ul v-for="element in listElement">
					<li>
						<img src="/img/cooperator_ad.jpg"> </img>
					</li>
				</ul>
			<div>
			</div>
	  	</div>
	  </div>
	  <div style="clear:both;"> </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from './util/topbar.vue'
import LeftNav from './index/left_nav.vue'
import MainHeader from './util/header.vue'
import RightPanel from './util/right_panel.vue'
import LastFooter from './util/footer.vue'

import LatestPurchase from './util/latest_purchase.vue'
import LatestEvent from './util/latest_event.vue'
import LatestPosition from './util/latest_position.vue'

import LatestActivity from './util/carousel2.vue'

export default {
  data: function() {
    return {
      viewName: "index",
	  activityUrl: '/src/activity/enroll.html?tp=meeting&id=',
      imgPaths: [],
	  listElement: [1,2,3,4,5,6,7,8],
	  imgHrefs: {}
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
	self.imgHrefs = {};
    get('/api/activity/list', {num:3, page:0}, function(data) {
	  if (data.success) {
        for (let index in data.msg) {
		   var path = '';
		   if (data.msg[index].bigPoster) {
             path = data.msg[index].bigPoster;
		   } else if (data.msg[index].smallPoster) {
             path = data.msg[index].smallPoster;
		   }
           self.imgPaths.push(path);
           self.imgHrefs[path] = self.activityUrl + data.msg[index].id;
        }
	  }
    }, false);
  },
  components: {LeftNav, MainHeader, TopBar, LatestPurchase, LatestEvent, 
			   LatestPosition, LatestActivity, RightPanel, LastFooter}
}
</script>

<style lang="scss">
@import '../css/rem.scss';

.main_right{
	float: left;
	width: 740px;
	height: 330px;
	padding: 0px 0px 10px 10px;
}

.supplier_panel{
	width: 1200px;
	height: 350px;
	border: 1px solid #e5e5e5;
	background: #fff;
	padding: 19px 20px;
	margin-top: 20px;
	margin-bottom: 20px;
}

.supplier_panel img{
	width: 230px;
	height: 90px;
}

.supplier_panel ul{
  list-style: none;
  margin-bottom: 0;
  margin-top: 20px;
  padding-left: 0;
  margin-left: 0;
}

.supplier_panel ul li{
  float: left;
  border: 2px solid #f0f0f0;
  width: 260px;
  height:120px;
  margin-left:10px;
  margin-right:10px;
  margin-bottom:10px;
  padding-top:10px;
  padding-left:10px;
  padding-right:10px;
}
</style>
