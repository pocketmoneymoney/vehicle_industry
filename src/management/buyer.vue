<template>
    <div>
        <h3>公司列表</h3>
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
      users: []
    }
  },
  methods: {
    deleteUser: function(user) {
      if(confirm("确定删除么?")) {
		var self = this;
        post('/api/buyer/delete/' + user.id, {}, function(data) {
		  if (data.success) {
    		get('/api/buyer/list?page=0&num=10', {}, function(data) {
	  		  if (data.success) {
  				self.users = data.msg;
			  }
			});
		  } else {
			console.log(data.msg);
      	  }
		}, true);
	  }
    }
  },
  mounted: function() {
    var self = this;
    $('#buyerlist').DataTable({
    });
    get('/api/buyer/list?page=0&num=5', {}, function (data) {
	  if (data.success) {
        self.users = data.msg;
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
