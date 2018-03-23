<template>
    <div>
        <h3 class="h3_datatable_list">【申请职位列表】</h3>
        <table id="position_enrolllist">
          <thead>
             <tr>
                <th>职位名称</th>
                <th>公司名称</th>
                <th>发布时间</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="position in positions">
              <th>{{position.name}}</th>
              <th>{{position.company}}</th>
              <th>{{position.time}}</th>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      positions: [],
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
        self.table = $('#position_enrolllist').DataTable();
      }, 100);
    }
  },
  mounted: function() {
    this.table = $('#position_enrolllist').DataTable();

	var self = this;
	var publisherID = getUrlKey('id');

    post('/user/book', {}, function(data) {
	  if ((data.username) && (data.id == publisherID)) {
		self.getUrl = '/api/position/list_apply?page=0&num=10000&id=' + publisherID;
	    get(self.getUrl, {}, function(data) {
  	  	  self.positions = retriveData(data);
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
