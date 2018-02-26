<template>
    <div>
        <h3 class="h3_datatable_list">【申请采购项目列表】</h3>
        <table id="purchaselist">
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
      purchases: []
    }
  },
  mounted: function() {
    $('#purchaselist').DataTable({
      searching: false,
      ordering:  false
    });

	var self = this;
	var publisherID = getUrlKey('id');

    post('/user/book', {}, function(data) {
	  if ((data.username) && (data.id == publisherID)) {
		self.getUrl = '/api/purchase/list_apply?page=0&num=100&id=' + publisherID;
	    get(self.getUrl, {}, function(data) {
  	  	  self.purchases = retriveData(data);
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
