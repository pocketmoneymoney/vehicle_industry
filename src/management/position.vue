<template>
    <div>
        <span><a class="admin_add" @click="editPosition({})">发布职位</a></span>
	    <div style="clear:both;"> </div>
        <h3>职位列表</h3>
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
              <th>{{position.name}}</th>
              <th>{{position.company}}</th>
              <th>{{position.time}}</th>
			  <th>
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
      positions: []
    }
  },
  methods: {
    editPosition: function(position) {
      this.$emit("editPosition", position);
    },
    deleteAction: function(position) {
      if(confirm("确定删除么?")) {
		var self = this;
        post('/api/position/delete/' + position.id, {}, function(data) {
		  if (data.success) {
    		get('/api/position/list?page=0&num=10', {}, function(data) {
	  		  if (data.success) {
  				self.positions = data.msg;
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
    $('#positionlist').DataTable({
    });

	var self = this;
    get('/api/position/list?page=0&num=10', {}, function(data) {
	  if (data.success) {
  		self.positions = data.msg;
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
