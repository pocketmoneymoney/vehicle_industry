<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav :currentView="viewName"></main-nav>
        <div>
           <event-enroll-panel></event-enroll-panel>
		  <div class="main_middle">
  			<div class="list_position clearfix">
     		<ul class="product_list">
         		<li v-for="activity in activities">
             		<div class="position_list_right">

					<div style="float:right">
					  <img :src="getPoster(activity)" 
					  	 style="width:200px;height:200px;">
	  				  <div style="clear:both;"> </div>
					</div>
                 		<dl>
                     		<dt>活动名称</dt>
                     		<dd><h4 class="position_title"> <a>{{ activity.name }}</a></h4>
					 		</dd>
                 		</dl>
			 		</div>
             		<div class="position_list_right">
                 		<dl>
                     		<dt>活动时间</dt>
                     		<dd>
             		   		<em>{{ activity.startTime }} - {{activity.endTime}}</em>
					 		</dd>
                 		</dl>
                 		<dl>
                     		<dt>活动地点</dt>
                     		<dd>
             		   		<em>{{ activity.location }} </em>
					 		</dd>
                 		</dl>
			 		</div>
            		  <a @click="enroll(activity)" class="contact_btn">我要报名</a>
         		</li>
			</ul>
			</div>
     		<page :curPage="curPage" :totalPage="totalPage" @pageChanged="changePage"></page>
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

import Page from '../util/page.vue'

export default {
  data: function() {
    return {
      viewName: "",
	  activities: [],
      curPage: 1,
      totalPage: 9,
	  enrollUrl: '/src/activity/enroll.html?id='
    }
  },
  methods: {
    changePage: function(page) {
      this.curPage = page;
	  this.getCurrentPageData();
    },
	getCurrentPageData() {
	  var self = this;
	  getListData('/api/activity/' + this.viewName, this.curPage - 1, 
	    function(totalPage, data) {
	      self.totalPage = totalPage;
	      self.activities = retriveData(data);
	  });
	},
	getPoster(activity) {
		if (activity.smallPoster) {
			return activity.smallPoster;
		} else if (activity.bigPoster) {
			return activity.bigPoster;
		} else {
			return activity.tinyPoster;
		}	
	},
	enroll: function (activity) {
	  window.location.href = this.enrollUrl + activity.id + '&tp=' + this.viewName;
    } 
  },
  mounted: function() {
	var type = getUrlKey('tp');
	this.viewName = type;
	this.getCurrentPageData();
  },
  components: {MainHeader, TopBar, MainNav, Page,
			   EventEnrollPanel, RightPanel, LastFooter}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
.list_position{
	width: 740px;
	height: 700px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px;
	margin-bottom: 8px;
}
.list_position h3 {
  height: 42px;
}
.list_position h3 span{
	float: left;
  padding-top: 15px;
  padding-left: 15px;
}
.list_position h3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
}

.product_list li{
	border-bottom: 1px dashed #e5e5e5;
	padding: 20px 0;
	overflow: hidden;
}

.position_title{
	color: #449cd7;
	font-size: 14px;
	line-height: 22px;	
	height: 22px;
	margin-bottom: 15px;
}
.position_title a{
	color: #449cd7;
}
.position_title a:hover{
	color: #73c5ec;
}

.position_list_right{
	margin-top: 10px;
}
.position_list_right dl{
	overflow: hidden;
	font-size: 12px;
}
.position_list_right dl dt{
	float: left;
	width: 100px;
	padding-right: 20px;
	line-height: 22px;
	color: #999;
}
.position_list_right dl dd{
	float: left;
	width: 500px;
	line-height: 22px;
	color: #333;
}

</style>
