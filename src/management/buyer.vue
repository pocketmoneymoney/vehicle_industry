<template>
    <div>
        <h3 class="h3_datatable_list">【采购商列表】</h3>
	    <div style="clear:both;"> </div>
        <table id="buyerlist">
          <thead>
             <tr>
                <th>真实姓名</th>
                <th>用户名称</th>
                <th>联系电话</th>
                <th>邮箱</th>
                <th>操作</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="user in users">
			  <th>{{user.owner}} </th>
			  <th>{{user.name}} </th>
			  <th>{{user.phone}} </th>
			  <th>{{user.email}} </th>
              <th @click="deleteUser(user)" class="delete_button">删除</th>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      users: [],
      table: null
    }
  },
  methods: {
    deleteUser: function(user) {
      if(confirm("确定删除么?")) {
		var self = this;
        post('/api/buyer/delete/' + user.id, {}, function(data) {
		  if (data.success) {
    		get('/api/buyer/list?page=0&num=100', {}, function(data) {
	  		  if (data.success) {
  				self.users = data.msg;
          self.reload();
			  }
			});
		  } else {
			console.log(data.msg);
      	  }
		}, true);
	  }
    },
    reload: function () {
      var self = this;
      if (this.table) {
        this.table.destroy();
      }
      setTimeout(function() {
        self.table = $('#buyerlist').DataTable();
      }, 100);
    }
  },
  mounted: function() {
    var self = this;
    this.table = $('#buyerlist').DataTable();
    get('/api/buyer/list?page=0&num=10000', {}, function (data) {
	  if (data.success) {
        self.users = data.msg;
        self.reload();
      }
	}, false);
  },
}
</script>

<style lang="scss">
#buyerlist tbody th {
  font-weight: 400;
}
.delete_button {
  cursor: pointer;
}
</style>
