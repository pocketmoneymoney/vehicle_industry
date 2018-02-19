<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div class="main clearfix">
        <div class="formbox clearfix">
          <h3>添加产品</h3>
	      <div style="clear:both;"> </div>
              <dl>
                  <dt><b>*</b><span>产品名称：</span></dt>
                  <dd>
                      <input v-model="productName" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>产品用途：</span></dt>
                  <dd>
                      <input v-model="productUsage" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>设计产能：</span></dt>
                  <dd>
                      <input v-model="productCapacity" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>典型配套客户：</span></dt>
                  <dd>
                      <input v-model="productCustomer" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl class="clearfix">
                  <dt><b>*</b><span>产品图示：</span></dt>
                  <dd>
                      <input ref="productfile" type="file" name="file" style="z-index:10000" />
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
      productName: '',
      productID: '',
      productUsage: '',
      productCustomer: '',
      productCapacity: '',
      productLink: '',
      id: ''
    }
  },
  methods: {
    updateInfo: function() {
      var param = {};
      var oMyForm = new FormData();
      oMyForm.append("avatar", this.$refs.productfile.files[0]);
      postWithFile('/api/supplier', param, function(data) {
        console.log(data);
      }, true);
    }
  },
  mounted: function() {
    var self = this;
	var pageHostID = getUrlKey('id');
	var productID = getUrlKey('pd');

    verifyToken(function(data) {
      if (((data.id == pageHostID) && (data.role == 'supplier')) ||
	      (data.role == 'admin')) {
		self.id = data.id;
        if (productID) {
          get('/api/product/' + productID, {}, function(data) {
            self.productName = data.name;
			self.productID = data.id;
			self.productUsage = data.usage;
			self.productCustomer = data.customer;
			self.productLink = data.link;
			self.productCapacity = data.capacity;
		  }, false);
        }
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
