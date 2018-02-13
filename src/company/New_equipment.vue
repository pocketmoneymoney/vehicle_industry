<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
      <main-nav></main-nav>
      <div v-if="isSupplier" class="main clearfix">
        <h3>添加设备</h3>
        <div class="formbox clearfix">
              <dl>
                  <dt><b>*</b><span>设备名称：</span></dt>
                  <dd>
                      <input v-model="equipmentName" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>设备类型：</span></dt>
                  <dd>
                      <input v-model="type" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl>
                  <dt><b>*</b><span>设备提供商：</span></dt>
                  <dd>
                      <input v-model="producer" class="text" style="z-index: 10000" name="email" type="text" />
                  </dd>
              </dl>
              <dl class="clearfix">
                  <dt><b>*</b><span>产品图示：</span></dt>
                  <dd>
                      <input ref="equipmentfile" type="file" name="file" style="z-index:10000" />
                  </dd>
              </dl>
        </div>
        <span class="span01"><a @click="updateCompany">更新</a></span>
      </div>
      <no-authorized v-else></no-authorized>
	  </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'

import NoAuthorized from './no_authorized.vue'

import LastFooter from '../util/footer.vue'

export default {
  data: function() {
    return {
      isSupplier: false,
      type: 'aa',
      equipmentName: 'bb',
      producer: '',
    }
  },
  methods: {
    updateCompany: function() {
      var param = {};
      var oMyForm = new FormData();
      oMyForm.append("avatar", this.$refs.equipmentfile.files[0]);
      postWithFile('/api/supplier', param, function(data) {
        console.log(data);
      }, true);
    }
  },
  mounted: function() {
    var self = this;
    if (getCookie('token') != "") {
      post('/user/book', {}, function(data) {
        if (data.role === 'supplier') {
          self.isSupplier = true;
        }
      }, true);
    }
  },
  components: {MainHeader, MainNav, TopBar, NoAuthorized, LastFooter} 
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
