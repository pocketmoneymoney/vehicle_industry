<template>
  <div>
	<div class="title_bar" style="width:750px"> 
      <a class="title_bar_a"> 最新采购</a>
      <search @searchBar="searchBar"></search>
	</div> 
  <div class="list_purchase_product clearfix">
    <div class="middle_list_content">
        <div class="item">
            <ul class="product_list">
                <li v-for="purchase in purchases">
                   <div class="product_list_left">
                       <h4><a>{{ purchase.name }}</a></h4>
					   <h5>[ {{purchase.type}}] {{purchase.productName}}</h5>
                       <em><span>尺寸/重量/材质/制造工艺: {{purchase.material}} </span> </em>
                       <em><span>年采购量/采购金额: {{purchase.amount}} </span> </em>
                       <em><span>车型: {{purchase.detailType}} </span> </em>
                       <em><span>产品其它描述: {{purchase.description}} </span> </em>
                       <em><span>对供应商要求:  {{purchase.supplier}} </span> </em>
                   </div>
                   <a :href="enrollUrl + purchase.id" class="contact_btn">我要报名</a>
               </li>
            </ul>
        </div>
     </div>
     <page :curPage="curPage" :totalPage="totalPage" @pageChanged="changePage"></page>
  </div>
  </div>
</template>

<script src="./list_purchase_product.js"></script>

<style>
.list_purchase_product{
	max-width: 750px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px;
	margin-bottom: 8px;
}
.list_purchase_product h3 span{
	float: left;
  	padding-top: 5px;
  	padding-left: 15px;
}
.list_purchase_product h3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
}

.middle_list_content{
	background: #fff;
	padding: 20px;
}

.product_content_title{
	height: 36px;
	background: #f5f5f5;
	padding: 0 10px;
}
.product_list li{
	border-bottom: 1px dashed #e5e5e5;
	padding: 20px 0;
	overflow: hidden;
}
.product_list_left{
	float: left;
	width: 730px;
	border-right: 2px solid #e5e5e5;
	padding-right: 10px;
}
.product_list_left img{
	display: block;
	float: right;
	max-width: 250px;
	max-height: 200px;
	border:1px solid #e5e5e5;
	margin-right: 20px;
}
.product_list_left h4{
	line-height: 20px;
	font-size: 20px;
	color: #004b91;
	overflow: hidden;
	margin-bottom: 10px;
}
.product_list_left h4 a{
	color: #449cd7;
}
.product_list_left h4 a:hover{
	color: #73c5ec;
}

.product_list_left em{
	display: block;
	height: 24px;
	line-height: 24px;
	font-style: normal;
	font-size: 12px;
	color: #333333
}
.product_list_left em span{
	color: #999;
}
.product_list_left p{
	line-height: 20px;
	font-size: 12px;
	color: #999;
	overflow: hidden;
	margin-top: 10px;
}

.contact_btn{
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
.chat_btn{
	float: right;
	margin-top: 5px;
}

</style>
