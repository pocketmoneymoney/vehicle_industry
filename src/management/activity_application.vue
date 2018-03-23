<template>
    <div>
        <h3 class="h3_datatable_list">【报名情况】 {{activity.name}}</h3>
        <table id="activity_applicationlist">
          <thead>
             <tr>
                <th>报名人</th>
                <th>报名人公司</th>
                <th>报名人职位</th>
                <th>报名人邮箱</th>
                <th>报名人电话</th>
                <th>报名人留言</th>
                <th>身份</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="application in applications">
              <th>{{application.applierName}}</th>
              <th>{{application.company}}</th>
              <th>{{application.position}}</th>
              <th>{{application.email}}</th>
              <th>{{application.phone}}</th>
              <th>{{application.comment}}</th>
              <th>{{application.personRole}}</th>
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
      applications: [],
      table: null
    }
  },
  methods: {
    reload: function () {
      var self = this;
      if (this.table) {
        this.table.destroy();
      }
      setTimeout(function() {
        self.table = $('#activity_applicationlist').DataTable();
      }, 100);
    }
  },
  mounted: function() {
    this.table = $('#activity_applicationlist').DataTable();

    var self = this;
    get('/api/activity/appliers/'+this.position.id, {}, function (data) {
	    self.applications = retriveData(data);
      self.reload();
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
