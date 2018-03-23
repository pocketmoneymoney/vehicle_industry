<template>
    <div>
        <h3 class="h3_datatable_list">【申请采购项目列表】</h3>
        <table id="purchase_buyerlist">
          <thead>
             <tr>
                <th>采购项目名称</th>
                <th>发布人</th>
                <th>采购有效期</th>
				<th>发布时间</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="purchase in purchases">
			  <th>{{purchase.productName}}</th>
			  <th>{{purchase.name}}</th>
			  <th>{{purchase.expire}}</th>
			  <th>{{purchase.createTime}}</th>
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
    reload: function () {
      var self = this;
      if (this.table) {
        this.table.destroy();
      }
      setTimeout(function() {
        self.table = $('#purchase_buyerlist').DataTable();
      }, 100);
    }
  },
  mounted: function() {
    this.table = $('#purchase_buyerlist').DataTable();

	var self = this;
	var publisherID = getUrlKey('id');

    post('/user/book', {}, function(data) {
	  if ((data.username) && (data.id == publisherID)) {
		self.getUrl = '/api/purchase/list_apply?page=0&num=10000&id=' + publisherID;
	    get(self.getUrl, {}, function(data) {
  	  	  self.purchases = retriveData(data);
          self.reload();
	    }, false);
	  } else {
        window.location.href = '/src/redirect/expired.html';
	  }
    }, true);
  },
}
</script>

<style lang="scss">
#purchaselist tbody th {
  font-weight: 400;
}
</style>
