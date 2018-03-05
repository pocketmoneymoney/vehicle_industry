<template>
  <div class="clearfix">
  <div class="company_panel clearfix">
	<div>
      <h1>{{ company.name }}</h1>
	</div>
    <div style="float:right;">
      <img stype="max-width:200px; max-height:100px;" :src="avatar"/>
	  <div style="clear:both;"> </div>
      <div v-if="isOwner" style="float:right">
		<a @click="deleteLogo" style="margin-left:10px;cursor:pointer;">删除</a>
	  </div>
	</div>
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
  <list-element type="product" :listElement="products" :isOwner="isOwner"></list-element>
  <list-element type="equipment" :listElement="equipments" :isOwner="isOwner"></list-element>
  <list-element type="certification" :listElement="certifications" :isOwner="isOwner"></list-element>
  <div class="company_panel clearfix">
	<div>
      <h2>联系方式</h2>
	  <hr style="height:5px;border:none;border-top:5px groove skyblue;" />
      <span>联系人：{{ company.officalContact }}</span>
      <span>公司电话：{{ company.officalPhone }}</span>
      <span>公司邮箱：{{ company.officalEmail }}</span>
      <span>公司主页：{{ company.link }}</span>
      <span>公司地址：{{ company.address }}</span>
	</div>
  </div>
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
  padding-left: 0px;
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
	font-size: 13px;
	line-height: 26px;
	margin-top: 30px;
  	border-radius:0.2em; 
  	text-align:center;
  	background:#3d9ccc; 
  	color:#fff;
}
</style>
