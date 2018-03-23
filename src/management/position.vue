<template>
    <div>
        <h3 class="h3_datatable_list">【职位列表】</h3>
        <span><a class="admin_add" @click="editPosition({})">发布职位</a></span>
	    <div style="clear:both;"> </div>
        <table id="positionlist">
          <thead>
             <tr>
                <th>职位名称</th>
                <th>公司名称</th>
                <th>发布时间</th>
                <th>操作</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="position in positions">
              <th @click=redirectApplication(position) class="admin_op_button">{{position.name}}</th>
              <th>{{position.company}}</th>
              <th>{{position.time}}</th>
			  <th>
				<a @click="positionApplication(position)" class="admin_op_button">应聘情况 </a>
				<a @click="editPosition(position)" class="admin_op_button">编辑 </a>
                <a @click="deleteAction(position)" class="admin_op_button">删除</a>
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
      positions: [],
      table: null
    }
  },
  methods: {
    redirectApplication: function(position) {
	  var positionURL = '/src/position/enroll.html?id=' + position.id;
      window.location.href = positionURL;
    },
    positionApplication: function(position) {
      this.$emit("positionApplication", position);
    },
    editPosition: function(position) {
      this.$emit("editPosition", position);
    },
    deleteAction: function(position) {
      if(confirm("确定删除么?")) {
		var self = this;
        post('/api/position/delete/' + position.id, {}, function(data) {
		  if (data.success) {
    		get('/api/position/list?page=0&num=100', {}, function(data) {
	  		  if (data.success) {
  				self.positions = data.msg;
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
        self.table = $('#positionlist').DataTable();
      }, 100);
    }
  },
  mounted: function() {
    this.table = $('#positionlist').DataTable();

	var self = this;
    get('/api/position/list?page=0&num=10000', {}, function(data) {
	  if (data.success) {
  		self.positions = data.msg;
      self.reload();
	  } else {
		console.log(data.msg);
	  }
	}, false);
  }
}
</script>

<style lang="scss">
#positionlist tbody th {
  font-weight: 400;
}
</style>
