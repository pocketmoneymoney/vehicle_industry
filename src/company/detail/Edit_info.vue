<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div class="main clearfix">
        <div class="formbox clearfix">
          <h3>公司详细信息编辑</h3>
	      <div style="clear:both;"> </div>
              <dl>
                  <dt><b> </b><span>公司地区</span></dt>
                  <dd>
                      <input v-model="company.location" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b> </b><span>成立时间</span></dt>
                  <dd>
                      <input v-model="company.createTime" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b> </b><span>法人代表</span></dt>
                  <dd>
                      <input v-model="company.operator" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b> </b><span>总资产</span></dt>
                  <dd>
                      <input v-model="company.assets" class="text" style="z-index: 10000" name="email" type="text" />
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
      var self = this;
      post('/api/supplier/company/' + self.id, {
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
