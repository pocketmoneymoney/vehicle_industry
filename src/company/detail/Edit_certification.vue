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
          <h2>添加认证</h2>
	      <div style="clear:both;"> </div>
              <dl>
                  <dt><b>*</b><span>认证名称：</span></dt>
                  <dd>
                      <input v-model="certification.name" class="text" style="z-index: 10000" name="email" maxlength="30" type="text" />
                  </dd>
              </dl>
              <dl class="clearfix">
                  <dt><b></b><span>认证图片：</span></dt>
                  <dd>
                      <input ref="logofile" type="file" name="file" style="z-index:10000" />
                  </dd>
              </dl>
          </div>
	      <div style="clear:both;"> </div>
          <div>
            <span><a @click="cancelInfo">取消</a></span>
            <span><a @click="updateInfo">更新</a></span>
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
import TopBar from '../../util/topbar.vue'
import MainHeader from '../../util/header.vue'
import MainNav from '../../util/main_nav.vue'
import EventEnrollPanel from '../../util/event_enroll_panel.vue'
import RightPanel from '../../util/right_panel.vue'
import LastFooter from '../../util/footer.vue'

export default {
  data: function() {
    return {
	  certificationID: '',
	  ownerID: '',
      certification: {
		'id': '',
		'name': '',
		'avatar': ''
	  },
      link: ''
    }
  },
  methods: {
    cancelInfo: function() {
      window.location.href = '/src/company/detail/detail.html?id=' + this.ownerID;
	},
    updateInfo: function() {
	  var self = this;
      if (self.certification.name == "") {
        alert("请输入认证图片名称");
        return;
	  }

      var oMyForm = new FormData();
	  if (self.certificationID) {
      	oMyForm.append('id', self.certificationID);
      }
      oMyForm.append('ownerID', self.ownerID);
      oMyForm.append('name', self.certification.name);
      oMyForm.append('avatar', this.$refs.logofile.files[0]);

      postWithFile('/api/certification', oMyForm, function(data) {
        if (!data.success) {
          console.log(data);
        }
        window.location.href = '/src/company/detail/detail.html?id=' + self.ownerID;
	  }, false);
    }
  },
  mounted: function() {
    var self = this;
	self.certificationID = getUrlKey('pid');
	self.ownerID = getUrlKey('oid');

    verifyToken(function(data) {
      if (((self.ownerID == data.id) && (data.role == 'supplier')) ||
	      (data.role == 'admin')) {
        if (self.certificationID) {
          get('/api/certification/' + self.certificationID, {}, function(certData) {
            if (certData.success) {
              self.certification = certData.msg;
			} else {
			  alert(certData.msg);
			}
          }, false);
		}
	  }	else {
        window.location.href = '/src/redirect/not_authorized.html';
	  }
    });
  },
  components: {MainHeader, MainNav, TopBar, EventEnrollPanel, RightPanel, LastFooter} 
}
</script>

<style lang="scss">
@import '../../../css/rem.scss';
</style>
