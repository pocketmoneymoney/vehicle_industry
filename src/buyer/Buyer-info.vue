<template>
  <div>
    <div class="info_panel2">
	  <h2>基本信息</h2>
	  <div style="clear:both;"> </div>
	  <table>
	    <tr><td>用户名:      </td><td>  {{ username }}</td></tr>
	    <tr><td>真实姓名:    </td><td>  {{ person }}</td></tr>
	    <tr><td>联系电话:    </td><td>  {{ phone }}</td></tr>
	    <tr><td>邮    箱:    </td><td>  {{ email }}</td></tr>
	  </table>
      <div style="float:right;">
        <span><a :href="editURL">修改基本信息   </a></span>
        <span><a href="/src/register/password.html">重置密码    </a></span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
	  username: '',
	  person: '',
	  phone: '',
	  email: '',
	  editURL: '',
    activities: []
    }
  },
  mounted: function () {
    var self = this;
    verifyToken(function(data) {
	  if (data.role == 'buyer') {
        var buyerID = data.id;
		self.username = data.username;

      	get('/api/buyer/' + buyerID, {}, function(data) {
          if (data.success) { 
            self.person = data.msg.name;
            self.phone = data.msg.phone; 
            self.email = data.msg.email; 
            self.editURL = '/src/buyer/edit.html?id=' + data.msg.id;
          } else {
            console.log(data.msg);
          }
      	}, true);
        get('/api/activity/all', {userId: buyerID}, function(data) {
          self.activities = data;
        });
      } else {
        window.location.href = '/src/redirect/expired.html';
      } 
    });
  },
  components: {}
}
</script>

<style scoped>
</style>
