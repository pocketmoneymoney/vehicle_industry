<template>
    <div>
        <h3 class="h3_datatable_list">【目录分类列表】</h3>
        <span><a class="admin_add" @click="editCategory({})">添加新条目</a></span>
	    <div style="clear:both;"> </div>
        <table id="datalist">
          <thead>
             <tr>
                <th>类别名称</th>
                <th>子类名称</th>
                <th>条目名称</th>
                <th>操作</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories">
              <th >{{category.categoryName}}</th>
              <th >{{category.subtypeName}}</th>
              <th >{{category.itemName}}</th>
              <th> 
				<a @click="editCategory(category)" class="admin_op_button">编辑 </a>
				<a @click="deleteAction(category)" class="admin_op_button">删除 </a>
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
	    categories: [],
      table: null
    }
  },
  methods: {
    editCategory: function(category) {
      this.$emit("editCategory", category);
    },
    deleteAction: function(category) {
      if(confirm("确定删除么?")) {
		 var params = {};
		 if (category.categoryName) {
			params['categoryName'] = category.categoryName;
		 }
		 if (category.subtypeName) {
			params['subtypeName'] = category.subtypeName;
		 }
		 if (category.itemName) {
			params['itemName'] = category.itemName;
		 }

		var self = this;
        post('/api/admin/category/delete', params, function(data) {
		  if (data.success) {
    		get('/api/admin/categoryList', {}, function(data) {
	  		  if (data.success) {
  				self.categories = data.msg;
          self.reload();
			  }
			});
		  } else {
			console.log(data.msg);
		  }
		}, false);
	  }
    },
    reload: function () {
      var self = this;
      if (this.table) {
        this.table.destroy();
      }
      setTimeout(function() {
        self.table = $('#datalist').DataTable();
      }, 100);
    }
  },
  mounted: function() {
    this.table = $('#datalist').DataTable();

	var self = this;
    get('/api/admin/categoryList', {}, function(data) {
	  if (data.success) {
  		self.categories = data.msg;
      self.reload();
	  } else {
		console.log(data.msg);
	  }
	}, false);
  },
}
</script>

<style lang="scss">
#datalist tbody th {
  font-weight: 400;
}
</style>
