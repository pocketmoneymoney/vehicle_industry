<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav :currentView="viewName"></main-nav>
        <div>
		  <a :href="activityEnrollUrl + latestMeeting.id"><img style="width:990px;float:left;" :src="imgUrl + latestMeeting.bigPoster" /></a>
	      <right-panel></right-panel>
		  <div class="new_meetings">
		    <meeting-panel v-for="meeting in newMeetings" :activity="meeting"></meeting-panel>
		  </div>
          <div class="main_right">
            <history-meeting :imgPaths="historyImgPaths" carouselId="history_meeting"></history-meeting>
            <interview></interview>
		  </div>
        </div>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import Interview from '../util/interview.vue'
import LastFooter from '../util/footer.vue'
import RightPanel from '../util/right_panel.vue'

import MeetingPanel from '../util/activity_panel.vue'
import HistoryMeeting from '../util/carousel.vue'


export default {
  data: function() {
    return {
      imgUrl: 'http://localhost:8099/',
      viewName: "meeting",
	  activityEnrollUrl: '/src/util/activity_enroll.html?activityId=',
	  latestMeeting: {},
	  newMeetings: [],
      historyImgPaths: ['/img/1.jpg', '/img/2.jpg', '/img/3.jpg']
    }
  },
  methods: {
	viewChange: function(index) {
	  this.itemSeries = this.items[index];
	}
  },
  mounted: function() {
    var self = this;
    get('/api/activity/latest', {type: 'meeting'}, function(data) {
        self.latestMeeting = data;
    }, false);
    get('/api/activity/list', {type: 'meeting', num: 3}, function(data) {
        self.newMeetings = data;
    }, false);
  },
  components: {MainHeader, TopBar, MainNav, MeetingPanel, HistoryMeeting,
			   RightPanel, Interview, LastFooter}
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
	float: left;
	width: 740px;
	margin-bottom: 20px;
	padding: 0px 12px 10px 10px;
}

.enroll{
	width: 500px;
	height: 50px;
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
