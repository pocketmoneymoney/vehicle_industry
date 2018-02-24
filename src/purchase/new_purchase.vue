<template>
  <div class="new_purchase clearfix">
    <h3>
        <span>采购项目发布</span>
    </h3>
    <div class="formbox clearfix">
          <dl class="clearfix">
              <dt><b>*</b><span>发布人姓名/公司名称：</span></dt>
              <dd>
                  <input v-model="name" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>发布人联系电话：</span></dt>
              <dd>
                  <input v-model="phone" class="text" style="z-index: 10000" maxlength="30"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>采购产品名称：</span></dt>
              <dd>
                  <input v-model="product" class="text" style="z-index: 10000" maxlength="40"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>有效期：</span></dt>
              <dd>
			     <select class="text" v-model="expire">
				     <option value='长期'>长期</option>
				     <option value='1个月'>1个月</option>
				     <option value='3个月'>3个月</option>
				     <option value='6个月'>6个月</option>
				 </select>
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>采购类型：</span></dt>
              <dd>
                  <label class="dda">
                      <input type="radio" value="近期采购" v-model="type" /><span class="rad">近期采购&nbsp;</span></label>
                  <label class="ddb" style="margin-left: 25px;">
                      <input type="radio" value="储备项目" v-model="type" /><span class="rad">储备项目 </span>
                  </label>
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>车型(可多选)：</span></dt>
              <dd>
                  <label v-for="vehicleType in vehicleTypes" class="dda">
                      <input type="checkbox" :value="vehicleType" v-model="detailType" /><span class="rad">{{ vehicleType }}&nbsp;</span></label>
              </dd>
          </dl>
     </div>
    <span class="span01"><a @click="newPurchase">发布</a></span>
  </div>
</template>

<script>
export default {
  props: ['person'],
  data() {
    return {
	  name: '',
	  phone: '',
	  product: '',
	  type: '',
	  expire: '',
      detailType: [],
	  vehicleTypes: ['乘用车', '微型车', '卡车', '客车', '工程机械', '其他'],
    }
  },
  methods: {
    newPurchase: function() {
	  var name = trimStr(this.name);
	  var phone = trimStr(this.phone);
	  var product = trimStr(this.product);

      if (name === '' || phone === '' || product === '' || 
	    this.type === '' || this.expire === '' || this.detailType === []) {
        alert('请填写完整资料');
        return;
      }
		
      var basic = {
		name: name, 
		phone: phone, 
		productName: product, 
		type: this.type, 
		expire: this.expire, 
		detailType: this.detailType
	  };
	  this.$emit('newPurchaseNext', basic);
	}
  },
  mounted: function () {
    this.name = this.person.name;
    this.phone = this.person.phone;
  }
}
</script>

<style>
.new_purchase{
	width: 740px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px 5px 5px;
	margin-bottom: 8px;
}
.new_purchaseh3 span{
	float: left;
}
.new_purchaseh3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
}


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
