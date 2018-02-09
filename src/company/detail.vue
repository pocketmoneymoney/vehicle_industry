<template>
  <div class="clearfix">
  <div class="company_brief clearfix">
    <h1>{{ company.name }}</h1>
    <p>{{ company.brief }}</p>
  </div>
  <div class="company_basic clearfix">
    <ul>
      <li>
        <span>公司地区</span>{{company.location}}
      </li>
      <li>
        <span>总资产</span>100
      </li>
    </ul>
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

</style>
