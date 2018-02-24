<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div>
         <event-enroll-panel></event-enroll-panel>
		 <div class="main_middle clearfix">
        <div class="formbox">
		  <div class="info_panel2">
          <h2>采购详情</h2>
	      <div style="clear:both;"> </div>
          <dl>
              <dt><span>发布人姓名/公司名称：</span></dt>
              <dd> <span>{{purchase.name}} </span> </dd>
          </dl>
          <dl>
              <dt><span>发布人联系电话：</span></dt>
              <dd> <span>{{purchase.phone}} </span> </dd>
          </dl>
          <dl>
              <dt><span>采购产品名称：</span></dt>
              <dd> <span>{{purchase.productName}} </span> </dd>
          </dl>
          <dl>
              <dt><span>有效期：</span></dt>
              <dd> <span>{{purchase.expire}} </span> </dd>
          </dl>
          <dl>
              <dt><span>采购类型：</span></dt>
              <dd> <span>{{purchase.type}} </span> </dd>
          </dl>
          <dl>
              <dt><span>车型：</span></dt>
              <dd> <span>{{purchase.detailType}} </span> </dd>
          </dl>
          <dl>
              <dt><span>尺寸／重量：</span></dt>
              <dd> <span>{{purchase.size}} </span> </dd>
          </dl>
          <dl>
              <dt><span>材质：</span></dt>
              <dd> <span>{{purchase.material}} </span> </dd>
          </dl>
          <dl>
              <dt><span>制造工艺：</span></dt>
              <dd> <span>{{purchase.method}} </span> </dd>
          </dl>
          <dl>
              <dt><span>年采购量：</span></dt>
              <dd> <span>{{purchase.totalAmount}} </span> </dd>
          </dl>
          <dl>
              <dt><span>采购金额(RMB)：</span></dt>
              <dd> <span>{{purchase.money}}  {{purchase.moneyUnit}} </span> </dd>
          </dl>
          <dl>
              <dt><span>产品其他描述：</span></dt>
              <dd> <span>{{purchase.description}} </span> </dd>
          </dl>
          <dl>
              <dt><span>供应商认证：</span></dt>
              <dd> <span>{{purchase.supplierCertification}} </span> </dd>
          </dl>
          <dl>
              <dt><span>供应商地理位置：</span></dt>
              <dd> <span>{{purchase.supplierLocation}} </span> </dd>
          </dl>
          <dl>
              <dt><span>供应商年销售额：</span></dt>
              <dd> <span>{{purchase.supplierSales}} </span> </dd>
          </dl>
          <dl>
              <dt><span>供应商其他要求:</span></dt>
              <dd> <span>{{purchase.supplierRequirement}} </span> </dd>
          </dl>
          <dl>
              <dt><span>产品相关图片:</span></dt>
              <dd> <img :src="purchase.picture" style="width:150px; height:150px;"> </dd>
			  </dd>
          </dl>
		  </div>
		  <div v-if="isNotAdmin" class="info_panel2">
          <h2>我要报名</h2>
	      <div style="clear:both;"> </div>
          <dl>
              <dt><b>*</b><span>姓名：</span></dt>
              <dd>
                  <input v-model="person.name" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>公司：</span></dt>
              <dd>
                  <input v-model="company" class="text" style="z-index: 10000" maxlength="40"
                      type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b></b><span>职位：</span></dt>
              <dd>
                  <input v-model="position" class="text" style="z-index: 10000" maxlength="30"
                      type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>联系电话：</span></dt>
              <dd>
                  <input v-model="person.phone" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>邮箱：</span></dt>
              <dd>
                  <input v-model="person.email" class="text" style="z-index: 10000" name="email" type="text" maxlength="30"/>
              </dd>
          </dl>
          <dl>
              <dt><b></b><span>留言：</span></dt>
              <dd>
                  <textarea v-model="comment" class="text" style="z-index: 10000; height:99px" maxlength="400"
                      type="text" />
              </dd>
          </dl>
	      <div style="clear:both;"> </div>
		  <div>
            <span><a @click="cancelPurchase">取消并返回</a></span>
            <span><a @click="enrollPurchase">提交</a></span>
		  </div>
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
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import LastFooter from '../util/footer.vue'
import EventEnrollPanel from '../util/event_enroll_panel.vue'
import RightPanel from '../util/right_panel.vue'

export default {
  data: function() {
    return {
	  activity: {},
	  isNotAdmin: true,
	  person: {},
	  purchase: {},
      company: '',
      position: '',
      comment: '',
	  id: '',
	  type: ''
    }
  },
  methods: {
  	previewPicture: function (url) {
      if (url) {
	    window.open(url);
	  }
	},
    cancelPurchase: function() {
	  window.location.href='/src/purchase/index.html';
	},
    enrollPurchase: function() {
	  var name = trimStr(this.person.name);
	  var email = trimStr(this.person.email);
	  var phone = trimStr(this.person.phone);

	  var company = trimStr(this.company);
	  var position = trimStr(this.position);
	  var comment = trimStr(this.comment);

      if (name === '' || email === '' || company === '' || 
		  phone === '') {
        alert('请填写完整资料');
        return;
      }

	  var params = {};
	  params['name'] = name;
	  params['email'] = email;
	  params['phone'] = phone;
	  params['company'] = company;
	  params['position'] = position;
	  params['comment'] = comment;
	  params['id'] = this.purchase.id;
	  params['personID'] = this.person.id;
	  params['personRole'] = this.person.role;

	  var self = this;
      post('/api/purchase/apply', params, function (data) {
	    window.location.href='/src/purchase/index.html';
      }, true);
    }
  },
  mounted: function() {
	var self = this;
	var id = getUrlKey('id');
	if (!id) {
	  window.location.href="/src/purchase/index.html";	
	}

    get('/api/purchase/' + id, {}, function(data) {
	  if (data.success) {
	    self.purchase = data.msg;
	  }
	}, false);
	
	getLoginInfo(function (person) {
	  if (person.name) {
		self.person = person;
		if (self.person.role == "admin") {
	  	  self.isNotAdmin = false;
  		} else if (self.person.id == self.purchase.personID) {
	  	  self.isNotAdmin = false;
		}
	  }
	});
  },
  components: {MainHeader, MainNav, TopBar, LastFooter, EventEnrollPanel,
			   RightPanel}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
