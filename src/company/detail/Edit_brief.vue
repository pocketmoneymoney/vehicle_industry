<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
      <div>
         <event-enroll-panel></event-enroll-panel>
      <div class="main_middle clearfix">
        <div class="formbox clearfix">
		  <div class="title_bar" style="width:750px"> 
            <a class="title_bar_a">公司基本信息编辑</a>
		  </div> 
		  <div class="info_panel2">
	      <div style="clear:both;"> </div>
              <dl>
                  <dt><b>*</b><span>公司名称</span></dt>
                  <dd>
                      <input v-model="company.name" class="text" style="z-index: 10000;" name="email" maxlength="60" type="text"/>
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>主营产品</span></dt>
                  <dd>
                      <input v-model="company.product" class="text" style="z-index: 10000;" name="email" maxlength="100" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>配套客户</span></dt>
                  <dd>
                      <input v-model="company.customer" class="text" style="z-index: 10000;" name="email" maxlength="100" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b></b><span>联系人：</span></dt>
                  <dd>
                      <input v-model="company.officalContact" class="text" style="z-index: 10000" maxlength="40" type="text"/>
                  </dd>
              </dl>
              <dl>
                  <dt><b></b><span>公司电话：</span></dt>
                  <dd>
                      <input v-model="company.officalPhone" class="text" style="z-index: 10000" maxlength="40" type="text"/>
                  </dd>
              </dl>
              <dl>
                  <dt><b></b><span>公司邮箱：</span></dt>
                  <dd>
                      <input v-model="company.officalEmail" class="text" style="z-index: 10000" maxlength="40" type="text"/>
                  </dd>
              </dl>
              <dl>
                  <dt><b></b><span>公司主页：</span></dt>
                  <dd>
                      <input v-model="company.link" class="text" style="z-index: 10000" maxlength="40" type="text"/>
                  </dd>
              </dl>
              <dl>
                  <dt><b></b><span>公司地址：</span></dt>
                  <dd>
                      <input v-model="company.address" class="text" style="z-index: 10000" maxlength="40" type="text"/>
                  </dd>
              </dl>
              <dl>
                  <dt><b></b><span>公司简介：</span></dt>
                  <dd>
                      <textarea v-model="company.brief" class="text" style="height: 150px; z-index: 10000" maxlength="400"/>
                  </dd>
              </dl>
	          <div style="clear:both;"> </div>
              <dl class="clearfix">
                  <dt><b></b><span>公司logo：</span></dt>
                  <dd>
                      <input ref="logofile" type="file" name="file" style="z-index:10000" />
                  </dd>
              </dl>
          </div>
	      <div style="clear:both;"> </div>
          <div>
            <span><a @click="cancelUpdate">取消</a></span>
            <span><a @click="updateCompany">更新</a></span>
          </div>
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
import EventEnrollPanel from '../../util/event_enroll_panel.vue'
import RightPanel from '../../util/right_panel.vue'
import LastFooter from '../../util/footer.vue'

export default {
  data: function() {
    return {
	  company: {},
	  id: ''
    }
  },
  methods: {
    cancelUpdate: function() {
      window.location.href = '/src/company/detail/detail.html?id='+this.id;
    },
    updateCompany: function() {
      if (this.companyName === '' || this.product === '' || this.customer === '') {
        alert('请填写完整资料');
        return;
      }

      var oMyForm = new FormData();
      oMyForm.append("name", this.company.name);
      oMyForm.append("product", this.company.product);
      oMyForm.append("customer", this.company.customer);

	  if (this.company.brief) {
         oMyForm.append("brief", this.company.brief);
	  }
   	  if (this.company.location) {
      	oMyForm.append("location", this.company.location);
	  }
	  if (this.company.market) {
      	oMyForm.append("market", this.company.market);
	  }

	  if (this.company.createTime) {
        oMyForm.append("createTime", this.company.createTime);
	  }
	  if (this.company.operator) {
        oMyForm.append("operator", this.company.operator);
	  }

	  if (this.company.officalContact) {
      	oMyForm.append("officalContact", this.company.officalContact);
	  }
	  if (this.company.officalPhone) {
      	oMyForm.append("officalPhone", this.company.officalPhone);
	  }
	  if (this.company.officalEmail) {
        oMyForm.append("officalEmail", this.company.officalEmail);
	  }
	  if (this.company.link) {
      	oMyForm.append("link", this.company.link);
	  }
	  if (this.company.address) {
      	oMyForm.append("address", this.company.address);
	  }

	  if (this.company.assets) {
       	oMyForm.append("assets", this.company.assets);
	  }
      oMyForm.append("avatar", this.$refs.logofile.files[0]);

      var self = this;
      postWithFile('/api/supplier/company/'+self.id, oMyForm, function(data) {
		if (!data.success) {
		  console.log(data);
		}
        window.location.href = '/src/company/detail/detail.html?id=' + self.id;
      }, false);
    }
  },
  mounted: function() {
    var self = this;
	var pageHostID = getUrlKey('id');
    verifyToken(function (data) {
      if (((data.id == pageHostID) && (data.role == 'supplier')) ||
	      (data.role == 'admin')) {
        get('/api/supplier/company/' + pageHostID, {}, function(data) {
          if (data.success) {
		    self.company = data.msg;
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
  components: {MainHeader, MainNav, TopBar, EventEnrollPanel, RightPanel, LastFooter} 
}
</script>

<style lang="scss">
@import '../../../css/rem.scss';
</style>
