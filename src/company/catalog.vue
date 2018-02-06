<template>
  <div class="catalog clearfix">
    <h3>
        <span>分类</span>
        <search></search>
    </h3>
    <div class="catalog_main">
        <ul class="catalog_list">
            <li v-for="tab in tabs">
               <sub-catalog :catalog=tab></sub-catalog>
           </li>
        </ul>
    </div>
  </div>
</template>

<script src="./catalog.js"></script>

<style>
.catalog {
	width: 898px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px;
	margin-bottom: 8px;
}
.catalog h3 {
  height: 42px;
}
.catalog h3 span{
	float: left;
  padding-top: 15px;
  padding-left: 15px;
}
/*
.catalog h3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
}
*/
.product_content_title{
	height: 36px;
	background: #f5f5f5;
	padding: 0 10px;
}
/*
.view{
	float: left;
	height: 36px;
	line-height: 36px;
	font-size: 12px;
	color: #333;
}
.view p{
	float: left;
}
.view a{
	width: 15px;
	height: 15px;
	display: inline-block;
	margin-top: 10px;
	margin-left: 10px;
	float: left;
}
.list_icon{
	background: url('../styImg/show/list_icon.jpg') no-repeat;	
}
.label_icon{
	background: url('../styImg/show/label_icon.jpg') no-repeat;
}
*/
.catalog_main {
  padding-left: 20px;
}
.catalog_list {
  padding-left: 0;
}
.catalog_list li{
	border-bottom: 1px dashed #e5e5e5;
	padding: 20px 0;
	overflow: hidden;
}
/*
.catalog_list li:hover{
	box-shadow: 0 0 5px #999;
	padding: 20px 30px;
	width: 788px;
	margin-left: -30px;
	position: relative;
	background: #fff;
}
*/
.catalog_list_left{
	float: left;
	width: 502px;
	height: 180px;
	border-right: 1px solid #e5e5e5;
	padding-right: 40px;
}
.catalog_list_left img{
	display: block;
	float: left;
	width: 178px;
	height: 178px;
	border:1px solid #e5e5e5;
	margin-right: 20px;
}
.catalog_list_left h4{
	height: 44px;
	line-height: 20px;
	font-size: 14px;
	color: #004b91;
	overflow: hidden;
	margin-bottom: 10px;
}
.catalog_list_left h4 a{
	color: #449cd7;
}
.catalog_list_left h4 a:hover{
	color: #73c5ec;
}

.catalog_list_left em{
	display: block;
	height: 24px;
	line-height: 24px;
	font-style: normal;
	font-size: 12px;
	color: #333333
}
.catalog_list_left em span{
	color: #999;
}
.catalog_list_left p{
	height: 60px;
	line-height: 20px;
	font-size: 12px;
	color: #999;
	overflow: hidden;
	margin-top: 10px;
}

.product_company{
	float: right;
	width: 245px;
	padding-left: 40px;
}
.product_company a:hover p{
	color: #449cd7
}
.product_company p{
	height: 40px;
	line-height: 20px;
	font-size: 12px;
	color: #333;
}
.product_company em{
	height: 24px;
	line-height: 24px;
	font-size: 12px;
	color: #333;
	font-style: normal;
}
.flag_contury{
	float: left;
	margin-top: 6px;
	margin-right: 5px;
}
.contact_btn{
	float: left;
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
.chat_btn{
	float: right;
	margin-top: 5px;
}

</style>
