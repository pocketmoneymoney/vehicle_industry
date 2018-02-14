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
              <th>{{activity.name}}</th>
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
    var activities = [
    {
        name: "Tiger Nixon",
        type: "走进主机厂",
        time: "2011/04/25"
    },
    {
        name: "Garrett Winters",
        time: "2011/07/25",
        type: "采购见面会"
    }
    ];
    return {
      activities: activities
    }
  },
  methods: {
    newActivity: function() {
      this.$emit("newActivity");
    },
    deleteActivity: function(activity) {
    }
  },
  mounted: function() {
    $('#activitylist').DataTable({
    });
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
