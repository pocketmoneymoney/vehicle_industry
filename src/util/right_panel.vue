<template>
  <div class="right_pabel_nav">
  <div class="right_panel">
    <h3>
        <span>供应商推荐</span>
    </h3>
	<supplier-recom style="max-width:100px;max-height:100px;" :imgPaths="imgPaths" carouselId="supplier_recom"></supplier-recom>
  </div>
  <div class="right_panel">
    <h3>
        <span>关注OE汽车微信公众号</span>
		<img style="width:100px;height:100px;" :src="qrcode"/>
    </h3>
  </div>
  </div>
</template>

<script>
import SupplierRecom from './carousel.vue'

export default {
  props: ['product', 'height'],
  data: function() {
    var qrcode = '';
    return {
      qrcode: '',
	  imgPaths: ['/img/1.jpg', '/img/2.jpg', '/img/3.jpg']
    }
  },
  computed: {
    title: function() {
      if (this.product === "supplier") {
        return "供应商推荐";
      }
    },
  },
  mounted: function() {
    var self = this;
    $('.right_panel').height(this.height);
	get('/api/admin/qrcode', {}, function(data) {
		self.qrcode = data;
    }, false);
  },
  components: {SupplierRecom}
}
</script>

<style scoped>
.right_panel_nav {
	float: right;
	width: 200px;
    height: 400px;
}

.right_panel{
	float: right;
	width: 200px;
    height: 150px;
	border: 1px solid #e5e5e5;
	background: #fff;
	padding: 10px 9px;
	margin-bottom: 8px;
}
.right_panel h3 span{
	float: left;
}
.right_panel h3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
}

</style>
