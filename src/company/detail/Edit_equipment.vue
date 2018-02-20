<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div class="main clearfix">
        <div class="formbox clearfix">
          <h3>添加设备</h3>
	      <div style="clear:both;"> </div>
              <dl>
                  <dt><b>*</b><span>设备名称：</span></dt>
                  <dd>
                      <input v-model="equipment.name" class="text" style="z-index: 10000" name="email" maxlength="30" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b></b><span>设备类型：</span></dt>
                  <dd>
                      <input v-model="equipment.type" class="text" style="z-index: 10000" name="email" type="text" maxlength="30" />
                  </dd>
              </dl>
              <dl>
                  <dt><b></b><span>设备提供商：</span></dt>
                  <dd>
                      <input v-model="equipment.provider" class="text" style="z-index: 10000" name="email" type="text" maxlength="50"/>
                  </dd>
              </dl>
              <dl class="clearfix">
                  <dt><b></b><span>产品图示：</span></dt>
                  <dd>
                      <input ref="equipmentfile" type="file" name="file" style="z-index:10000" />
                  </dd>
              </dl>
	      <div style="clear:both;"> </div>
          <div>
            <span><a @click="cancelInfo">取消</a></span>
            <span><a @click="updateInfo">更新</a></span>
          </div>
        </div>
      </div>
	  </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../../util/topbar.vue'
import MainHeader from '../../util/header.vue'
import MainNav from '../../util/main_nav.vue'
import LastFooter from '../../util/footer.vue'

export default {
  data: function() {
    return {
	  equipmentID: '',
	  ownerID: '',
      equipment: {
		'id': '',
		'name': '',
		'type': '',
		'provider': ''
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
      if (self.equipment.name == "") {
        alert("请输入设备名称");
        return;
	  }

      var params = {
		'id': self.equipmentID,
		'ownerID': self.ownerID,
		'name': self.equipment.name,
		'type': self.equipment.type,
		'provider': self.equipment.provider
	  };
	  post('/api/equipment/', params, function(data) {
        if (!data.success) {
          console.log(data);
        }
        window.location.href = '/src/company/detail/detail.html?id=' + self.ownerID;
	  }, false);
    }
  },
  mounted: function() {
    var self = this;
	self.equipmentID = getUrlKey('pid');
	self.ownerID = getUrlKey('oid');

    verifyToken(function(data) {
      if (((self.ownerID == data.id) && (data.role == 'supplier')) ||
	      (data.role == 'admin')) {
        if (self.equipmentID) {
          get('/api/equipment/' + self.equipmentID, {}, function(equipmentData) {
            if (equipmentData.success) {
              self.equipment = equipmentData.msg;
			} else {
			  alert(equipmentData.msg);
			}
          }, false);
		}
	  }	else {
        window.location.href = '/src/redirect/not_authorized.html';
	  }
    });
  },
  components: {MainHeader, MainNav, TopBar, LastFooter} 
}
</script>

<style lang="scss">
@import '../../../css/rem.scss';
</style>
