<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div class="main clearfix">
        <h3>修改密码</h3>
        <div class="main_reg_right formbox">
		  <div>
          <dl>
              <dt><b>*</b><span>请输入旧密码</span></dt>
              <dd>
                  <input v-model="password1" class="text" style="z-index: 10000" maxlength="30"
                      type="password" />
              </dd>
			  <dd> </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>请输入新密码</span></dt>
              <dd><input class="text" style="z-index: 10000" v-model="password2" maxlength="30"
					  type="password" />
              </dd>
			  <dd>
			    <span style="width:350px;">密码不得少于6位，请使用包含数字和字母的组合</span>
			  </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>请再次输入新密码</span></dt>
              <dd><input class="text" style="z-index: 10000" v-model="password3" maxlength="30"
					  type="password" />
              </dd>
			  <dd>
			  </dd>
          </dl>
		  </div>
        </div>
        <div>
        <span class="span01"><a :href="nextURL">取消并返回</a></span>
        <span class="span01"><a @click="modify">确认修改</a></span>
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
      password1: '',
      password2: '',
      password3: '',
	  nextURL:''
    }
  },
  mounted: function() {
	var self = this;
	verifyToken(function (data) {
  	  self.username = data.username;
     
	  if (data.role === 'admin') {
	    self.nextURL = '/src/management/index.html';
      } else if (data.role == 'buyer') {
		self.nextURL = '/src/buyer/index.html';
      } else if (data.role == 'supplier') {
	    self.nextURL = '/src/supplier/index.html';
      }
	});
  },
  methods: {
    modify: function() {
	  var regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
 	  var regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。

      if (this.password1 === '') {
        alert('请输入旧用户密码');
        return;
      }

      if (this.password2.length < 6) {
        alert('您输入的密码长度不满足要求, 请重新填写');
        return;
	  }

      if (!regNumber.test(this.password2) || !regString.test(this.password2)) {
        alert('您输入的密码格式不满足要求, 请重新填写');
        return;
	  }

      if (this.password2 !== this.password3) {
        alert('两次密码不一致');
        return;
      }
	
	  var self = this;
      post('/user/password', {
		username: this.username, 
		password: this.password1,
		password2: this.password2}, function(data) {

        if (data.token) {
          setCookie('token', data.token, 3000);
          window.location.href = self.nextURL;
        } else {
          alert(data.msg);
        }
      }, true);
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

</style>
