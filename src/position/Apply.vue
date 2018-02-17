<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div class="main clearfix">
        <h3>投递职位</h3>
        <div class="formbox clearfix">
          <dl>
              <dt><b>*</b><span>姓名：</span></dt>
              <dd>
                  <input v-model="name" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>联系电话：</span></dt>
              <dd>
                  <input v-model="phone" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>邮箱：</span></dt>
              <dd>
                  <input v-model="email" class="text" style="z-index: 10000" name="email" type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>上传简历：</span></dt>
              <dd>
                  <input ref="resume" type="file" name="file" style="z-index:10000" />
              </dd>
          </dl>
        </div>
        <span class="span01"><a @click="enrollActivity">提交</a></span>
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
      name: '',
      email: '',
      phone: '',
	  positionId: ''
    }
  },
  methods: {
    enrollActivity: function() {
      if (this.name === '' || this.email === '' || this.phone === '') {
        alert('请填写完整资料');
        return;
      }
      var oMyForm = new FormData();
      oMyForm.append("name", this.name);
      oMyForm.append("phone", this.phone);
      oMyForm.append("email", this.email);
      oMyForm.append("resume", this.$refs.resume.files[0]);
      var self = this;
      post('/user/position/apply', {name: this.name, phone: this.phone, email: this.email}, function(data) {
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
        if (paramObj[0] === 'activityId') {
          this.activityId = paramObj[1];
        }
      }
  },
  components: {MainHeader, MainNav, TopBar, LastFooter} 
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
.span01{ display:block; width: 54px; margin-left: 154px; background:#e2f5ff; border:1px solid #c8eafa; border-radius:0.2em; font-size:13px; line-height:26px; text-align:center; color:#3d9ccc; padding-left:0px; cursor: pointer;}
</style>
