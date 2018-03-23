<template>
    <div>
        <h3 class="h3_datatable_list">【应聘情况】 {{position.name}}</h3>
        <table id="position_applicationlist">
          <thead>
             <tr>
                <th>申请人</th>
                <th>申请人邮箱</th>
                <th>申请人电话</th>
                <th>申请时间</th>
                <th>身份</th>
                <th>简历</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="application in applications">
              <th>{{application.applierName}}</th>
              <th>{{application.email}}</th>
              <th>{{application.phone}}</th>
              <th>{{application.applyTime}}</th>
              <th>{{application.personRole}}</th>
              <th class="admin_op_button">
				<a @click="downloadResume(application.resume)">简历下载</a>
			  </th>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
  props: ['position'],
  data: function() {
    return {
      applications: [],
      table: null
    }
  },
  methods: {
    downloadResume: function (url) {
      window.open(url);
	  },
    reload: function () {
      var self = this;
      if (this.table) {
        this.table.destroy();
      }
      setTimeout(function() {
        self.table = $('#position_applicationlist').DataTable();
      }, 100);
    }
  },
  mounted: function() {
    this.table = $('#position_applicationlist').DataTable();

    var self = this;
    get('/api/position/appliers/'+this.position.id, {}, function (data) {
	    self.applications = retriveData(data);
      self.reload();
    }, false);
  }
}
</script>

<style lang="scss">
#position_applicationlist tbody th {
  font-weight: 400;
}
</style>
