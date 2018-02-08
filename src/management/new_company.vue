<template>
    <div>
        <h3>新增公司</h3>
        <div class="formbox">
          <dl class="clearfix">
              <dt><b>*</b><span>公司名：</span></dt>
              <dd>
                  <input v-model="name" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>简介：</span></dt>
              <dd>
                  <input v-model="decscription" class="text" style="z-index: 10000" name="email" type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>所在地：</span></dt>
              <dd><input class="text"
                  value="" style="z-index: 10000" v-model="location" type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>配套客户：</span></dt>
              <dd><input class="text" v-model="customer"
                  style="z-index: 10000" type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>主营业务：</span></dt>
              <dd>
                  <label v-for="product in products" class="dda">
                      <input type="checkbox" :value="product.id" v-model="chosenProducts" /><span class="rad">{{ product.name }}&nbsp;</span></label>
              </dd>
          </dl>
        </div>
        <span class="span01"><a @click="newCompany">新增</a></span>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      name: '',
      decscription: '',
      location: '',
      customer: '',
      products: [],
      productsClone: [],
      chosenProducts: []
    }
  },
  methods: {
    newCompany: function() {
      console.log(this.chosenProducts);
      if (this.name === '' || this.decscription === '' || this.location === '' || this.customer === '' || this.chosenProducts === []) {
        alert('请填写完整资料');
        return;
      }
      if (this.location !== this.customer) {
        alert('两次密码不一致');
        return;
      }
      var self = this;
      /*
      post('/user/register', {username: this.name, password: this.location, email: this.decscription, role: this.role}, function(data) {
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
      }, true);*/
    }
  },
  mounted: function() {
    var self = this;
    get('/api/menu/category', {}, function(data) {
      self.tabs = data;
      for (let index in self.tabs) {
        let tab = self.tabs[index];
        get('/api/menu/category/' + tab.id, {}, function(data) {
          for (let id in data.subtype) {
            var subtab = data.subtype[id];
            self.productsClone.push({name: subtab.name, id: subtab.id});
          }

          //only change of whole data can make vue detect change
          self.products = [];
          self.products = self.productsClone;
          console.log(self.products);
        }, false);
      }
    }, false);
  }
}
</script>

<style>
.formbox dl {width:435px;line-height:26px;margin-top:10px;}
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
