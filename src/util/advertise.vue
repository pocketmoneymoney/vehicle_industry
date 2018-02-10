<template>
<div class="banner-padding-top">
<div class="container-lg">
  <div id="slides-thumbnail">
    <div v-for="ad in ads" >
    <a><img :src="ad.path" /></a>
    </div> 
  </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    var ads = [];
    return {
	  ads: []
    }	
  },

  mounted: function() {
    var self = this;
    var slidesWrap = $('.banner-padding-top');
    var $backDropLeft, $backDropRight, backDropWidth, calcSlidesBackdrop;
    $('#slides-thumbnail').bxSlider({
        auto: true,
        pause: 3000,
        autoHover: true,
        wrapSelector: '.slides-thumbnail',
    });
	get('/api/admin/advertise', {}, function(data) {
	   console.log(data);
		self.ads = data;
    }, false);
  }
}
</script>

<style>
</style>
