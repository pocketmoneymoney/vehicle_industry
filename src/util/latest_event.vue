<template>
  <div>
    <list-panel :product="product" :title="title" :mainUrl="mainUrl" :components="components" :height=140></list-panel>
  </div>
</template>

<script>
import ListPanel from './list_panel.vue'

export default {
  data() {
    return {
      product: "event",
      title: "最新活动",
      components: [],
	  mainUrl: "/src/activity/meeting.html",
	  detailUrl: "/src/activity/enroll.html?id="
    }
  },
  mounted: function () {
    var self = this;
    get('/api/activity/list?page=0&num=8', {}, function(data) {
       if (data.success) {
		for (var index = 0; index < data.msg.length; index++) {
		  var activity = data.msg[index];
		  var content = activity.name + "[" + activity.location + "]";
		  if (content.length > 50) {
			content = content.slice(0, 46) + "... ...";
		  }
		  self.components.push({
			'url': self.detailUrl + activity.id + "&tp=" + activity.type,
			'content': content
		  });
		}
	   }
	}, false);
  },
  components: {ListPanel}
}
</script>

<style>
</style>
