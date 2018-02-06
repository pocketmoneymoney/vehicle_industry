<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <h3>注册新用户</h3>
        <div class="formbox">
          <dl>
              <dt><b>*</b><span>用户名：</span></dt>
              <dd>
                  <input v-model="newUsername" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>邮箱：</span></dt>
              <dd>
                  <input v-model="newEmail" class="text" style="z-index: 10000" name="email" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>密码：</span></dt>
              <dd><input class="text"
                  value="" style="z-index: 10000" v-model="newPassword1" type="password" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>确认密码：</span></dt>
              <dd><input class="text" v-model="newPassword2"
                  style="z-index: 10000" type="password" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>角色：</span></dt>
              <dd>
                  <label class="dda">
                      <input type="radio" value="supplier" v-model="role" /><span class="rad">I'm Supplier&nbsp;</span></label>
                  <label class="ddb" style="margin-left: 25px;">
                      <input type="radio" value="buyer" v-model="role" /><span class="rad">I'm Buyer </span>
                  </label>
              </dd>
          </dl>
        </div>
        <span class="span01"><a @click="register">注册</a></span>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from './util/topbar.vue'
import MainHeader from './util/header.vue'

import LastFooter from './util/footer.vue'

export default {
  data: function() {
    return {
      newUsername: '',
      newEmail: '',
      newPassword1: '',
      newPassword2: '',
      role: ''
    }
  },
  methods: {
    register: function() {
      if (this.newUsername === '' || this.newEmail === '' || this.newPassword1 === '' || this.newPassword2 === '' || this.role === '') {
        alert('请填写完整资料');
        return;
      }
      if (this.newPassword1 !== this.newPassword2) {
        alert('两次密码不一致');
        return;
      }
      var self = this;
      post('/user/register', {username: this.newUsername, password: this.newPassword1, email: this.newEmail, role: this.role}, function(data) {
        if (data.success) {
          setCookie('token', data.token, 3000);
          self.isLogin = true;
          if (data.role === 'admin') {
            self.isAdmin = true;
          }
          window.location.href = '/src/index.html';
        }
        else {
          alert(data.msg);
        }
      }, false);
    }
  },
  components: {MainHeader, TopBar, LastFooter} 
}
</script>

<style lang="scss">
@import '../css/rem.scss';

.back_wrapper{
  width: t(1200);
  background-color:#f9f9f8;
}
.main{
	width: 1200px;
	margin: 0 auto;
}

.formbox dl {width:435px;height:32px;line-height:26px;margin-top:10px;}
.formbox dt,.formbox dd {float:left;}
.formbox dt {width:190px;text-align:right;font:bolder 14px/26px arial;color:#222;}
.formbox dd {width:229px;color:#000;}
.formbox dd .text {width:222px;height:22px;line-height:22px;border:1px #9D9D9D solid;padding:0  0 0 5px;position:relative;z-index:99;}
.formbox dd .texta {width:99px;}
.formbox dd .textb {width:39px;}
.formbox dd .dda,.formbox dd .ddb,.formbox dd .ddc {float:left;}
.formbox dd .ddb,.formbox dd .ddc {display:inline;}
.formbox dd .cc{float:right;margin-left:0px;}
.formbox dd .rad {font:bold 14px arial;color:#039;line-height:25px;margin-left:5px;margin-left:2px\9;}
.formbox dd .textc {width:452px;height:22px;line-height:22px;border:1px #9D9D9D solid;padding:0  0 0 5px;position:relative;z-index:99;}
.formbox b {color:#f00;padding:5px;}
.span01{ display:block; width: 54px; margin-left: 154px; background:#e2f5ff; border:1px solid #c8eafa; border-radius:0.2em; font-size:13px; line-height:26px; text-align:center; color:#3d9ccc; padding-left:0px; cursor: pointer;}
</style>
