<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div class="main clearfix">
        <h3>登 录</h3>
        <div class="main_reg_right formbox">
		  <div>
          <dl>
              <dt><b>*</b><span>用户名：</span></dt>
              <dd>
                  <input v-model="username" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
			  <dd>
			    <span style="width:350px;">请输入登录用户名</span>
			  </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>密码：</span></dt>
              <dd><input class="text"
                  value="" style="z-index: 10000" v-model="password" type="password" />
              </dd>
			  <dd>
			    <span style="width:350px;">请输入登录密码</span>
			  </dd>
          </dl>
		  </div>
        </div>
        <div>
        <span class="span01"><a @click="login">登录</a></span>
        <span class="span01"><a href="/src/register/register.html">前往注册页面>>></a></span>
        </div>
      </div>
	  </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import RightPanel from '../util/right_panel.vue'

import LastFooter from '../util/footer.vue'

export default {
  data: function() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function() {
      if (this.username === '') {
        alert('请输入正确的用户名');
        return;
      }

      if (this.password === '') {
        alert('请输入用户密码');
        return;
      }
 
      if (getCookie('token')) {
        alert('您已登录，请先退出登录');
        return;
      }

      post('/user/login', {
		username: this.username, 
		password: this.password}, function(data) {

        if (data.token) {
          setCookie('token', data.token, 3000);
          setCookie('role', data.role, 3000);
          setCookie('id', data.id, 3000);

          if (data.role === 'admin') {
            window.location.href = '/src/management/index.html';
          } else if (data.role == 'buyer') {
            window.location.href = '/src/buyer/index.html';
		  } else if (data.role == 'supplier') {
            window.location.href = '/src/supplier/index.html';
		  }
        } else {
          alert(data.msg);
        }
      }, false);
    }
  },
  components: {MainHeader, MainNav, TopBar, LastFooter, RightPanel} 
}
</script>

<style lang="scss">
@import '../../css/rem.scss';

.back_wrapper{
  width: t(1200);
  background-color:#f9f9f8;
}
.main{
	width: 1200px;
	margin: 0 auto;
}

.formbox dl {width:780px;height:32px;line-height:26px;margin-top:10px;}
.formbox dt,.formbox dd {float:left;}
.formbox dt {width:190px;text-align:right;font:bolder 14px/26px arial;color:#222;}
.formbox dd {width:250px;color:#000;}
.formbox dd .text {width:222px;height:22px;line-height:22px;border:1px #9D9D9D solid;padding:0  0 0 5px;position:relative;z-index:99;}
.formbox dd .texta {width:99px;}
.formbox dd .textb {width:39px;}
.formbox dd .dda,.formbox dd .ddb,.formbox dd .ddc {float:left;}
.formbox dd .ddb,.formbox dd .ddc {display:inline;}
.formbox dd .cc{float:right;margin-left:0px;}
.formbox dd .rad {font:bold 14px arial;color:#039;line-height:25px;margin-left:5px;margin-left:2px\9;}
.formbox dd .textc {width:452px;height:22px;line-height:22px;border:1px #9D9D9D solid;padding:0  0 0 5px;position:relative;z-index:99;}
.formbox b {color:#f00;padding:5px;}

.span01{ 
	background: #fff;
	border-radius:0.2em; 
	font-size:18px; 
	line-height:26px; 
	text-align:center; 
	color:#3d9ccc; 
	padding-left:20px; 
	padding-right:20px; 
	margin-left: 100px; 
	cursor: pointer;
}

.reg_index_nav{
	height: 400px;
	width: 750px;
	border-bottom: 3px solid #73c5ec;
	border-left: 2px solid #73c5ec;
	border-right: 2px solid #73c5ec;
	border-top: 3px solid #73c5ec;
	padding-bottom: 10px;
	padding-top: 15px;
	margin-bottom: 10px;
	margin-left: 150px;
}

.span02{ 
    float:left;
	display:block; 
	width: 120px; 
	margin-left: 20px; 
	color:#fff; 
	solid: #c8eafa; 
	border-radius:0.2em; 
	font-size:18px; 
	line-height:26px; 
	text-align:center; 
	background:#3d9ccc; 
	padding-left:0px; 
}

</style>
