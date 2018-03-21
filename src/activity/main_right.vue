<template>
	<div class="main2_right" style="float:right; width:250px;">
	  <div class="title_bar" style="width:250px">
		<span> <a>发布活动</a> </span>
	  </div>
	
  	  <div style="clear:both;"> </div>
	  <a class="title_bar_info"> 若您需要发布活动信息，请发送至oe@oeqiche.com</a>	
 
	  <div v-for="element in listElement"> 
  	  	<div style="clear:both;"> </div>
	  	<div class="right_panel" style="background:#f9f9f8">
			<img @click="redirectImg(element)" :src="element.path"
		 	 style="width:250px; height:90px; margin-top:20px"> </img>
	  	</div>	
	  </div> 
	</div>
</template>

<script>
export default {
  data: function() {
    return  {
      listElement: []
	}
  },
  methods: {
	redirectImg: function (element) {
	  if (element.link) {
	    window.location.href = element.link;
	  }
	}
  },
  mounted: function() {
    var self = this;
	get('/api/admin/advertise', {}, function(data) {
		if (data.success) {	
			self.listElement = data.msg;
		}
	}, false);
  }
}
</script>

<style>
</style>
