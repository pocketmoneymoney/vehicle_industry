<template>
  <div class="product_list clearfix">
    <div class="product_list_title clearfix">
      <h3 v-if="type === 'product'">产品列表</h3>
      <h3 v-if="type === 'equipment'">设备列表</h3>
      <h3 v-if="type === 'certification'">认证列表</h3>
      <a v-if="isOwner" @click='addElement(newUrl)' 
		 style="margin-right:20px;cursor:pointer">添加</a>
	  <div style="clear:both;"> </div>
    </div>
    <div class="product_list_main clearfix">
      <ul v-for="element in listElement">
        <li v-if="type === 'product'">
		  <product :type="type" :product="element" :isOwner="isOwner"></product>
		</li>
        <li v-if="type === 'equipment'">
		  <equipment :type="type" :equipment="element" :isOwner="isOwner"></equipment>
		</li>
        <li v-if="type === 'certification'">
		  <certification :type="type" :certification="element" :isOwner="isOwner"></certification>
		</li>
      </ul>
    </div>
  </div>
</template>

<script src="./element.js"></script>

<style scoped>
.product_list{
	width: 900px;
	border: 1px solid #00a6aa;
	background: #fff;
	float: left;
	padding: 0px 0px;
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
  /*
  float:left;
  font-size: 32px;
  font-weight: normal;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  border-left: 6px solid #3d9ccc;
  */
  color: #fff;
  margin: 0 0 10px 0;
  height: 40px;
  line-height: 40px;
  background-color: #00a6aa;
  font-size: 16px;
  font-weight: normal;
  padding: 0 15px;
}

.product_list div a{
	float: right;
	width: 64px;
    text-align:center;
	font-size: 13px;
	line-height: 26px;
  	margin-bottom: 10px;
  	border-radius:0.2em; 
  	background:#3d9ccc; 
  	color:#fff;
}
.product_list_title {
  border-bottom: 1px solid #f0f0f0;
  padding: 0 0px;
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
.product_list_main {
padding: 0 20px;
}
</style>
