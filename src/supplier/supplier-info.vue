<template>
  <div>
	<h2>我的个人资料</h2>
    <div class="list_panel">
	  <h3>基本资料</h3>
	  <table>
	    <tr><td>姓    名</td><td>xxx</td></tr>
	    <tr><td>公    司</td><td>xxx</td></tr>
	    <tr><td>电    话</td><td>xxx</td></tr>
	    <tr><td>联系方式</td><td>xxx</td></tr>
	    <tr><td>邮箱地址</td><td>xxx</td></tr>
	  </table>
    </div>
    <div class="list_panel">
	  <h3>采购记录</h3>
    </div>
    <div class="list_panel">
	  <h3>活动记录</h3>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      product: "purchase",
      title: "最新采购",
      component: "list-purchase"
    }
  },
  components: {}
}
</script>

<style scoped>
.list_panel{
	width: 698px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px;
	margin-bottom: 8px;
}
.list_panel h3 span{
	float: left;
}
.list_panel h3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
}

</style>
