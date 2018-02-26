<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div>
         <event-enroll-panel></event-enroll-panel>
      <div class="main_middle clearfix">
        <div class="formbox clearfix">
		  <div class="info_panel2">
          <h2>修改密码</h2>
	      <div style="clear:both;"> </div>
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
	      <div style="clear:both;"> </div>
          <div>
            <span><a :href="nextURL">取消</a></span>
            <span><a @click="modify">确认修改</a></span>
          </div>
          </div>
        </div>
      </div>
	      <right-panel></right-panel>
      </div>
	  </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import EventEnrollPanel from '../util/event_enroll_panel.vue'
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
  components: {MainHeader, MainNav, TopBar, LastFooter, RightPanel, EventEnrollPanel} 
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
