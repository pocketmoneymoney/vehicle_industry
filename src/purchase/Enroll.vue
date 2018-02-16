<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div class="main clearfix">
        <event-enroll-panel></event-enroll-panel>
		<div>
          <h3>采购信息详情</h3>
          <div class="purchase_detail clearfix">
            <h3>{{purchase.company}}</h3>
            <h3>{{purchase.product}}</h3>
            <ul>
              <li>
                <span>{{purchase.type}}</span>{{purchase.expire}}
              </li>
              <li>
                <span>材质：</span>{{purchase.material}}
              </li>
              <li>
                <span>尺寸／重量：</span>{{purchase.size}}
              </li>
              <li>
                <span>制造工艺：</span>{{purchase.tech}}
              </li>
              <li>
                <span>车型：</span>{{purchase.tech}}
              </li>
              <li>
                <span>年采购量：</span>{{purchase.tech}}
              </li>
              <li>
                <span>采购金额：</span>{{purchase.tech}}
              </li>
              <li>
                <span>产品其他描述：</span>{{purchase.tech}}
              </li>
              <li>
                <span>供应商认证：</span>{{purchase.tech}}
              </li>
              <li>
                <span>供应商位置：</span>{{purchase.tech}}
              </li>
              <li>
                <span>供应商其他要求：</span>{{purchase.tech}}
              </li>
              <li>
                <span>发布时间：</span>{{purchase.tech}}
              </li>
            </ul>
            <span class="enroll_button"><a @click="enrollPurchase">我要报名</a></span>
          </div>
		  <right-panel></right-panel>
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

import EventEnrollPanel from '../util/event_enroll_panel.vue'
import RightPanel from '../util/right_panel.vue'

import LastFooter from '../util/footer.vue'

export default {
  data: function() {
    return {
		purchaseId: '',
		purchase: {
			id: 1,
			company: 'CCC',
			product: 'aaaa',
			size: 'bb',
			material: 'cc'
		}
    }
  },
  methods: {
    enrollPurchase: function() {
      var self = this;
      if (getCookie('token') === "") {
		alert("请先登录");
		return;
	  }
	  else {
        post('/user/book', {}, function(data) {
		  if (data.username === '') {
		    alert("请先登录");
		    return;
		  }
          if (data.role !== "supplier") {
		    alert("只有供应商可以报名采购项目");
		    return;
          }
        }, true);
      }
      post('/user/enrollActivity', {username: this.newUsername, password: this.newPassword1, email: this.newEmail, role: this.role}, function(data) {
        if (data.success) {
          setCookie('token', data.token, 3000);
          self.isLogin = true;
          if (data.role === 'admin') {
            self.isAdmin = true;
          }
          window.location.href = '/src/index.html';
        }
        else {
          alert(data.msg);
        }
      }, false);
    }
  },
  mounted: function() {
      var params = window.location.search;
      params = params.replace('?', '');
      var allParams = params.split('&');
      for (let index in allParams) {
        var paramObj = allParams[index].split('=');
        if (paramObj[0] === 'purchaseId') {
          this.purchaseId = paramObj[1];
        }
      }
  },
  components: {MainHeader, MainNav, TopBar, EventEnrollPanel, RightPanel, LastFooter} 
}
</script>

<style lang="scss">
@import '../../css/rem.scss';

.back_wrapper{
  width: t(1200);
  background-color:#f9f9f8;
}
.main{
	width: 1200px;
	margin: 0 auto;
}

h3{
	height: 14px;
	line-height: 14px;
	font-size: 14px;
	color: #333333;
  margin: 0;
  font-weight: bold;
  margin-bottom: 10px;
}
.purchase_detail{
	width: 740px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px;
	margin-bottom: 8px;
}

.purchase_detail ul {
  padding-left: 20px;
  list-style: none;
}
.purchase_detail ul li {
  font-size: 12px;
  color: #444444;
  line-height: 22px;
  margin: 5px 0px;
  zoom: 1;
  word-wrap: break-word;
  word-break: break-all;
}
.purchase_detail ul li:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
.purchase_detail ul li span {
  font-size: 12px;
  color: #999999;
  margin-right: 10px;
  text-align: right;
  display: block;
  float: left;
}
.enroll_button{ display:block; width: 54px; margin-left: 154px; background:#e2f5ff; border:1px solid #c8eafa; border-radius:0.2em; font-size:13px; line-height:26px; text-align:center; color:#3d9ccc; padding-left:0px; cursor: pointer;}
</style>
