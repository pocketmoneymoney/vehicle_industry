<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div class="main clearfix">
        <div class="formbox clearfix">
          <h3>登录</h3>
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

      post('/user/login', {
		username: this.username, 
		password: this.password}, function(data) {

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
  components: {MainHeader, MainNav, TopBar, LastFooter, RightPanel} 
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
