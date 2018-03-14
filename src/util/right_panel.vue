<template>
  <div>
  <div class="right_panel">
    <h3>
        <span>供应商推荐</span>
    </h3>
	<supplier-recom style="max-width:120px;max-height:120px;" 
	 :imgPaths="imgPaths" carouselId="supplier_recom"></supplier-recom>
  </div>
  <div class="right_panel">
    <h3>
        <span>关注OE汽车微信公众号</span>
    </h3>
	<img style="width:120px;height:120px;" :src="qrcode"/>
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
	get('/api/admin/qrcode', {}, function(data) {
		if (data.success) {
		  self.qrcode = data.msg;
		} else {
		  console.log(data.msg);
		}
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
    height: 160px;
	border: 1px solid #e5e5e5;
	background: #fff;
	padding: 10px 9px;
	margin-bottom: 8px;
	margin-left: 20px;
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
