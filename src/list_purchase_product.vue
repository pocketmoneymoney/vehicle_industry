<template>
  <div class="list_purchase_product">
    <h3>
        <span>采购项目</span>
        <a href="../inquiry/product_list.aspx">More &gt;</a>
    </h3>
    <div class="tabbd middle_list_content tabbd">
        <div class="item">
            <!--div class="product_content_title">
                <div class="view">
                    <p>View as</p>
                    <a href="" class="list_icon"></a>
                    <a href="" class="label_icon"></a>
                </div>
                <div class="simple_page">
                    
                </div>
            </div-->
            <ul class="product_list">
                
                <li v-for="purchaseProduct in purchaseProducts">
                   <div class="product_list_left">
                       <!--a href="pro_com_detail.aspx?op=32863"><img src='../admin/file/img/20180129103901822.jpg' /></a-->
                       <h4><a href="pro_com_detail.aspx?op=32863">{{ purchaseProduct.product }}</a></h4>
                       <em><span>OEM No/Model:</span></em>
                       <em><span>Application:</span></em>
                   </div>
                   <div class="product_company">
                       <a href="../supplierEC/show_index.aspx?op=2382"><p>{{ purchaseProduct.company }}</p></a>
                       <!--em>
                           <img src='../admin/file/icon/China.gif' alt="" class="flag_contury">China
                       </em-->
                       <a href="contact2.aspx?bid=2382&pid=32863" class="contact_btn">我要报名</a>
                       
                   </div>
               </li>
            </ul>
        </div>
     </div>
  </div>
</template>

<script src="./list_purchase_product.js"></script>

<style>
.list_purchase_product{
	width: 898px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px;
	margin-bottom: 8px;
}
.list_purchase_product h3 span{
	float: left;
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
.product_list li{
	border-bottom: 1px dashed #e5e5e5;
	padding: 20px 0;
	overflow: hidden;
}
/*
.product_list li:hover{
	box-shadow: 0 0 5px #999;
	padding: 20px 30px;
	width: 788px;
	margin-left: -30px;
	position: relative;
	background: #fff;
}
*/
.product_list_left{
	float: left;
	width: 502px;
	height: 180px;
	border-right: 1px solid #e5e5e5;
	padding-right: 40px;
}
.product_list_left img{
	display: block;
	float: left;
	width: 178px;
	height: 178px;
	border:1px solid #e5e5e5;
	margin-right: 20px;
}
.product_list_left h4{
	height: 44px;
	line-height: 20px;
	font-size: 14px;
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
