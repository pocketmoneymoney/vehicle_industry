<template>
  <div class="new_purchase clearfix">
    <h3>
        <span>对产品要求</span>
    </h3>
    <div class="formbox clearfix" style="border-bottom: 1px dashed #e5e5e5;">
          <dl class="clearfix">
              <dt><span>尺寸／重量：</span></dt>
              <dd>
                  <input v-model="size" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><span>材质：</span></dt>
              <dd>
                  <input v-model="material" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><span>制造工艺：</span></dt>
              <dd>
                  <input v-model="method" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><span>年采购量：</span></dt>
              <dd>
                  <input v-model="amount" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix" style="width:700px">
              <dt><span>采购金额(RMB)：</span></dt>
              <dd style="width:500px;">
                  <input v-model="money" class="text" style="float:left;z-index: 10000" maxlength="20"
                      type="text" />
			      <select class="text" v-model="moneyUnit" style="margin-left:10px;width:78px;float:left;">
				      <option value="年">年</option>
				      <option value="单次">单次</option>
				  </select>
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><span>产品其他描述：</span></dt>
              <dd>
                  <textarea v-model="description" class="text" style="z-index: 10000;height:99px;" maxlength="200"
                      type="text" />
              </dd>
          </dl>
     </div>
    <h3 style="padding-top:19px">
        <span>对供应商要求</span>
    </h3>
    <div class="formbox clearfix" style="border-bottom: 1px dashed #e5e5e5;">
          <dl class="clearfix">
              <dt><span>供应商认证：</span></dt>
              <dd>
                  <input v-model="certification" class="text" style="z-index: 10000" maxlength="40"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><span>供应商地理位置：</span></dt>
              <dd>
                  <input v-model="location" class="text" style="z-index: 10000" maxlength="40"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><span>供应商年销售额：</span></dt>
              <dd>
                  <input v-model="sales" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><span>供应商其他要求：</span></dt>
              <dd>
                  <textarea v-model="requirement" class="text" style="z-index: 10000;height:99px;" maxlength="300"
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
      <span class="span01"><a @click="cancelPurchase">取消</a></span>
      <span class="span01"><a @click="newPurchase">发布</a></span>
    </div>
  </div>
</template>

<script>
export default {
	props: ['person', 'newPurchaseBasicInfo'],
	data() {
		return {
			size: '',
			material: '',
			method: '',
			amount: '',
			money: '',
			moneyUnit: '',
			description: '',
			certification: '',
			location: '',
			sales: '',
			requirement: ''
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
        oMyForm.append("productName", this.newPurchaseBasicInfo.productName);
        oMyForm.append("expire", this.newPurchaseBasicInfo.expire);
        oMyForm.append("type", this.newPurchaseBasicInfo.type);
        oMyForm.append("detailType", this.newPurchaseBasicInfo.detailType);

        oMyForm.append("size", this.size);
        oMyForm.append("material", this.material);
        oMyForm.append("method", this.method);
        oMyForm.append("totalAmount", this.amount);
        oMyForm.append("money", this.money);
        oMyForm.append("moneyUnit", this.moneyUnit);
        oMyForm.append("description", this.description);
        oMyForm.append("supplierCertification", this.certification);
        oMyForm.append("supplierLocation", this.location);
        oMyForm.append("supplierSales", this.sales);
        oMyForm.append("supplierRequirement", this.requirement);

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
