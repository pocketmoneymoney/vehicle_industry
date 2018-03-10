<template>
	<div class="main2_right">
	  <div class="title_bar" style="width:300px">
        <span> <a>最新活动预告及报名</a> </span>
	  </div>
  	  <div style="clear:both;"> </div>
      <event-enroll :activity="activities"></event-enroll>
	</div>
</template>

<script>
import EventEnroll from './event_enroll.vue'
export default {
  data() {
	  return {
		  activities: {}
	  }
  },
  mounted: function() {
    var self = this;
    get('/api/activity/latest', {type: 'meeting'}, function(data) {
        self.activities = data.msg;
    }, false);
  },
  components: {EventEnroll}
}

</script>

<style>
</style>
