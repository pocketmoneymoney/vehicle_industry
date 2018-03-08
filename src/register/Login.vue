<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
      <div class="main_middle clearfix" style="margin-left:230px">
        <div class="formbox clearfix">
		  <div class="title_bar" style="width:740px"> 
            <a class="title_bar_a">登录</a>
		  </div> 
		  <div class="info_panel2">
	      <div style="clear:both;"> </div>
          <dl>
              <dt><b>*</b><span>用户名：</span></dt>
              <dd>
                  <input v-model="username" class="text" style="z-index: 10000" 
				   maxlength="20" type="text" />
              </dd>
			  <dd>
			    <span>请输入登录用户名</span>
			  </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>密码：</span></dt>
              <dd><input class="text" style="z-index: 10000" v-model="password" 
				   type="password" />
              </dd>
			  <dd>
			    <span>请输入登录密码</span>
			  </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>验证码：</span></dt>
              <dd>
                  <input v-model="verifyCodeInput" class="text" style="z-index: 10000;width:100px;" name="email" type="text" maxlength="10"/>
              </dd>
			  <dd>
  		   		  <div id="v_container2" style="margin-left:50px; width:160px; height:40px;"></div>
              </dd>
          </dl>
          </div>
	      <div style="clear:both;"> </div>
          <div>
            <span><a @click="login">登录</a></span>
            <span><a href="/src/register/register.html">前往注册页面</a></span>
          </div>
		</div>
      </div>
	  </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar2.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import EventEnrollPanel from '../util/event_enroll_panel.vue'
import RightPanel from '../util/right_panel.vue'
import LastFooter from '../util/footer.vue'

export default {
  data: function() {
    return {
      username: '',
      password: '',
	  verifyCode: '',
	  verifyCodeInput: ''
    }
  },
  methods: {
    login: function() {
	  var username = trimStr(this.username);
	  var password = trimStr(this.password);

      if (username === '') {
        alert('请输入正确的用户名');
        return;
      }

      if (password === '') {
        alert('请输入用户密码');
        return;
      }

	  if (specialStrCheck(username) || specialStrCheck(password)) {
        alert('请只输入数字，字母或下划线组成的用户名和密码');
        return;
	  }

	  var res = this.verifyCode.validate(this.verifyCodeInput);
	  if (!res) {
        alert('请输入正确的验证码，点击验证码可刷新');
        return;
	  }

      post('/user/login', {username: username, password: password}, 
	   function(data) {
        if (data.token) {
          setCookie('token', data.token, 3000);

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
  mounted: function () {
	this.verifyCode = new GVerify("v_container2");
  },
  components: {MainHeader, MainNav, TopBar, LastFooter, EventEnrollPanel, RightPanel} 
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
