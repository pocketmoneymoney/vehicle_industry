<template>
    <div>
        <h3 class="h3_datatable_list">【活动广告位列表】</h3>
        <span><a class="admin_add" @click="initAdvertise()">恢复默认设置</a></span>
	    <div style="clear:both;"> </div>
        <table id="positionlist">
          <thead>
             <tr>
                <th>名称</th>
                <th>链接</th>
                <th>操作</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="advertise in ads">
              <th>{{advertise.name}}</th>
              <th>{{advertise.link}}</th>
			  <th>
				<a @click="editAdvertise(advertise)" class="admin_op_button">编辑 </a>
                <a @click="deleteAdvertise(advertise)" class="admin_op_button">恢复默认</a>
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
      ads: [],
      table: null
    }
  },
  methods: {
	initAdvertise: function() {
      if(confirm("确定恢复默认设置将删除所有已经存在的广告内容，确定继续？")) {
		var self = this;
		post('/api/admin/advertise/default', {}, function(data) {
	    	if (!data.success) {
				console.log(data.msg);
			}
			self.reload();
		}, true);
	  }
	},
    editAdvertise: function(advertise) {
      this.$emit("editAdvertise", advertise);
    },
    deleteAdvertise: function(advertise) {
      if(confirm("确定删除么?")) {
		var self = this;
        post('/api/admin/advertise/default/' + advertise.id, {}, function(data) {
          self.reload();
        }, true);
	  }
	},
    reload: function () {
	  var self = this;
      get('/api/admin/advertise', {}, function(data) {
	    if (data.success) {
  		  self.ads = data.msg;
	    } else {
		  console.log(data.msg);
	    }
	  }, false);
    }
  },
  mounted: function() {
    this.table = $('#positionlist').DataTable({
		paging:		false,
		searching:  false,
    	ordering:   false
	});
	this.reload();
  }
}
</script>

<style lang="scss">
#positionlist tbody th {
  font-weight: 400;
}
</style>
