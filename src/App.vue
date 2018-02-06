<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav></main-nav>
        <left-nav @viewchange="viewChange"></left-nav>
        <div class="main_right">
          <latest-purchase></latest-purchase>
          <supplier-recom></supplier-recom>
          <latest-event></latest-event>
          <latest-position></latest-position>
        </div>
      </div>
      <interview></interview>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from './util/topbar.vue'
import LeftNav from './index/left_nav.vue'
import MainHeader from './util/header.vue'
import MainNav from './util/main_nav.vue'

import LatestPurchase from './util/latest_purchase.vue'
import LatestEvent from './index/latest_event.vue'
import LatestPosition from './index/latest_position.vue'

import SupplierRecom from './util/supplier_recommend.vue'

import Interview from './util/interview.vue'
import LastFooter from './util/footer.vue'

export default {
  data: function() {
    return {
      /*
	    tabs: [
	      {index: 1,
		   name: '新能源'},
	      {index: 2,
		   name: '智能网联'},
	      {index: 3,
		   name: '发动机系统'},
	      {index: 4,
		   name: '汽车配件'},
	      {index: 5,
		   name: '电和电子产品'},
	      {index: 6,
		   name: '身体&配件'},
	      {index: 7,
		   name: '动力传动系统'},
	      {index: 8,
		   name: '制动系统'},
	      {index: 9,
		   name: '转向系统'},
	      {index: 10,
		   name: '材料和设备'},
	      {index: 11,
		   name: '处理部分和模具'},
	      {index: 12,
		   name: '通用部分'},
	    ],
	    defaultTab: 1
      */
    }
  },
  methods: {
	viewChange: function(index) {
	  this.itemSeries = this.items[index];
	}
  },
  components: {LeftNav, MainHeader, TopBar, MainNav, LatestPurchase, LatestEvent, LatestPosition, SupplierRecom, Interview, LastFooter}
}
</script>

<style lang="scss">
@import '../css/rem.scss';

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
