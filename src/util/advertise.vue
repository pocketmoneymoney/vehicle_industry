<template>
  <Ad :imgPaths="adPaths" :carouselId="advertiseCarouselId" height="48px"></Ad>
</template>

<script>
import Ad from './carousel.vue'

export default {
  data() {
    var ads = [];
    return {
      advertiseCarouselId: 'advertise',
      imgPath: 'http://localhost:8099/',
	    ads: [],
      adPaths: []
    }	
  },

  mounted: function() {
    var self = this;
    /*
	  get('/api/admin/advertise', {}, function(data) {
	     console.log(data);
	  	self.ads = data;
      for (let index in data) {
        self.adPaths.push(data[index].path);
      }
    }, false);
    */
    get('/api/activity/latest', {type: 'meeting'}, function(data) {
        self.adPaths.push(self.imgPath + data.tinyPoster);
    }, false);
    get('/api/activity/latest', {type: 'visiting'}, function(data) {
        self.adPaths.push(self.imgPath + data.tinyPoster);
    }, false);
  },
  components: {Ad}
}
</script>

<style>
</style>
