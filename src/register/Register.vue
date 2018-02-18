<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div class="main clearfix">
        <h3>注册新用户</h3>
        <div class="main_reg_right formbox">
		  <span class="span02"> 基本资料 </span>
		  <div class="reg_index_nav">
          <dl>
              <dt><b>*</b><span>用户名：</span></dt>
              <dd>
                  <input v-model="username" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
			  <dd>
			    <span style="width:350px;">用于账户登录</span>
			  </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>联系人真实姓名：</span></dt>
              <dd>
                  <input v-model="personName" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
			  <dd></dd>
          </dl>
          <dl>
              <dt><b>*</b><span>密码：</span></dt>
              <dd><input class="text"
                  value="" style="z-index: 10000" v-model="password1" type="password" />
              </dd>
			  <dd>
			    <span style="width:350px;">密码不得少于6位，请使用包含数字和字母的组合</span>
			  </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>确认密码：</span></dt>
              <dd><input class="text" v-model="password2"
                  style="z-index: 10000" type="password" />
              </dd>
			  <dd></dd>
          </dl>
          <dl>
              <dt><b>*</b><span>联系电话：</span></dt>
              <dd>
                  <input v-model="phone" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
			  <dd></dd>
          </dl>
          <dl>
              <dt><b>*</b><span>邮箱：</span></dt>
              <dd>
                  <input v-model="email" class="text" style="z-index: 10000" name="email" type="text" />
              </dd>
			  <dd></dd>
          </dl>
          <dl>
              <dt><b>*</b><span>角色：</span></dt>
              <dd>
                  <label class="dda">
                      <input type="radio" value="supplier" v-model="role" /><span class="rad">我是供应商&nbsp;</span></label>
                  <label class="ddb" style="margin-left: 25px;">
                      <input type="radio" value="buyer" v-model="role" /><span class="rad">我是采购商 </span>
                  </label>
              </dd>
			  <dd></dd>
          </dl>
		  </div>
          <div v-if="role === 'supplier'">
		    <span class="span02"> 详细资料 </span>
		    <div class="reg_index_nav" style="height: 180px;">
              <dl>
                  <dt><b>*</b><span>公司名称：</span></dt>
                  <dd>
                      <input v-model="companyName" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>主营产品：</span></dt>
                  <dd>
                      <input v-model="product" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>配套客户：</span></dt>
                  <dd>
                      <input v-model="customer" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
           </div>
          </div>
        </div>
        <div>
        <span class="span01"><a href="/src/redirect/login.html"><<< 我有帐户，直接登录</a></span>
        <span class="span01"><a @click="register">注册</a></span>
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
      email: '',
      password1: '',
      password2: '',
      role: '',
      personName: '',
      phone: '',
      companyName: '',
      product: '',
      customer: '',
      id: ''
    }
  },
  methods: {
    register: function() {
	  var regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
 	  var regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。

      if (this.username === '' || this.email === '' || this.phone === '' ||
		  this.password1 === '' || this.password2 === '' || this.role === '') {
        alert('请填写完整资料');
        return;
      }

      if (this.password1.length < 6) {
        alert('您输入的密码长度不满足要求, 请重新填写');
        return;
	  }
      if (!regNumber.test(this.password1) || !regString.test(this.password1)) {
        alert('您输入的密码格式不满足要求, 请重新填写');
        return;
	  }
      if (this.password1 !== this.password2) {
        alert('两次密码不一致');
        return;
      }

      if (this.role === "supplier") {
        if (this.companyName === '' || this.product === '' || 
			this.customer === '') {
          alert('请填写完整资料');
          return;
        }
      }

      var self = this;
      post('/user/register', {
				username: this.username, 
				password: this.password1, 
				role: this.role}, function(data) {
        if (data.success) {
          setCookie('token', data.token, 3000);
          setCookie('role', self.role, 3000);
          setCookie('id', data.id, 3000);

          if (self.role == 'supplier') {
            post('/api/supplier/' + data.id, {
			  name: self.personName,
			  phone: self.phone,
              email: self.email,
			  company: self.companyName,
			  product: self.product,
			  customer: self.customer}, function (data) {
                window.location.href = '/src/supplier/index.html';
		    }, false);
          } else if (self.role == 'buyer') {
            window.location.href = '/src/buyer/index.html';
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
	margin-left: 150px; 
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
