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
                <th>身份</th>
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
              <th>{{application.role}}</th>
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
    $('#activity_applicationlist').DataTable({
     searching: false,
     ordering:  false
    });

    var self = this;
    get('/api/activity/' + this.activity.id, {}, function(data) {
	  if (data.success) {
		var applies = data.msg.apply;
	    for (var index = 0; index < applies.length; index++) {
		  var applier = applies[index];
		  var newApplier = {
			'name': applier.applierName,			
			'company': applier.company,
			'position': applier.position,
			'email': applier.email,
			'phone': applier.phone,
			'comment': applier.comment 
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
