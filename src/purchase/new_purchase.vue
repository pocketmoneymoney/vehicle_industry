<template>
  <div>
	<div class="title_bar" style="width:400px"> 
      <a class="title_bar_a"> 采购项目发布</a>
	</div> 
	<div style="clear:both;"> </div>
    <div class="new_purchase clearfix">
    <div class="formbox clearfix" style="width:400px">
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
              <dt><b>*</b><span>发布人联系邮箱：</span></dt>
              <dd>
                  <input v-model="email" class="text" style="z-index: 10000" maxlength="30"
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
  </div>
</template>

<script>
export default {
  props: ['person'],
  data() {
    return {
	  name: '',
	  phone: '',
	  email: '',
	  product: '',
	  type: '',
      detailType: [],
	  vehicleTypes: ['乘用车', '微型车', '卡车', '客车', '工程机械', '其他'],
    }
  },
  methods: {
    newPurchase: function() {
	  var name = trimStr(this.name);
	  var phone = trimStr(this.phone);
	  var email = trimStr(this.email);
	  var product = trimStr(this.product);

      if (name === '' || phone === '' || product === '' || email == '' ||
	    this.type === '' || this.detailType === []) {
        alert('请填写完整资料');
        return;
      }
		
      var basic = {
		name: name, 
		phone: phone, 
		email: email,
		productName: product, 
		type: this.type, 
		detailType: this.detailType
	  };
	  this.$emit('newPurchaseNext', basic);
	}
  },
  mounted: function () {
    var self = this;
    getLoginInfo(function(person) {
      self.name = person.name;
      self.phone = person.phone;
    });
  }
}
</script>

<style>
.new_purchase{
	float: left;
	width: 390px;
	border: 1px solid #e5e5e5;
	background: #fff;
	padding: 19px 20px 5px 5px;
	margin-bottom: 8px;
}

.new_purchase h3 {
  height: 42px;
}
.new_purchase h3 span{
	float: left;
  	padding-top: 15px;
}
.new_purchaseh3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
}

/************************************************
 ***
 ***  Form Box 
 ***
 ************************************************/
.formbox h3 {
	padding-left: 15px;
	border-left: 6px solid #3d9ccc;
    margin-bottom: 20px;
}

.formbox dl {
	max-width:380px;
	height:32px;
	line-height:26px;
	margin-top:10px;
	margin-left:5px;
}

.formbox dt,.formbox dd {float:left;}
.formbox dt {
	padding-left: 20px;
	width:100px;
	text-align:left;
	font:bolder 14px/26px arial;
	color:#222;
}

.formbox dd {
	max-width:320px;
	color:#000;
}

.formbox dd .text {
	width:320px;
	height:22px;
	line-height:22px;
	border:1px #9D9D9D solid;
	padding:0  0 0 5px;
	position:relative;
	z-index:99;
}

.formbox dd .dda,.formbox dd .ddb,.formbox dd .ddc {float:left;}
.formbox dd .ddb,.formbox dd .ddc {display:inline;}
.formbox dd .cc{float:right;margin-left:0px;}
.formbox dd .rad {font:bold 14px arial;color:#039;line-height:25px;margin-left:5px;margin-left:2px\9;}

.formbox dd .textc {
	width:320px;
	height:22px;
	line-height:22px;
	border:1px #9D9D9D solid;
	padding:0  0 0 5px;
	position:relative;
	z-index:99;
}

.formbox b {color:#f00;padding:5px;}

.formbox span a{ 
	width: 100px; 
	margin-left: 150px; 
	margin-top: 20px; 
	border-radius:0.2em; 
	font-size:14px; 
	text-align:left; 
	background:#3d9ccc; 
	color: #fff;
	padding: 10px 10px 15px 15px; 
	cursor: pointer;
}

</style>
