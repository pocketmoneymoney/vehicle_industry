<template>
    <div>
        <h3>采购项目管理</h3>
        <table id="purchaselist">
          <thead>
             <tr>
                <th>采购项目名称</th>
                <th>发布人</th>
                <th>采购有效期</th>
				<th>发布时间</th>
                <th>身份</th>
                <th>操作</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="purchase in purchases">
			  <th class="admin_op_button" @click="redirectApplication(purchase)">{{purchase.productName}}</th>
			  <th>{{purchase.name}}</th>
			  <th>{{purchase.expire}}</th>
			  <th>{{purchase.createTime}}</th>
			  <th>{{purchase.publisherRole}}</th>
              <th>
				<a @click="purchaseApplication(purchase)" class="admin_op_button">报名情况</a>
				<a @click="editPurchase(purchase)" class="admin_op_button">编辑 </a>
				<a @click="deletePurchase(purchase)" class="admin_op_button">删除</a>
			  </th>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      purchases: []
    }
  },
  methods: {
    redirectApplication: function(purchase) {
	  window.location.href = '/src/purchase/enroll.html?id=' + purchase.id;
    },
	editPurchase: function(purchase) {
	},
    deletePurchase: function(purchase) {
      if(confirm("确定删除么?")) {
		var self = this;
        post('/api/purchase/delete/' + purchase.id, {}, function(data) {
		  if (data.success) {
    		get('/api/purchase/list?page=0&num=100', {}, function(data) {
			  self.purchases = retriveData(data);
			});
		  } else {
			console.log(data.msg);
      	  }
        }, true);
	  }
    },
    purchaseApplication: function(purchase) {
      this.$emit("purchaseApplication", purchase);
    }
  },
  mounted: function() {
    $('#purchaselist').DataTable({
      searching: false,
      ordering:  false
    });

	var self = this;
    get('/api/purchase/list?page=0&num=100', {}, function(data) {
  	  self.purchases = retriveData(data);
	}, false);
  },
}
</script>

<style lang="scss">
#purchaselist tbody th {
  font-weight: 400;
}
</style>
