<template>
  <div class="top_bar">
  	<div class="main clearfix">
  		<a>欢迎来到OE汽车</a>
  		<div class="top_right">
  			<a v-if="isLogin && isAdmin" href="/src/management/index.html">管理员页面</a>
  			<a v-if="isLogin && isBuyer" href="/src/buyer/index.html">我的首页</a>
  			<a v-if="isLogin && isSupplier" href="/src/supplier/index.html">我的首页</a>
  			<a v-if="isLogin" @click="logout" href="/src/index.html" class="account_icon">退出登录</a>
        <div v-else class="login">
           <input type="text" placeholder="请输入用户名" v-model="username"/>
           <input type="password" placeholder="请输入密码" v-model="password"/>
  			   <a @click="login">登录</a>
  			   <a href="/src/register.html">注册</a>
        </div>
  		</div>
  	</div>
  	<div class="main clearfix">
		<img :src="logo">
        <div class="top_right_two">
        <advertise></advertise>
		</div>
    </div>
  </div>
</template>

<script>
import Advertise from './advertise.vue'

export default {
  data() {
    var isLogin = false;
    var isAdmin = false;
    var isBuyer = false;
    var isSupplier = false;
    var logo = "";
    return {
      isLogin: isLogin,
      isAdmin: isAdmin,
      isBuyer: isBuyer,
      isSupplier: isSupplier,
      username: "",
      password: "",
      logo: ""
    }
  },
  methods: {
    login: function() {
      if (this.username === '' || this.password === '') {
        alert('用户名或密码为空');
        return;
      }
      var self = this;
      post('/user/login', {username: this.username, password: this.password}, function(data) {
        if (data.token) {
          setCookie('token', data.token, 3000);
          self.isLogin = true;
          if (data.role === 'admin') {
            self.isAdmin = true;
          } else if (data.role == 'buyer') {
            self.isBuyer = true;
		  } else if (data.role == 'supplier') {
            self.isSupplier = true;
		  }
        } else {
		  alert('用户登陆失败，请输入正确的用户名和密码');
		}
      }, false);
    },
    logout: function() {
      delCookie('token');
      this.isLogin = false;
      this.isAdmin = false;
      this.isBuyer = false;
      this.isSupplier = false;
    }
  },
  mounted: function() {
    var self = this;

	get('/api/admin/logo', {}, function(data) {
		self.logo = data;
    }, false);

    if (getCookie('token') != "") {
      post('/user/book', {}, function(data) {
        if (data.username) {
          self.isLogin = true;
          console.log(self.isLogin);
          if (data.role === 'admin') {
            self.isAdmin = true;
          } else if (data.role == 'buyer') {
            self.isBuyer = true;
		  }
        }
      }, true);
    }
  },
  components: {Advertise}
}
</script>

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

.main a {
	font-size: 13px;
	line-height: 30px;
}
/*顶部右侧*/
.top_right{
	float: right;
	height: 30px;
	line-height: 30px;
	font-size: 12px;
}

.top_right_two{
    float:right;
	height: 30px;
    width: 400px; 
	margin-right: 150px;
	margin-top: 20px;
}

.login {
	display: block;
	height: 30px;
	float: left;
}
.login input{
  float:left;
  height: 26px;
  margin-top: 2px;
  font-size:12px;
  line-height:18px;
  margin-right:10px;
}
.login a{
  float:left;
  margin-right:10px;
  cursor: pointer;
}
.top_right a{
	display: block;
	height: 30px;
	float: left;
  margin-right: 10px;
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
