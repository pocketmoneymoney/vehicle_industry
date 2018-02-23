<template>
  <div class="event_enroll_panel clearfix">
    <h3>
        <span>活动预告及报名</span>
        <a href="../inquiry/product_list.aspx">More &gt;</a>
    </h3>
    <event-enroll :activity="latestMeeting"></event-enroll>
    <div class="seperate"></div>
    <event-enroll :activity="latestVisiting"></event-enroll>
  </div>
</template>

<script>
import EventEnroll from './event_enroll.vue'

export default {
  data() {
	  return {
		  latestMeeting: {},
		  latestVisiting: {}
	  }
  },
  mounted: function() {
    var self = this;
    get('/api/activity/latest', {type: 'meeting'}, function(data) {
        self.latestMeeting = data;
    }, false);
    get('/api/activity/latest', {type: 'visiting'}, function(data) {
        self.latestVisiting= data;
    }, false);
  },
  components: {EventEnroll}
}
</script>

<style>
.event_enroll_panel{
	float: left;
	width: 230px;
	border: 1px solid #e5e5e5;
	background: #fff;
	padding: 19px 20px;
	margin-bottom: 8px;
    margin-right: 4px;
}
.event_enroll_panel h3 {
  padding-bottom: 25px;
  border-bottom: #d7d7d7 1px solid;
}
.event_enroll_panel h3 span{
	float: left;
}
.event_enroll_panel h3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
}
.seperate {
  float:left;
  width: 200px;
  height:0px;
  margin-top:10px;
  border-top:#d7d7d7 1px solid;
}
</style>
