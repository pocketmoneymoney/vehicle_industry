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
      product: "purchase",
      title: "最新采购",
      components: [],
	  mainUrl: "/src/purchase/index.html",
	  detailUrl: "/src/purchase/enroll.html?id=",
    }
  },
  mounted: function () {
    var self = this;
    get('/api/purchase/list?page=0&num=8', {}, function(data) {
       if (data.success) {
		for (var index = 0; index < data.msg.length; index++) {
		  var purchase = data.msg[index];
		  var content = purchase.productName + "[" + purchase.company + "]";
		  if (content.length > 50) {
			content = content.slice(0, 46) + "... ...";
		  }

		  self.components.push({
			'url': self.detailUrl + purchase.id,
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
