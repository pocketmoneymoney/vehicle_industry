<template>
  <div class="list_position clearfix">
    <h3>
        <span>最新职位</span>
    </h3>
    <!--中间列表 切换-->
    <!--div class="middle_list tabArea">
        <div class="tabhd middle_list_title">
            <ul>
                <li><a href="product_list.aspx">Product List</a></li>
                <li class="cur"><a href="position_list.aspx">Company List</a></li>
            </ul>
        </div-->
                <ul class="product_list">
                    
                    <li v-for="position in positions">
                        <h4 class="position_title"><a href="../supplierEC/show_index.aspx?op=2382">{{ position.name }}</a></h4>
                        <div class="position_list_left">
                            <p>
                                <!--a href="pro_com_detail.aspx?op=32846"><img width="110px" src='../admin/file/img/20180129095347897.jpg' /></a-->
                                <em>Window Switch For Chevrolet/GMC 15151356 IWSGM021</em>
                            </p>
                            
                        </div>
                        <div class="position_list_right">
                            <dl>
                                <dt>主要产品</dt>
                                <dd>{{ position.products }}</dd>
                            </dl>
                            <!--dl>
                                <dt>Total Revenue:</dt>
                                <dd>USD 1000,000 - 2500,000</dd>
                            </dl>
                            <dl>
                                <dt>Bussiness Type:</dt>
                                <dd>Manfacturer,Trading Company</dd>
                            </dl-->
                            
                        </div>
                    </li>
                </ul>
  </div>
</template>

<script src="./list_position.js"></script>

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
.middle_list_content{
	background: #fff;
	padding: 20px;
}

.list_position{
	width: 898px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px;
	margin-bottom: 8px;
}
.list_position h3 {
  height: 42px;
}
.list_position h3 span{
	float: left;
  padding-top: 15px;
  padding-left: 15px;
}
.list_position h3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
}

.middle_list_content{
	background: #fff;
	padding: 20px;
}

/*
.product_content_title{
	height: 36px;
	background: #f5f5f5;
	padding: 0 10px;
}
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
.position_title{
	color: #449cd7;
	font-size: 14px;
	line-height: 22px;	
	height: 22px;
	margin-bottom: 15px;
}
.position_title a{
	color: #449cd7;
}
.position_title a:hover{
	color: #73c5ec;
}
.position_list_left{
	float:right;
	width: 385px;
	height: 165px;
}
.position_list_left p{
	float: right;
	width: 120px;
	margin-right: 10px;
}
.position_list_left img{
	display: block;
	margin:0 auto 5px auto;
	border:1px solid #e5e5e5;
	width: 112px;
	height: 112px;
}
.position_list_left em{
	display: block;
	text-align: center;
	font-size: 12px;
	line-height: 20px;
	font-style: normal;
	color: #666;
	height: 60px;
	overflow: hidden;
}
.position_list_right{
	float: left;
	width: 390px;
	height: 165px;
}
.position_list_right dl{
	overflow: hidden;
	font-size: 12px;
}
.position_list_right dl dt{
	float: left;
	width: 100px;
	padding-right: 20px;
	line-height: 22px;
	color: #999;
}
.position_list_right dl dd{
	float: left;
	width: 270px;
	line-height: 22px;
	color: #333;
}

</style>
