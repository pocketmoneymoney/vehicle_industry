<template>
  <div>
   <div class="title_bar" style="width:400px"> 
     <a class="title_bar_a"> 采购项目发布 (具体要求)</a>
   </div> 
   <div class="new_purchase clearfix">
    <div class="formbox clearfix" style="border-bottom: 1px dashed #e5e5e5;">
          <dl class="clearfix">
              <dt><span>尺寸／重量/材质/制造工艺：</span></dt>
              <dd>
                  <input v-model="material" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><span>年采购量/采购金额：</span></dt>
              <dd>
                  <input v-model="amount" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><span>产品其他描述：</span></dt>
              <dd>
                  <textarea v-model="description" class="text" style="z-index: 10000;height:99px;" maxlength="200"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><span>供应商要求（认证/位置/销售额等）：</span></dt>
              <dd>
                  <textarea v-model="supplier" class="text" style="z-index: 10000;height:99px;" maxlength="300"
                      type="text" />
              </dd>
          </dl>
     </div>
    <div class="formbox clearfix">
          <dl class="clearfix">
              <dt><span>上传产品相关图片：</span></dt>
              <dd>
                  <input type="file" ref="productImg" /> 
              </dd>
          </dl>
    </div>
    <div>
      <span class="span01" style="margin-left:50px; margin-top:10px;">
		<a @click="cancelPurchase">取消</a></span>
      <span class="span01" style="margin-left:50px; margin-top:10px">
		<a @click="newPurchase">发布</a></span>
    </div>
  </div>
  </div>
</template>

<script>
export default {
	props: ['person', 'newPurchaseBasicInfo'],
	data() {
		return {
			material: '',
			amount: '',
			description: '',
			supplier: ''
		}
	},
    methods: {
      cancelPurchase: function() {
	    this.$emit('cancelPurchase');
	  },
      newPurchase: function() {
        var oMyForm = new FormData();
        oMyForm.append("name", this.newPurchaseBasicInfo.name);

        oMyForm.append("phone", this.newPurchaseBasicInfo.phone);
        oMyForm.append("email", this.newPurchaseBasicInfo.email);
        oMyForm.append("productName", this.newPurchaseBasicInfo.productName);
        oMyForm.append("type", this.newPurchaseBasicInfo.type);
        oMyForm.append("detailType", this.newPurchaseBasicInfo.detailType);

        oMyForm.append("material", this.material);
        oMyForm.append("amount", this.amount);
        oMyForm.append("description", this.description);
        oMyForm.append("supplier", this.supplier);

        oMyForm.append("personID", this.person.id);
        oMyForm.append("personRole", this.person.role);

		if (this.$refs.productImg.files[0]) {
          oMyForm.append("picture", this.$refs.productImg.files[0]);
		}

		postWithFile('/api/purchase', oMyForm, function(data) {
		  window.location.href = "/src/purchase/index.html";
		}, false);
	  }
	}
}
</script>

<style>
.new_purchase{
	width: 390px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px 5px 5px;
	margin-bottom: 8px;
}
.new_purchase h3 {
  height: 42px;
}
.new_purchase h3 span{
	float: left;
  	padding-top: 15px;
  	padding-left: 15px;
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

.span01{ 
  	float:left; 
	display:block; 
	width: 54px; 
	margin-left: 150px; 
	background:#e2f5ff; 
	border:1px solid #c8eafa; 
	border-radius:0.2em; 
	font-size:13px; 
	line-height:26px; 
	text-align:center; 
	color:#3d9ccc; 
	cursor: pointer;
}
</style>
