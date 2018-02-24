<template>
    <div>
        <h3 class = "h3_datatable_list">【报名情况】 {{purchase.name}}</h3>
        <table id="purchase_applicationlist">
          <thead>
             <tr>
                <th>报名人</th>
                <th>公司</th>
                <th>邮箱</th>
                <th>电话</th>
                <th>留言</th>
                <th>身份</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="application in applications">
              <th>{{application.applierName}}</th>
              <th>{{application.company}}</th>
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
  props: ['purchase'],
  data: function() {
    return {
      applications: []
    }
  },
  methods: {
  },
  mounted: function() {
    $('#purchase_applicationlist').DataTable({
      searching: false,
      ordering:  false
    });

	var self = this;
	get('/api/purchase/appliers/' + this.purchase.id, {}, function(data) {
	  self.applications = retriveData(data);
	}, false);
  },
}
</script>

<style lang="scss">
#purchase_applicationlist tbody th {
  font-weight: 400;
}
</style>
