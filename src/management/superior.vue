<template>
    <div>
        <h3 class="h3_datatable_list">【优质供应商列表】</h3>
        <span><a class="admin_add" @click="initSuperior()">恢复默认设置</a></span>
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
            <tr v-for="sp in superior">
              <th>{{sp.name}}</th>
              <th>{{sp.link}}</th>
			  <th>
				<a @click="editSuperior(sp)" class="admin_op_button">编辑 </a>
                <a @click="deleteSuperior(sp)" class="admin_op_button">恢复默认</a>
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
      superior: [],
      table: null
    }
  },
  methods: {
	initSuperior: function() {
      if(confirm("确定恢复默认设置将删除所有已经存在的广告内容，确定继续？")) {
		var self = this;
		post('/api/admin/superior/default', {}, function(data) {
	    	if (!data.success) {
				console.log(data.msg);
			}
			self.reload();
		}, true);
	  }
	},
    editSuperior: function(superior) {
      this.$emit("editSuperior", superior);
    },
    deleteSuperior: function(superior) {
      if(confirm("确定删除么?")) {
		var self = this;
        post('/api/admin/superior/default/' + superior.id, {}, function(data) {
          self.reload();
        }, true);
	  }
	},
    reload: function () {
	  var self = this;
      get('/api/admin/superior', {}, function(data) {
	    if (data.success) {
  		  self.superior = data.msg;
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
