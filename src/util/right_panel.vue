<template>
  <div>
  	<div class="right_panel">
      <h3>
        <span>供应商推荐</span>
      </h3>
	  <supplier-recom
	   :imgPaths="imgPaths" carouselId="supplier_recom" :imgHrefs="imgHrefs"
	   :imgTitle="imgTitle" :hasTitle="hasTitle"></supplier-recom>
    </div>
    <div class="right_panel">
      <h3>
        <span>关注OE汽车微信公众号</span>
      </h3>
	  <img :src="qrcode"/>
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
	  url: '/src/company/detail/detail.html?id=',
      qrcode: '',
	  imgPaths: [],
	  imgHrefs: {},
	  imgTitle: {},
	  hasTitle: true
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

	self.imgPaths = [];
	self.imgHrefs = {};
	self.imgTitle = {};
	get('/api/supplier/recommended', {}, function(data) {
		if (data.success) {
		  for (var index = 0; index < data.msg.length; index++) {
			 self.imgPaths.push(data.msg[index].avatar);
			 self.imgHrefs[data.msg[index].avatar] = self.url + data.msg[index].id;
			 self.imgTitle[data.msg[index].avatar] = data.msg[index].title;
		  }
		} else {
		  console.log(data.msg);
		}
	}, false);
  },
  components: {SupplierRecom}
}
</script>

<style scoped>
.right_panel{
	float: right;
	width: 180px;
    height: 160px;
	border: 1px solid #e5e5e5;
	background: #fff;
	padding: 10px 9px;
	margin-bottom: 8px;
	margin-left: 20px;
}
.right_panel h3 span{
	float: left;
	padding-left:10px;
}
.right_panel h3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
	padding-left:10px;
}
.right_panel img{
	width:120px;
	height:120px;
	margin-left:20px;
}

</style>
