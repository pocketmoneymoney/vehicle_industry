<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
      <div class="main2_left clearfix">
        <div class="formbox clearfix">
		  <div class="title_bar" style="width:740px"> 
            <a class="title_bar_a">个人信息编辑</a>
		  </div> 
	      <div style="clear:both;"> </div>
              <dl>
                  <dt><b>*</b><span>真实姓名</span></dt>
                  <dd>
                      <input v-model="name" class="text" style="z-index: 10000" name="email" type="text" maxlength="30"/>
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>联系电话</span></dt>
                  <dd>
                      <input v-model="phone" class="text" style="z-index: 10000" name="email" type="text" maxlength="30"/>
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>邮箱</span></dt>
                  <dd>
                      <input v-model="email" class="text" style="z-index: 10000" name="email" type="text" maxlength="30"/>
                  </dd>
              </dl>
	      <div style="clear:both;"> </div>
          <div>
            <span><a href="/src/buyer/index.html">取消</a></span>
            <span><a @click="updateInfo">更新</a></span>
          </div>
        </div>
      </div>
	  <right-activity-panel></right-activity-panel>
	  </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import LastFooter from '../util/footer.vue'
import RightActivityPanel from '../util/right_activity_panel.vue'

export default {
  data: function() {
    return {
	  name: '',
	  phone: '',
      email: '',
	  id: ''
    }
  },
  methods: {
    updateInfo: function() {
	  if (this.name == "" || this.phone == "" || this.email == "") {
		alert('请输入完整信息');
		return
	  }

      var self = this;
      post('/api/buyer/' + self.id, {
		'person': this.name,
		'phone': this.phone,
		'email': this.email
	  }, function(data) {
		if (!data.success) {
		  console.log(data);
		}
        window.location.href = '/src/buyer/index.html';
      }, true);
    }
  },
  mounted: function() {
    var self = this;
	var pageHostID = getUrlKey('id');
    verifyToken(function (data) {
      if (((data.id == pageHostID) && (data.role == 'buyer')) ||
		  (data.role == 'admin')) {
        get('/api/buyer/' + pageHostID, {}, function(data) {
          if (data.success) {
            self.name = data.msg.name;
		    self.phone = data.msg.phone;
		    self.email = data.msg.email;
		    self.id = pageHostID;
		  } else {
			console.log(data.msg);
          }
		}, false);
      } else {
        window.location.href = '/src/redirect/not_authorized.html';
	  }
	});
  },
  components: {MainHeader, MainNav, TopBar, LastFooter, RightActivityPanel}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
