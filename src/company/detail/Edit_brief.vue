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
                      <input v-model="companyName" class="text" style="z-index: 10000;" name="email" type="text"/>
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>主营产品</span></dt>
                  <dd>
                      <input v-model="product" class="text" style="z-index: 10000;" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>配套客户</span></dt>
                  <dd>
                      <input v-model="customer" class="text" style="z-index: 10000;" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b></b><span>公司简介：</span></dt>
                  <dd>
                      <textarea v-model="brief" class="text" style="height: 150px;; z-index: 10000" />
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
      isSupplier: false,
      companyName: '',
      product: '',
      customer: '',
      brief: '',
      avatar: '',
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
	  post('/api/supplier/'+self.id, {
		'company': this.companyName,
		'product': this.product,
		'brief': this.brief,
		'customer': this.customer
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
        get('/api/supplier/' + pageHostID, {}, function(data) {
          self.companyName = data.company;
		  self.product = data.product;
		  self.customer = data.customer;
		  self.brief = data.brief;
          self.avatar = data.avatar;
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
