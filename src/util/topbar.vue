<template>
  <div class="top_bar">
  	<div class="main clearfix">
  		<div class="top_right">
  			<a>欢迎来到OE汽车</a>
  			<a href="../register/login.aspx" id="TitleControl1_lab_sign">Sign in</a>
  			<a href="../register/login.aspx" id="TitleControl1_lab_my" class="account_icon">我的账户</a>
  		</div>
  	</div>
  </div>
</template>

<style>
.top_bar{
	height: 30px;
	border-bottom: 1px solid #c7c7c6;
}

/*左侧账户*/
.account_message{
	float: left;
	height: 30px;
	line-height: 30px;
	font-size:12px;
}
.welcome{
	color: #449cd7;
	float: left;
}
.account_message ul{
	float: left;
	height: 30px;
}
.account_message ul li{
	float: left;
	font-size: 12px;
	color: #666666;
	margin-left: 5px;
	line-height: 30px;
	height: 30px;
}
.account_message ul li.spread{
	color: #ddd;
}
.account_message ul li a{
	color: #666;
}
.account_message ul li a.hasNumber{
	color: #ff0000;
}
/*
.message_top{
	background: url('../styImg/header/message_icon.jpg') 0 11px no-repeat;
	padding-left: 20px;
}*/

/*顶部右侧*/
.top_right{
	float: right;
	height: 30px;
	line-height: 30px;
	font-size: 12px;
}
.top_right a{
	display: block;
	height: 30px;
	float: left;
}
/*
.vip_entry{
	color: #ff0000;
	padding-left: 30px;
	background: url('../styImg/header/vip_icon.png') 0 8px no-repeat;
	margin-right: 10px;
}
*/
.account_icon{
	color: #666666;
	background: url('../../img/account_icon.png') 0 8px no-repeat;
	padding-left: 20px;
}

</style>
