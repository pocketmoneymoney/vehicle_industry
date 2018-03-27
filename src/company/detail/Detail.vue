<template>
  <div class="clearfix">
  <img v-if="hasPoster" :src="poster" style="width:1200px"/>
  <div class="company_panel clearfix">
  <h4>公司简介</h4>
  <div class="clearfix company_panel_content">
	  <div>
        <h1>{{ company.name }}
        <img v-if="isVerified" title="OE会员" src="/img/verified_company.jpg" style="width:15px;"/>
        </h1>
	  </div>
      <div style="float:right;">
        <img class="company_avatar" :src="avatar"/>
	    <div style="clear:both;"> </div>
        <div v-if="isOwner" style="float:right">
	  	  <a @click="deleteLogo" style="margin-left:10px;cursor:pointer;">删除</a>
	    </div>
	  </div>
	  <div style="clear:both;"> </div>
	  <div>
        <h2>公司介绍</h2>
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
  </div>
  <div class="fixed_right_panel">
  <div class="company_right_panel company_contact clearfix">
    <h4>公司信息</h4>
      <span>公司地区：{{ company.location }}</span>
      <span>成立时间：{{ company.createTime }}</span>
      <span>法人代表：{{ company.operator }}</span>
      <span>总资产：{{ company.assets }}</span>
    <!--ul>
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
    </ul-->
    <div><a v-if="isOwner" :href="editInfoURL">修改</a></div>
  </div>
  <div class="company_contact company_right_panel clearfix">
      <h4>联系方式</h4>
      <span>联系人：{{ company.officalContact }}</span>
      <span>公司电话：{{ company.officalPhone }}</span>
      <span>公司邮箱：{{ company.officalEmail }}</span>
      <span>公司主页：{{ company.link }}</span>
      <span>公司地址：{{ company.address }}</span>
  </div>
  </div>
  <list-element type="product" :listElement="products" :isOwner="isOwner"		
				:isVerified="isVerified"></list-element>
  <list-element type="equipment" :listElement="equipments" :isOwner="isOwner"
				:isVerified="isVerified"></list-element>
  <list-element type="certification" :listElement="certifications" :isOwner="isOwner"
				:isVerified="isVerified"></list-element>
  </div>
</template>

<script src="./detail.js"></script>

<style>
.middle_list{
	border:1px solid #00a6aa;
	background: #fff;
	margin-top: 60px;
	background: #fff;
}

.fixed_right_panel{
	position:fixed;
	margin-left: 920px;
}

.company_right_panel{
	width: 280px;
	border: 1px solid #00a6aa;
	background: #fff;
	margin-bottom: 15px;
}

.company_right_panel ul {
  padding: 0 20px;
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
	margin: 20px 10px 10px 10px;
  	border-radius:0.2em; 
  	text-align:center;
  	background:#3d9ccc; 
  	color:#fff;
}
.company_panel h4 {
  color: #fff;
  margin: 0 0 10px 0;
  height: 40px;
  line-height: 40px;
  background-color: #00a6aa;
  font-size: 16px;
  font-weight: normal;
  padding: 0 15px;
}
.company_right_panel h4 {
  color: #fff;
  margin: 0 0 10px 0;
  height: 40px;
  line-height: 40px;
  background-color: #00a6aa;
  font-size: 16px;
  font-weight: normal;
  padding: 0 15px;
}
.company_panel_content {
  padding: 0 20px 20px 20px;
}
.company_avatar{
	display: block;
	margin:10px auto 5px auto;
	max-width:250px;
  float: right;
	border:1px solid #e5e5e5;
	min-width: 112px;
	height: 112px;
}

.company_contact span {
  width: 278px;
  float: left;
  padding-top:5px;
  padding-left:15px;
  padding-right:15px;
  padding-bottom:5px;
}
</style>
