<template>
    <div>
        <h3>活动列表</h3>
        <span><a class="new_company" @click="newActivity">发布活动</a></span>
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
              <th @click="activityApplication(activity)" class="delete_button">{{activity.name}}</th>
              <th>{{activity.time}}</th>
              <th>{{activity.type}}</th>
              <th @click="deleteActivity(activity)" class="delete_button">删除</th>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      table: null,
      activities: []
    }
  },
  methods: {
    newActivity: function() {
      this.$emit("newActivity");
    },
    deleteActivity: function(activity) {
      var self = this;
      post('/api/activity/' + activity.id + '/del', {}, function(data) {
        console.log(data);
        get('/api/activity/all', {}, function(data) {
          self.activities = data;
          for (let index in self.activities) {
            var activity = self.activities[index];
            if (activity.type === 'meeting') {
              activity.type = '采购见面会';
            }
            else if (activity.type === 'visiting') {
              activity.type = '走进主机厂';
            }
          }
        });
      }, true);
    },
    activityApplication: function(activity) {
      this.$emit("activityApplication", activity);
    },
  },
  mounted: function() {
      var self = this;
      get('/api/activity/all', {}, function(data) {
          self.activities = data;
          for (let index in self.activities) {
            var activity = self.activities[index];
            if (activity.type === 'meeting') {
              activity.type = '采购见面会';
            }
            else if (activity.type === 'visiting') {
              activity.type = '走进主机厂';
            }
          }
          $('#activitylist').DataTable({
          });
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
