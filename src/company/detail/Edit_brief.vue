<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div class="main clearfix">
        <div class="formbox clearfix">
          <h3>公司基本信息编辑</h3>
	      <div style="clear:both;"> </div>
              <dl>
                  <dt><b>*</b><span>公司名称</span></dt>
                  <dd>
                      <input v-model="company.name" class="text" style="z-index: 10000;" name="email" type="text"/>
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>主营产品</span></dt>
                  <dd>
                      <input v-model="company.product" class="text" style="z-index: 10000;" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>配套客户</span></dt>
                  <dd>
                      <input v-model="company.customer" class="text" style="z-index: 10000;" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b></b><span>公司简介：</span></dt>
                  <dd>
                      <textarea v-model="company.brief" class="text" style="height: 150px;; z-index: 10000" />
                  </dd>
              </dl>
	          <div style="clear:both;"> </div>
              <dl class="clearfix">
                  <dt><b>*</b><span>公司logo：</span></dt>
                  <dd>
                      <input ref="logofile" type="file" name="file" style="z-index:10000" />
                  </dd>
              </dl>
	      <div style="clear:both;"> </div>
          <div>
            <span><a @click="cancelUpdate">取消</a></span>
            <span><a @click="updateCompany">更新</a></span>
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
      oMyForm.append("name", this.companyName);
      oMyForm.append("product", this.product);
      oMyForm.append("brief", this.brief);
      oMyForm.append("customer", this.customer);
      oMyForm.append("avatar", this.$refs.logofile.files[0]);

      var self = this;
      /*postWithFile('/api/supplier/'+self.id, oMyForm, function(data) {
        console.log(data);
      }, false);*/

	  post('/api/supplier/company/'+self.id, {
		'name': this.company.name,
		'product': this.company.product,
		'brief': this.company.brief,
		'customer': this.company.customer,
        'location': this.company.location,
        'market': this.company.market,
        'createTime': this.company.createTime,
        'operator': this.company.operator,
        'assets': this.company.assets,
        'avatar': this.company.avatar,
	  }, function(data) {
		if (!data.success) {
		  console.log(data);
		}
        window.location.href = '/src/company/detail/detail.html?id='+self.id;
	  }, true);
    }
  },
  mounted: function() {
    var self = this;
	var pageHostID = getUrlKey('id');
    verifyToken(function (data) {
      if (((data.id == pageHostID) && (data.role == 'supplier')) ||
	      (data.role == 'admin')) {
        get('/api/supplier/company/' + pageHostID, {}, function(data) {
		  self.company = data;
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
@import '../../../css/rem.scss';
</style>
