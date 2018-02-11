<template>
  <Ad :imgPaths="adPaths" :carouselId="advertiseCarouselId"></Ad>
</template>

<script>
import Ad from './carousel.vue'

export default {
  data() {
    var ads = [];
    return {
      advertiseCarouselId: 'advertise',
	    ads: [],
      adPaths: []
    }	
  },

  mounted: function() {
    var self = this;
	  get('/api/admin/advertise', {}, function(data) {
	     console.log(data);
	  	self.ads = data;
      for (let index in data) {
        self.adPaths.push(data[index].path);
      }
    }, false);
  },
  components: {Ad}
}
</script>

<style>
</style>
