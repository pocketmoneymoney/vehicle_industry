<template>
    <div>
        <h3 class="h3_datatable_list">【活动列表】</h3>
        <span><a class="admin_add" @click="editActivity({})">发布活动</a></span>
	    <div style="clear:both;"> </div>
        <table id="activitylist">
          <thead>
             <tr>
                <th>活动名称</th>
                <th>活动时间</th>
                <th>活动类型</th>
                <th>操作</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="activity in activities">
              <th @click="activityApplication(activity)" class="admin_op_button">{{activity.name}}</th>
              <th>{{activity.startTime}} -- {{activity.endTime}}</th>
              <th>{{activity.type}}</th>
              <th>
				<a @click="activityApplication(activity)" class="admin_op_button">活动报名情况 </a>
			    <a @click="editActivity(activity)" class="admin_op_button">编辑 </a>
			    <a @click="deleteAction(activity)" class="admin_op_button">删除 </a>
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
      activities: [],
      table: null
    }
  },
  methods: {
    editActivity: function(activity) {
      this.$emit("editActivity", activity);
    },
    deleteAction: function(activity) {
      if(confirm("确定删除么?")) {
      var self = this;
      post('/api/activity/' + activity.id + '/del', {}, function(data) {
		if (data.success) {
          get('/api/activity/all?page=0&num=100', {}, function(data) {
            self.activities = data.msg;
            for (let index in self.activities) {
              var activity = self.activities[index];
              if (activity.type === 'meeting') {
                activity.type = '采购见面会';
              }
              else if (activity.type === 'visiting') {
                activity.type = '走进主机厂';
              }
            }
            self.reload();
          });
		}
      }, true);
	 }
    },
    activityApplication: function(activity) {
      this.$emit("activityApplication", activity);
    },
    reload: function () {
      if (this.table) {
        this.table.destroy();
      }
      setTimeout(function() {
        this.table = $('#activitylist').DataTable();
      }, 100);
    }
  },
  mounted: function() {
      var self = this;
      this.table = $('#activitylist').DataTable();
      get('/api/activity/all?page=0&num=100', {}, function(data) {
		if (data.success) {
          self.activities = data.msg;
          for (let index in self.activities) {
            var activity = self.activities[index];
            if (activity.type === 'meeting') {
              activity.type = '采购配对会';
            }
            else if (activity.type === 'visiting') {
              activity.type = '走进主机厂';
            }
          }
          self.reload();
		}
      }, false);
  },
}
</script>

<style lang="scss">
#activitylist tbody th {
  font-weight: 400;
}
.delete_button {
  cursor: pointer;
}
.new_company { background:#e2f5ff; border:1px solid #c8eafa; border-radius:0.2em; font-size:13px; line-height:26px; text-align:center; color:#3d9ccc; padding:0 10px;}
</style>
