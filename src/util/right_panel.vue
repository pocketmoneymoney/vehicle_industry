<template>
  <div class="right_pabel_nav">
  <div class="right_panel">
    <h3>
        <span>供应商推荐</span>
    </h3>
    <component :is="component"></component>
  </div>
  <div class="right_panel">
    <h3>
        <span>关注OE汽车微信公众号</span>
		<img :src="qrcode"/>
    </h3>
  </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'height'],
  computed: {
    title: function() {
      if (this.product === "supplier") {
        return "供应商推荐";
      }
    },
    component: function() {
    }
  },
  mounted: function() {
    var self = this;
    $('.right_panel').height(this.height);
	get('/api/admin/qrcode', {}, function(data) {
		self.qrcode = data;
    }, false);
  },
  data: function() {
    var qrcode = '';
    return {
      qrcode: ''
    }
  },
  components: {}
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
