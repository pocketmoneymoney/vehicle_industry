<template>
  <div class="clearfix">
  <div class="company_panel clearfix">
	<div>
      <h1>{{ company.name }}</h1>
	</div>
    <img :src="imgUrl + company.avatar" />
	<div style="clear:both;"> </div>
	<div>
      <h2>公司简介</h2>
      <span>{{ company.brief }}</span>
	</div>
	<div style="clear:both;"> </div>
	<div>
      <h2>配套客户</h2>
      <span>{{ company.customer }}</span>
	</div>
	<div style="clear:both;"> </div>
	<div>
      <h2>主营产品</h2>
      <span>{{ company.product }}</span>
	</div>
    <div><a v-if="isOwner" :href="editBriefURL" style="float:right;">修改</a></div>
  </div>
  <div class="company_right_panel clearfix">
    <ul>
      <li>
        <h5>公司地区</h5> <span>{{company.location}} </span>
      </li>
      <li>
        <h5>成立时间</h5> <span>{{company.createTime}} </span>
      </li>
      <li>
        <h5>法人代表</h5> <span>{{company.operator}} </span>
      </li>
      <li>
        <h5>总资产</h5> <span>{{company.assets}} </span>
      </li>
    </ul>
    <div><a v-if="isOwner" :href="editInfoURL">修改</a></div>
  </div>
  <list-ele type="product" :listEle="company.products" :isOwner="isOwner" :ownerID="id"></list-ele>
  <list-ele type="equipment" :listEle="company.equipments" :isOwner="isOwner"></list-ele>
  </div>
</template>

<script src="./detail.js"></script>

<style>
.middle_list{
	border:1px solid #e5e5e5;
	background: #fff;
	margin-top: 60px;
	background: #fff;
}
/*
.middle_list_title{
	height: 37px;
	float: left;
	margin-top: -37px;
}
.middle_list_title ul{
	height: 37px;
	border-left: 1px solid #e5e5e5;
	margin-left: -1px;
}
.middle_list_title ul li{
	float: left;
	height: 35px;
	border:1px solid #e5e5e5;
	border-left: 1px solid #f5f5f5;
	background: #f5f5f5;
	padding: 0 15px;
	font-size: 14px;
	color: #999999;
	line-height: 35px;
}
.middle_list_title ul li a{
	color:#999;
}
.middle_list_title ul li.cur{
	background: #fff;
	border-top: 2px solid #449cd7;
	border-bottom: 1px solid #fff;
	height: 36px;
	line-height: 36px;
	color: #333;
	border-left: 1px solid #fff;
}
.middle_list_title ul li.cur a{
	color: #333;
}*/

.company_right_panel{
	width: 278px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: right;
	padding: 10px 20px;
	margin-bottom: 4px;
}

.company_right_panel ul {
  padding: 5px;
  list-style: none;
}

.company_right_panel h5 {
  padding: 5px;
  list-style: none;
}

.company_right_panel ul li {
  font-size: 12px;
  color: #444444;
  line-height: 22px;
  margin: 5px 0px;
  zoom: 1;
  word-wrap: break-word;
  word-break: break-all;
}
.company_right_panel ul li:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
.company_right_panel ul li span {
  font-size: 12px;
  color: #999999;
  text-align: right;
  display: block;
  float: left;
}

.company_right_panel div a{
	float: right;
	width: 64px;
	display: inline-block;
	background: #e2f5ff; /*url('../styImg/xunpan/message_icon.png') 15px center no-repeat;*/
	font-size: 13px;
	line-height: 26px;
	margin-top: 30px;
	border-radius: 3px;
  border:1px solid #c8eafa;
  text-align:center;
  color:#3d9ccc;
}
</style>
