<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header currentView="activity"></main-header>
      </div>
      <div class="main clearfix">
        <!--main-nav :currentView="viewName"></main-nav-->
        <div>
		  <div class="main_right">
		  <a style="cursor:pointer;" @click="enroll(latestMeeting)">
			<img style="width:850px; height:430px; margin-left:30px; float:left;" 
				 :src="latestMeeting.bigPoster" />
		  </a>
	      <div style="clear:both;"> </div>
		  <div class="new_meetings">
		    <meeting-panel 
			  v-for="meeting in newMeetings" 
				:activity="meeting">
			</meeting-panel>
		  </div>
    	  <div style="float:right;">
        	<span><a href="/src/activity/activity_list.html?tp=meeting">更多活动列表>></a></span>
    	  </div>
		  </div>
        </div>
		  <main-right></main-right>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import LastFooter from '../util/footer.vue'
import RightPanel from '../util/right_panel.vue'
import EventEnrollPanel from '../util/event_enroll_panel.vue'
import HistoryMeeting from '../util/carousel.vue'
import MainRight from './main_right.vue'
import MeetingPanel from './activity_panel.vue'

export default {
  data: function() {
    return {
      viewName: "meeting",
	  enrollUrl: '/src/activity/enroll.html?id=',
	  latestMeeting: {},
	  newMeetings: [],
      historyImgPaths: ['/img/1.jpg', '/img/2.jpg', '/img/3.jpg']
    }
  },
  methods: {
	viewChange: function(index) {
	  this.itemSeries = this.items[index];
	},
	enroll: function (activity) {
	  window.location.href = this.enrollUrl + activity.id + '&tp=' + this.viewName;
    } 
  },
  mounted: function() {
    var self = this;
    get('/api/activity/latest', {type: 'meeting'}, function(data) {
	  if (data.success) {
        self.latestMeeting = data.msg;
      }
    }, false);
    get('/api/activity/list', {type: 'meeting', num:9, page:0}, function(data) {
	  if (data.success) {
        self.newMeetings = data.msg;
	  }
    }, false);
  },
  components: {MainHeader, TopBar, MeetingPanel, HistoryMeeting,
			   EventEnrollPanel, RightPanel, LastFooter, MainRight}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';

.main_right{
	float: left;
	width: 950px;
	margin-bottom: 20px;
	padding: 0px 12px 10px 10px;
}

h3{
	height: 14px;
	line-height: 14px;
	font-size: 14px;
	color: #333333;
  margin: 0;
  font-weight: bold;
}
.new_meetings {
	padding-top: 20px;
	float: left;
}
</style>
