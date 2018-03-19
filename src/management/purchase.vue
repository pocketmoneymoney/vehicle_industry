<template>
    <div>
        <h3 class="h3_datatable_list">【采购项目管理列表】</h3>
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
	  getUrl: '',
      purchases: [],
      table: null
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
    		get(self.getUrl, {}, function(data) {
			  self.purchases = retriveData(data);
        	  self.reload();
			});
		  } else {
			console.log(data.msg);
      	  }
        }, true);
	  }
    },
    purchaseApplication: function(purchase) {
      this.$emit("purchaseApplication", purchase);
    },
    reload: function () {
      if (this.table) {
        this.table.destroy();
      }
      setTimeout(function() {
        this.table = $('#purchaselist').DataTable();
      }, 100);
    }
  },
  mounted: function() {
    this.table = $('#purchaselist').DataTable();

	var self = this;
	var publisherID = getUrlKey('id');

    post('/user/book', {}, function(data) {
      if ((data.username) && (data.role == 'admin')) {
		self.getUrl = '/api/purchase/list?page=0&num=10000';
	  } else if ((data.username) && (data.id == publisherID)) {
		self.getUrl = '/api/purchase/list?page=0&num=10000&id=' + publisherID;
	  } else {
        window.location.href = '/src/redirect/expired.html';
		return;
      }
	  get(self.getUrl, {}, function(data) {
  	  	self.purchases = retriveData(data);
        self.reload();
	  }, false);
	}, true);
  },
}
</script>

<style lang="scss">
#purchaselist tbody th {
  font-weight: 400;
}
</style>
