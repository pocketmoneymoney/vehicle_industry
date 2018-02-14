<template>
    <div>
        <h3>发布职位</h3>
        <div class="formbox">
          <dl class="clearfix">
              <dt><b>*</b><span>职位名称：</span></dt>
              <dd>
                  <input v-model="name" class="text" style="z-index: 10000;" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>公司名称：</span></dt>
              <dd>
                  <input v-model="comapnyName" class="text" style="z-index: 10000" name="email" type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>职位要求：</span></dt>
              <dd>
                  <textarea style="z-index: 10000;height: 98px;" v-model="brief" type="text" />
              </dd>
          </dl>
        </div>
        <span class="span01"><a @click="newCompany">发布</a></span>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      name: '',
      companyName: '',
      brief: ''
    }
  },
  methods: {
    newCompany: function() {
      console.log(this.chosenProducts);
      if (this.name === '' || this.companyName === '' || this.brief === '') {
        alert('请填写完整资料');
        return;
      }
      var param = {};
      var self = this;
      postWithFile('/api/supplier', param, function(data) {
        console.log(data);
      }, true);
    }
  },
  mounted: function() {
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
