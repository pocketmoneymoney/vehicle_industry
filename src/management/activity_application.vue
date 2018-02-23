<template>
    <div>
        <h3>{{activity.name}}</h3>
        <table id="activity_applicationlist">
          <thead>
             <tr>
                <th>报名人</th>
                <th>报名人公司</th>
                <th>报名人职位</th>
                <th>报名人邮箱</th>
                <th>报名人电话</th>
                <th>报名人留言</th>
                <th>是否为注册用户</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="application in applications">
              <th>{{application.name}}</th>
              <th>{{application.company}}</th>
              <th>{{application.position}}</th>
              <th>{{application.email}}</th>
              <th>{{application.phone}}</th>
              <th>{{application.comment}}</th>
              <th>{{application.isUser}}</th>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
  props: ['activity'],
  data: function() {
    return {
      applications: []
    }
  },
  methods: {
  },
  mounted: function() {
    var self = this;
    get('/api/activity/' + this.activity.id, {}, function(data) {
        self.applications = data.applications;
        for (let index in self.applications) {
          var application = self.applications[index];
          if (application.userId === null) {
            application.isUser = '否';
          }
          else {
            application.isUser = '是';
          }
        }
        $('#activity_applicationlist').DataTable({
        });
    }, false);
  },
}
</script>

<style lang="scss">
#activity_applicationlist tbody th {
  font-weight: 400;
}
.delete_button {
  cursor: pointer;
}
.new_company { background:#e2f5ff; border:1px solid #c8eafa; border-radius:0.2em; font-size:13px; line-height:26px; text-align:center; color:#3d9ccc; padding:0 10px;}
</style>
