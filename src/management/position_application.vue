<template>
    <div>
        <h3>{{position.name}}</h3>
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
              <th>{{application.name}}</th>
              <th>{{application.email}}</th>
              <th>{{application.phone}}</th>
              <th>{{application.time}}</th>
              <th>{{application.role}}</th>
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
      applications: []
    }
  },
  methods: {
    downloadResume: function (url) {
      window.open(url);
	}
  },
  mounted: function() {
    $('#position_applicationlist').DataTable({
      searching: false,
      ordering:  false
    });
    var self = this;
    get('/api/position/appliers/'+this.position.id, {}, function (data) {
	  if (data.success) {
	    for (var index = 0; index < data.msg.length; index++) {
		  var applier = data.msg[index];
          var newApplier = {
     	    'name': applier.applierName,
		    'phone': applier.phone,
		    'email': applier.email,
		    'time': applier.applyTime,
		    'resume': applier.resume 
		  };
		  if (applier.role == 'supplier') {
 		    newApplier['role'] = "供应商";
 	      } else if (applier.role == 'buyer') {
 		    newApplier['role'] = "采购商";
		  } else {
 		    newApplier['role'] = "游客";
		  }
		  self.applications.push(newApplier);
	    }
	  }
    }, false);
  }
}
</script>

<style lang="scss">
#position_applicationlist tbody th {
  font-weight: 400;
}
</style>
