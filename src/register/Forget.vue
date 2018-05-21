<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
      <div class="main_middle clearfix" style="margin-left:230px;">
        <div class="formbox clearfix">
		  <div class="title_bar" style="width:740px"> 
            <a class="title_bar_a">重置密码</a>
		  </div> 
		  <div class="info_panel2">
	      <div style="clear:both;"> </div>
          <dl>
              <dt><b></b><span>用户名</span></dt>
              <dd> {{username}} </dd>
          </dl>
	      <div style="clear:both;"> </div>
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
          </div>
          <div>
            <span><a :href="nextURL">取消</a></span>
            <span><a @click="modify">确认修改</a></span>
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
import EventEnrollPanel from '../util/event_enroll_panel.vue'
import RightPanel from '../util/right_panel.vue'
import LastFooter from '../util/footer.vue'

export default {
  data: function() {
    return {
	  username: '',
	  uid: '',
	  tid: '',
      password2: '',
      password3: '',
	  nextURL:''
    }
  },
  mounted: function() {
	var self = this;
	this.uid = getUrlKey('uid');
	this.tid = getUrlKey('tid');
	this.nextURL = '/src/index.html';

	if (this.uid) {
      post('/user/book', {}, function(data) {
        if (data.username) {
		  if (data.role == 'admin') {
			get('/user/name/' + self.uid, {}, function(data) {
				if (data.success) {	
					self.username = data.name;
				}

 				if (self.username == '') {
					self.username = '未找到相应用户';
				}
			});
		  } else {
		    window.location.href= self.nextURL;
		  }
		} else {
		  window.location.href= self.nextURL;
	    }
	  }, true);
	}
  },
  methods: {
    modify: function() {
	  var regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
 	  var regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。

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
	  var params = {username: this.username,
					password: this.password2,
					id: this.uid};
      post('/user/reset/password', params, function(data) {
          window.location.href = self.nextURL;
      }, false);
    }
  },
  components: {MainHeader, MainNav, TopBar, LastFooter, RightPanel, EventEnrollPanel} 
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
