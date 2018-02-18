<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div class="main clearfix">
        <h3>公司详细信息编辑</h3>
        <div class="formbox clearfix">
              <dl>
                  <dt><b> </b><span>公司地区</span></dt>
                  <dd>
                      <input v-model="location" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b> </b><span>成立时间</span></dt>
                  <dd>
                      <input v-model="createTime" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b> </b><span>法人代表</span></dt>
                  <dd>
                      <input v-model="operator" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b> </b><span>总资产</span></dt>
                  <dd>
                      <input v-model="assets" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
        </div>
        <div>
          <span class="span01"><a @click="cancelUpdate">取消并返回</a></span>
          <span class="span01"><a @click="updateCompany">更新</a></span>
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
	  location: '',
	  createTime: '',
	  operator: '',
      assets: '',
	  id: ''
    }
  },
  methods: {
    cancelUpdate: function() {
      window.location.href = '/src/company/detail/detail.html?id='+this.id;
    },
    updateCompany: function() {
      var self = this;
      post('/api/supplier/' + self.id, {
		'location': this.location,
		'createTime': this.createTime,
		'operator': this.operator,
		'assets': this.assets
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
    if (getCookie('token') != "") {
      post('/user/book', {}, function(data) {
		if (((data.id == pageHostID) && (data.role == 'supplier')) ||
			(data.role == 'admin')) {
          get('/api/supplier/' + pageHostID, {}, function(data) {
            self.location = data.location;
			self.createTime = data.createTime;
			self.operator = data.operator;
			self.assets = data.assets;
			self.id = pageHostID;
		  }, false);
		} else {
          window.location.href = '/src/redirect/not_authorized.html';
		}
      }, true);
    } else {
    	window.location.href = '/src/redirect/not_authorized.html';
    }
  },
  components: {MainHeader, MainNav, TopBar, LastFooter} 
}
</script>

<style lang="scss">
@import '../../../css/rem.scss';

.back_wrapper{
  width: t(1200);
  background-color:#f9f9f8;
}
.main{
	width: 1200px;
	margin: 0 auto;
}

.formbox dl {width:435px;height:32px;line-height:26px;margin-top:10px;}
.formbox dt,.formbox dd {float:left;}
.formbox dt {width:190px;text-align:right;font:bolder 14px/26px arial;color:#222;}
.formbox dd {width:229px;color:#000;}
.formbox dd .text {width:222px;height:22px;line-height:22px;border:1px #9D9D9D solid;padding:0  0 0 5px;position:relative;z-index:99;}
.formbox dd .texta {width:99px;}
.formbox dd .textb {width:39px;}
.formbox dd .dda,.formbox dd .ddb,.formbox dd .ddc {float:left;}
.formbox dd .ddb,.formbox dd .ddc {display:inline;}
.formbox dd .cc{float:right;margin-left:0px;}
.formbox dd .rad {font:bold 14px arial;color:#039;line-height:25px;margin-left:5px;margin-left:2px\9;}
.formbox dd .textc {width:452px;height:22px;line-height:22px;border:1px #9D9D9D solid;padding:0  0 0 5px;position:relative;z-index:99;}
.formbox b {color:#f00;padding:5px;}
.span01{ width: 54px; margin-left: 150px; background:#e2f5ff; border:1px solid #c8eafa; border-radius:0.2em; font-size:13px; line-height:26px; text-align:center; color:#3d9ccc; padding-left:0px; cursor: pointer;}
</style>
