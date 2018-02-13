<template>
  <div class="product_list clearfix">
    <div class="product_list_title clearfix">
    <h3 v-if="type === 'product'">产品列表</h3>
    <h3 v-if="type === 'equipment'">设备列表</h3>
    <a v-if="isOwner" :href="newUrl">添加</a>
    </div>
    <div class="clearfix">
      <ul v-for="ele in listEle">
        <li v-if="type === 'product'"><product :product="ele" :isOwner="isOwner"></product></li>
        <li v-if="type === 'equipment'"><equipment :equipment="ele" :isOwner="isOwner"></equipment></li>
      </ul>
    </div>
  </div>
</template>

<script src="./list_product.js"></script>

<style scoped>
.product_list{
	width: 898px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 0px;
	margin-bottom: 8px;
}

.product_list img{
  float: right;
	margin:0 auto 5px auto;
	border:1px solid #e5e5e5;
	width: 112px;
	height: 112px;
}
.product_list div h3 {
  float:left;
  margin-bottom: 10px;
}
.product_list div a{
	float: right;
	width: 64px;
	background: #e2f5ff; /*url('../styImg/xunpan/message_icon.png') 15px center no-repeat;*/
	font-size: 13px;
	line-height: 26px;
  margin-bottom: 10px;
	border-radius: 3px;
  border:1px solid #c8eafa;
  text-align:center;
  color:#3d9ccc;
}
.product_list_title {
  border-bottom: 1px solid #f0f0f0;
  padding: 0 20px;
}
.product_list div ul{
  list-style: none;
  margin-bottom: 0;
  padding-left: 0;
  margin-left: 0;
}
.product_list div ul li{
  float: left;
  border-bottom: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
  width: 298.5px;
  padding: 23px 25px;
}
</style>
