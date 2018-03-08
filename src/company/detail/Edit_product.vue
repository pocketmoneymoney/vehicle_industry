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
            <a class="title_bar_a">添加产品</a>
		  </div> 
		  <div class="info_panel2">
	      <div style="clear:both;"> </div>
              <dl>
                  <dt><b>*</b><span>产品名称：</span></dt>
                  <dd>
                      <input v-model="product.name" class="text" style="z-index: 10000" name="email" maxlength="30" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b></b><span>产品用途：</span></dt>
                  <dd>
                      <input v-model="product.usage" class="text" style="z-index: 10000" name="email" maxlength="50" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b></b><span>设计产能：</span></dt>
                  <dd>
                      <input v-model="product.capacity" class="text" style="z-index: 10000" name="email" maxlength="50" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b></b><span>典型配套客户：</span></dt>
                  <dd>
                      <input v-model="product.customer" class="text" style="z-index: 10000" name="email" maxlength="50" type="text" />
                  </dd>
              </dl>
              <dl class="clearfix">
                  <dt><b></b><span>产品图示：</span></dt>
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
	  productID: '',
	  ownerID: '',
      product: {
		'id': '',
		'name': '',
		'usage': '',
		'capacity': '',
		'customer': '',
		'avatar': ''
	  },
      productLink: ''
    }
  },
  methods: {
    cancelInfo: function() {
      window.location.href = '/src/company/detail/detail.html?id=' + this.ownerID;
	},
    updateInfo: function() {
	  var self = this;
      if (self.product.name == "") {
        alert("请输入产品名称");
        return;
	  }

      var oMyForm = new FormData();
	  if (self.productID) {
      	oMyForm.append('id', self.productID);
      }
      oMyForm.append('ownerID', self.ownerID);
      oMyForm.append('name', self.product.name);
      oMyForm.append('usage', self.product.usage);
      oMyForm.append('capacity', self.product.capacity);
      oMyForm.append('customer', self.product.customer);
      oMyForm.append('avatar', this.$refs.logofile.files[0]);

      postWithFile('/api/product', oMyForm, function(data) {
        if (!data.success) {
          console.log(data);
        }
        window.location.href = '/src/company/detail/detail.html?id=' + self.ownerID;
	  }, false);
    }
  },
  mounted: function() {
    var self = this;
	self.productID = getUrlKey('pid');
	self.ownerID = getUrlKey('oid');

    verifyToken(function(data) {
      if (((self.ownerID == data.id) && (data.role == 'supplier')) ||
	      (data.role == 'admin')) {
        if (self.productID) {
          get('/api/product/' + self.productID, {}, function(productData) {
            if (productData.success) {
              self.product = productData.msg;
			} else {
			  alert(productData.msg);
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
