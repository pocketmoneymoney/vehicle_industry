<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div class="main clearfix">
        <div class="formbox clearfix">
          <h3>个人信息编辑</h3>
	      <div style="clear:both;"> </div>
              <dl>
                  <dt><b> </b><span>真实姓名</span></dt>
                  <dd>
                      <input v-model="name" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b> </b><span>联系电话</span></dt>
                  <dd>
                      <input v-model="phone" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b> </b><span>邮箱</span></dt>
                  <dd>
                      <input v-model="email" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
	      <div style="clear:both;"> </div>
          <div>
            <span><a href="/src/supplier/index.html">取消</a></span>
            <span><a @click="updateInfo">更新</a></span>
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
import LastFooter from '../util/footer.vue'

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
      var self = this;
      post('/api/supplier/person/' + self.id, {
		'person': this.name,
		'phone': this.phone,
		'email': this.email
	  }, function(data) {
		if (!data.success) {
		  console.log(data);
		}
        window.location.href = '/src/supplier/index.html';
      }, true);
    }
  },
  mounted: function() {
    var self = this;
	var pageHostID = getUrlKey('id');
    verifyToken(function (data) {
      if (((data.id == pageHostID) && (data.role == 'supplier')) ||
		  (data.role == 'admin')) {
        get('/api/supplier/person/' + pageHostID, {}, function(data) {
          self.name = data.name;
		  self.phone = data.phone;
		  self.email = data.email;
		  self.id = pageHostID;
		}, false);
      } else {
        window.location.href = '/src/redirect/not_authorized.html';
	  }
	});
  },
  components: {MainHeader, MainNav, TopBar, LastFooter} 
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
