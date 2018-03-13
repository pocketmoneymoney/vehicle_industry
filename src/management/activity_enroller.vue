<template>
    <div>
        <h3 class="h3_datatable_list">【申请活动列表】</h3>
        <table id="activity_enrolllist">
          <thead>
             <tr>
                <th>活动名称</th>
                <th>活动时间</th>
                <th>活动类型</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="activity in activities">
              <th>{{activity.name}}</th>
              <th>{{activity.startTime}} -- {{activity.endTime}}</th>
              <th>{{activity.type}}</th>
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
    reload: function () {
      if (this.table) {
        this.table.destroy();
      }
      setTimeout(function() {
        this.table = $('#activity_enrolllist').DataTable();
      }, 100);
    }
  },
  mounted: function() {
    this.table = $('#activity_enrolllist').DataTable();

	var self = this;
	var publisherID = getUrlKey('id');

    post('/user/book', {}, function(data) {
	  if ((data.username) && (data.id == publisherID)) {
		self.getUrl = '/api/activity/list_apply?page=0&num=100&id=' + publisherID;
	    get(self.getUrl, {}, function(data) {
  	  	  self.activities = retriveData(data);
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
	    }, false);
	  } else {
        window.location.href = '/src/redirect/expired.html';
	  }
    }, true);
  },
}
</script>

<style lang="scss">
#purchaselist tbody th {
  font-weight: 400;
}
</style>
