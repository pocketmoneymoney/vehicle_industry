<template>
  <div>
    <list-panel :product="product" :title="title" :mainUrl="mainUrl" 
		:components="components" :height=200></list-panel>
  </div>
</template>

<script>
import ListPanel from './list_panel.vue'

export default {
  data() {
    return {
      product: "position",
      title: "最新职位",
      components: [],
	  mainUrl: "/src/position/index.html",
	  detailUrl: "/src/position/enroll.html?id=",
    }
  },
  mounted: function() {
    var self = this;
    get('/api/position/list?page=0&num=8', {}, function(data) {
       if (data.success) {
		for (var index = 0; index < data.msg.length; index++) {
		  var position = data.msg[index];
		  var content = position.name + "[" + position.company + "]";
		  if (content.length > 50) {
			content = content.slice(0, 46) + "... ...";
		  }
		  self.components.push({
			'url': self.detailUrl + position.id,
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
