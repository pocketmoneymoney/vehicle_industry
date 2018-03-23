<template>
    <div>
        <h3 class="h3_datatable_list">【供应商列表】</h3>
        <span><a class="admin_add" @click="addCompany()">添加公司</a></span>
	    <div style="clear:both;"> </div>
        <table id="userlist">
          <thead>
             <tr>
                <th>公司名称</th>
                <th>用户名称</th>
                <th>认证</th>
                <th>认证操作</th>
                <th>优质供应商</th>
                <th>优质供应商操作</th>
                <th>操作</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="user in users">
              <th @click="redirectToCompany(user)" class="delete_button">{{user.company}}</th>
              <th>{{user.owner}}</th>
              <th v-if="user.verified">已认证</th>
              <th v-else>未认证</th>
              <th v-if="user.verified" @click="deAuthenticate(user)" class="delete_button">取消认证</th>
              <th v-else @click="authenticate(user)" class="delete_button">认证</th>
              <th v-if="user.superior">是</th>
              <th v-else>否</th>
              <th v-if="user.superior" @click="deSelect(user)" class="delete_button">取消优质供应商</th>
              <th v-else @click="select(user)" class="delete_button">添加至优质供应商</th>
              <th @click="deleteUser(user)" class="delete_button">删除</th>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
  data: function() {
    var users = [
      {name: "Tiger Nixon",
       username: "System Architect",
       authenticated: true,
       ad: true,
       selected: true,
       table: null
      },
      {
        name: "Garrett Winters",
        username: "Director",
       authenticated:false,
       ad: false,
       selected: false
      }
    ];
    return {
      users: []
    }
  },
  methods: {
	addCompany: function() {
		window.location.href = '/src/company/detail/edit_brief.html';
	},
    redirectToCompany: function(user) {
	  var companyURL = '/src/company/detail/detail.html?id=' + user.id;
      window.location.href = companyURL;
	},
    authenticate: function(user) {
      user.verified = true;
	  this.updatePrivilege(user);
    },
    deAuthenticate: function(user) {
      user.verified = false;
	  this.updatePrivilege(user);
    },
    ad: function(user) {
      user.advertise = true;
	  this.updatePrivilege(user);
    },
    deAd: function(user) {
      user.advertise = false;
	  this.updatePrivilege(user);
    },
    select: function(user) {
      user.superior = true;
	  this.updatePrivilege(user);
    },
    deSelect: function(user) {
      user.superior = false;
	  this.updatePrivilege(user);
    },
    deleteUser: function(user) {
      if(confirm("确定删除么?")) {
		var self = this;
        post('/api/supplier/delete/' + user.id, {}, function(data) {
		  if (data.success) {
    		get('/api/supplier/privilege?page=0&num=100', {}, function(data) {
	  		  if (data.success) {
  				self.users = data.msg;
          self.reload();
			  }
			});
		  } else {
			console.log(data.msg);
      	  }
		}, true);
	  }
    },
    updatePrivilege: function (user) {
      var params = {
		'verified': user.verified,
		'advertise': user.advertise,
		'superior': user.superior};

      post('/api/supplier/privilege/' + user.id, params,
		function (data) {
          console.log(data);
	  }, true);
	},
    reload: function () {
      var self = this;
      if (this.table) {
        this.table.destroy();
      }
      setTimeout(function() {
        self.table = $('#userlist').DataTable();
      }, 100);
    }
  },
  mounted: function() {
    var self = this;
    this.table = $('#userlist').DataTable();
    get('/api/supplier/privilege?page=0&num=10000', {}, function (data) {
	  if (data.success) {
        self.users = data.msg;
        self.reload();
      }
	}, false);
  },
}
</script>

<style lang="scss">
#userlist tbody th {
  font-weight: 400;
}
.delete_button {
  color: #449cd7;
  cursor: pointer;
}
</style>
