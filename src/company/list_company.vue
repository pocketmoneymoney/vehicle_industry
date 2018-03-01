<template>
  <div class="list_company clearfix">
    <h3>
        <search @searchBar="searchBar"></search>
    </h3>
    <!--中间列表 切换-->
	<div class="crumb">
		<a href="/src/company/index.html">公司</a> > <a>{{ selectCategory }}</a> > <a>{{ selectSubtype }}</a> > <a> {{ selectItem }} </a>
	</div>
    <div class="screening_box">
        <dl>
           <dd style="margin-top:10px; margin-bottom:10px; border-bottom: 1px dashed #FFCCFF">
             <a>类别:</a>
			 <a  @click="chooseCategory(null)">不限</a>
			 <a v-for="item in categoryBar" @click="chooseCategory(item)">{{ item }}</a>
           </dd>
           <dd style="margin-top:10px; margin-bottom: 10px; border-bottom: 1px dashed #FFCCFF">
             <a>子类别:</a>
			 <a  @click="chooseSubtype(null)">不限</a>
			 <a v-for="item in subtypeBar" @click="chooseSubtype(item)">{{ item }}</a>
           </dd>
           <dd style="margin-top:10px; margin-bottom:10px;">
             <a>具体类别:</a>
			 <a  @click="chooseItem(null)">不限</a>
			 <a v-for="item in itemBar" @click="chooseItem(item)">{{ item }}</a>
           </dd>
        </dl>
    </div>
        <ul class="product_list">
            <li v-for="company in companies">
                <div class="company_list_right">
                   	<h4 class="company_title">
						<a :href="detailUrl + company.id">{{ company.name }}</a>
					</h4>
                	<div class="basic_info">
                    	<span class="address">{{ company.location }}</span>
                	</div>
                    <dl>
                        <em><dt>主要产品</dt></em>
                        <dd>{{ company.product }}</dd>
                    </dl>
                </div>
                <div class="company_list_left">
                   	<p>
                   	    <img width="110px" :src='company.avatar' />
                   	</p>
	  				<div style="clear:both;"> </div>
            		<a :href="detailUrl + company.id" class="contact_btn">更多详情</a>
                </div>
            </li>
        </ul>
     <page :curPage="curPage" :totalPage="totalPage" @pageChanged="changePage"></page>
  </div>
</template>

<script src="./list_company.js"></script>

<style>
.middle_list{
	border:1px solid #e5e5e5;
	background: #fff;
	margin-top: 60px;
	background: #fff;
}
.middle_list_content{
	background: #fff;
	padding: 20px;
}

.list_company{
	width: 740px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px;
	margin-bottom: 8px;
}
.list_company h3 {
  height: 42px;
}
.list_company h3 span{
	float: left;
  padding-top: 15px;
  padding-left: 15px;
}

.middle_list_content{
	background: #fff;
	padding: 20px;
}

.product_list li{
	border-bottom: 1px dashed #e5e5e5;
	padding: 20px 0;
	overflow: hidden;
}
.product_list h4 {
  margin-top: 10px;
  margin-bottom: 10px;
}
.company_title{
	color: #449cd7;
	font-size: 14px;
	line-height: 22px;	
	height: 22px;
	margin-bottom: 15px;
  margin-top: 0;
}
.company_title a{
	color: #449cd7;
}
.company_title a:hover{
	color: #73c5ec;
}
.company_list_left{
	float:right;
	width: 200px;
	height: 165px;
}
.company_list_left p{
	float: right;
	width: 120px;
	margin-right: 10px;
}
.company_list_left img{
	display: block;
	margin:0 auto 5px auto;
	border:1px solid #e5e5e5;
	width: 112px;
	height: 112px;
}
.company_list_left em{
	display: block;
	text-align: center;
	font-size: 12px;
	line-height: 20px;
	font-style: normal;
	color: #666;
	height: 60px;
	overflow: hidden;
}
.company_list_right{
	float: left;
	width: 350px;
}
.company_list_right dl{
	overflow: hidden;
	font-size: 12px;
}
.company_list_right dl dt{
	float: left;
	width: 100px;
	padding-right: 20px;
	line-height: 22px;
	color: #999;
}
.company_list_right dl dd{
	float: left;
	width: 250px;
	line-height: 22px;
	color: #333;
}

.crumb{
	margin: 10px 0;
	float: none;
  color: #666;
  padding-left: 16px;
}
.crumb a {
  font-size: 12px;
  line-height: 20px;
  color: #666;
  text-decoration: none;
}
.screening_box{
	border:1px solid #449cd7;
	background: #eff8fc;
	padding: 10px 20px 0 20px;
}
.screening_box dl{
	overflow: hidden;
	font-size: 14px;
	margin-bottom: 10px;
}
.screening_box dl dt{
	float: left;
	width: 140px;
	height: 22px;
	line-height: 22px;
	color: #526177
}
.screening_box dl dd{
	float: left;
	width: 830px;
	line-height: 22px;
}
.screening_box dl dd a{
	display: inline-block;
	margin: 0 10px;
	color: #888888;
  cursor:pointer;
}
.screening_box dl dd a:hover{
  text-decoration: none;
}
/* only ".current_item" will be overwritten by ".screening_box dl dd a"*/
.screening_box dl dd .current_item {
  color: #449cd7;
}
.basic_info {
  margin-bottom: 10px;
}
.address{ 
  background:url(/img/supplier_icon.gif) no-repeat 0 -117px; 
  padding-left:15px;
  margin-right: 10px;
  font-size: 12px;
  color: #999999;
}

</style>
