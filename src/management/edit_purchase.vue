<template>
  <div>
	<div class="title_bar">
	  <span> <a> 查看采购项目</a> </span>
	</div>
	<div style="clear:both;"> </div>
    <div class="formbox clearfix">
        <div>
          <dl>
              <dt><span>发布人名称：</span></dt>
              <dd> <span>{{curPurchase.name}} </span>
              </dd>
          </dl>
		  <div style="clear:both;"> </div>
          <dl>
              <dt><span>发布人联系电话：</span></dt>
              <dd> <span>{{curPurchase.phone}} </span>
              </dd>
          </dl>
		  <div style="clear:both;"> </div>
          <dl>
              <dt><span>发布人联系邮箱：</span></dt>
              <dd> <span>{{curPurchase.email}} </span>
              </dd>
          </dl>
		  <div style="clear:both;"> </div>
          <dl>
              <dt><b>*</b><span>公司名称：</span></dt>
              <dd> <span>{{curPurchase.company}} </span>
              </dd>
          </dl>
		  <div style="clear:both;"> </div>
          <dl>
              <dt><b>*</b><span>产品名称：</span></dt>
              <dd> <span>{{curPurchase.productName}} </span>
              </dd>
          </dl>
		  <div style="clear:both;"> </div>
          <dl>
              <dt><b>*</b><span>采购类型：</span></dt>
              <dd> <span>{{curPurchase.type}} </span>
              </dd>
          </dl>
		  <div style="clear:both;"> </div>
          <dl>
              <dt><b>*</b><span>车型(可多选)：</span></dt>
              <dd> <span>{{curPurchase.detailType}} </span>
              </dd>
          </dl>
		  <div style="clear:both;"> </div>
		  <dl>
              <dt><span>尺寸/重量/材质/制造工艺：</span></dt>
              <dd> <span>{{curPurchase.material}} </span>
              </dd>
		  </dl>
		  <div style="clear:both;"> </div>
		  <dl>
              <dt><span>年采购量/采购金额：</span></dt>
              <dd> <span>{{curPurchase.amount}} </span>
              </dd>
		  </dl>
		  <div style="clear:both;"> </div>
		  <dl>
              <dt><span>产品其他描述：</span></dt>
              <dd> <span>{{curPurchase.description}} </span>
              </dd>
		  </dl>
		  <div style="clear:both;"> </div>
		  <dl>
              <dt><span>供应商要求：</span></dt>
              <dd> <span>{{curPurchase.supplier}} </span>
              </dd>
		  </dl>
		  <div style="clear:both;"> </div>
          <dl>
              <dt><b></b><span>产品图片预览：</span></dt>
			  <dd>
				<span v-for="pic in curPurchase.picture"> 
					<img :src="pic" style="max-width:400px; max-height:400px; 
						margin-bottom:20px; margin-left:10px; margin-right:10px;"> 
	      			<div style="clear:both;"> </div>
				</span>
              </dd>
          </dl>
        </div>
	    <div style="clear:both;"> </div>
		<div>
          <span><a @click="cancelAction">返回</a></span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['purchase'],
  data: function() {
    return {
	  vehicleTypes: ['乘用车', '微型车', '卡车', '客车', '工程机械', '其他'],
	  curPurchase: {}
    }
  },
  methods: {
    cancelAction: function() {
      this.$emit("editPurchaseDone");
	},
    newPurchase: function() {

	  var name = trimStr(this.curPurchase.name);
	  var productName = trimStr(this.curPurchase.productName);

      if ((name === '') || (productName === '')) {
        alert('请填写完整资料');
        return;
      }

      var oMyForm = new FormData();
      oMyForm.append("name", name);
      oMyForm.append("company", this.curPurchase.company);
      oMyForm.append("phone", this.curPurchase.phone);
      oMyForm.append("email", this.curPurchase.email);
      oMyForm.append("productName", productName);
      oMyForm.append("type", this.curPurchase.type);

	  if (this.detailType) {
        oMyForm.append("detailType", this.detailType);
	  } else {
        oMyForm.append("detailType", this.curPurchase.detailType);
      }

      oMyForm.append("material", this.curPurchase.material);
      oMyForm.append("amount", this.curPurchase.amount);
      oMyForm.append("description", this.curPurchase.description);
      oMyForm.append("supplier", this.curPurchase.supplier);
      oMyForm.append("id", this.curPurchase.id);
	
      for (var index = 0; index < this.$refs.productImg.files.length; index++) {
          oMyForm.append("picture", this.$refs.productImg.files[index]);
	  }

      var self = this;
      postWithFile('/api/purchase', oMyForm, function(data) {
        self.$emit("editPurchaseDone");
      }, true);
    }
  },
  mounted: function() {
	this.curPurchase = this.purchase;
  }
}
</script>

<style>
</style>
