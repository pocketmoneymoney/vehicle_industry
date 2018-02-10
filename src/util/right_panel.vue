<template>
  <div>
  <div class="right_panel">
    <h3>
        <span>{{ title }}</span>
        <a href="../inquiry/product_list.aspx">More &gt;</a>
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

<script src='./right_panel.js'></script>

<style scoped>
.right_panel{
	width: 258px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: right;
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
