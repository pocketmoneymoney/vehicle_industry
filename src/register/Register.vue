<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div class="main clearfix">
        <div class="formbox clearfix">
          <h3>注册新用户</h3>
	      <div style="clear:both;"> </div>
          <dl>
              <dt><b>*</b><span>用户名：</span></dt>
              <dd>
                  <input v-model="username" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
			  <dd>
			    <span style="width:350px;">用于账户登录,无法修改</span>
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
                  value="" style="z-index: 10000" v-model="password1" maxlength="30" type="password" />
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
                  <input v-model="phone" class="text" style="z-index: 10000" maxlength="24"
                      type="text" />
              </dd>
			  <dd></dd>
          </dl>
          <dl>
              <dt><b>*</b><span>邮箱：</span></dt>
              <dd>
                  <input v-model="email" class="text" style="z-index: 10000" maxlength="50" name="email" type="text" />
              </dd>
			  <dd></dd>
          </dl>
          <dl>
              <dt><b>*</b><span>角色：</span></dt>
              <dd>
                  <label class="dda">
                      <input type="radio" value="supplier" v-model="role" /><span class="rad">我是供应商&nbsp;</span></label>
                  <label class="ddb" style="margin-left: 25px;">
                      <input type="radio" value="admin" v-model="role" /><span class="rad">我是采购商 </span>
                  </label>
              </dd>
			  <dd></dd>
          </dl>
          <div v-if="role === 'supplier'">
              <dl>
                  <dt><b>*</b><span>公司名称：</span></dt>
                  <dd>
                      <input v-model="companyName" class="text" style="z-index: 10000" name="email" type="text" maxlength="60"/>
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>主营产品：</span></dt>
                  <dd>
                      <input v-model="product" class="text" style="z-index: 10000" name="email" type="text" maxlength="100"/>
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>配套客户：</span></dt>
                  <dd>
                      <input v-model="customer" class="text" style="z-index: 10000" name="email" type="text" maxlength="100"/>
                  </dd>
              </dl>
          </div>
	      <div style="clear:both;"> </div>
          <div>
            <span><a href="/src/register/login.html">我有帐户，直接登录</a></span>
            <span><a @click="register">注册</a></span>
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
      password1: '',
      password2: '',
      role: '',
      personName: '',
      companyName: '',
      email: '',
      phone: '',
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

	  var params = {
		username: this.username,
		password: this.password1,
		role: this.role,
		person: this.personName,
		phone: this.phone,
		email: this.email,
		company: this.companyName,
		product: this.product,
		customer: this.customer};
      post('/user/register', params, function(data) {
        if (data.success) {
          setCookie('token', data.token, 3000);
		  if (data.role == 'supplier') {
            window.location.href = '/src/supplier/index.html';
	      } else if (data.role == 'admin') {	
            window.location.href = '/src/management/index.html';
		  } else if (data.role == 'buyer') {
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
</style>
