<template>
  <div class="clearfix">
  <div class="company_brief clearfix">
    <h1>AAAA{{ company.name }}</h1>
    <div><a v-if="isOwner" href="/src/company/edit_brief.html">修改</a></div>
    <img :src="imgUrl + company.avatar" />
    <span>BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB{{ company.brief }}</span>
  </div>
  <div class="company_basic clearfix">
    <div><a v-if="isOwner" href="/src/company/edit_info.html">修改</a></div>
    <ul>
      <li>
        <span>公司地区</span>{{company.location}}
      </li>
      <li>
        <span>总资产</span>100
      </li>
    </ul>
  </div>
  <list-ele type="product" :listEle="company.products" :isOwner="isOwner"></list-ele>
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
.company_brief{
	width: 898px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px;
	margin-bottom: 8px;
}

.company_brief img{
  float: right;
	margin:0 auto 5px auto;
	border:1px solid #e5e5e5;
	width: 112px;
	height: 112px;
}
.company_brief h1 {
  float: left;
  margin-right: 20px;
}
.company_brief span {
  width: 856px;
}
.company_basic{
	width: 278px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: right;
	padding: 19px 20px;
	margin-bottom: 8px;
}

.company_basic ul {
  padding: 20px;
  list-style: none;
}
.company_basic ul li {
  font-size: 12px;
  color: #444444;
  line-height: 22px;
  margin: 5px 0px;
  zoom: 1;
  word-wrap: break-word;
  word-break: break-all;
}
.company_basic ul li:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
.company_basic ul li span {
  font-size: 12px;
  color: #999999;
  margin-right: 10px;
  text-align: right;
  display: block;
  float: left;
}

.company_brief div a{
	float: left;
	width: 64px;
	background: #e2f5ff; /*url('../styImg/xunpan/message_icon.png') 15px center no-repeat;*/
	font-size: 13px;
	line-height: 26px;
	margin-top: 30px;
	border-radius: 3px;
  border:1px solid #c8eafa;
  text-align:center;
  color:#3d9ccc;
}
.company_basic div a{
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
