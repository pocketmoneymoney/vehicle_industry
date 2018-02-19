<template>
  <div>
    <div class="info_panel">
	  <h3>基本信息</h3>
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

    <div class="info_panel">
	  <h3>公司信息</h3>
	  <div style="clear:both;"> </div>
	  <table>
	    <tr><td>公司名称:    </td><td>  {{ company }}</td></tr>
	    <tr><td>公司法人:    </td><td>  {{ operator }}</td></tr>
	    <tr><td>公司所在地:  </td><td>  {{ location }}</td></tr>
	  </table>
      <div style="float:right;">
        <span><a :href="companyURL"> 更多信息 </a></span>
      </div>
    </div>
    <div class="info_panel">
	  <h3>采购记录</h3>
    </div>
    <div class="info_panel">
	  <h3>活动记录</h3>
    </div>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      username: '',
	  person: '',
	  company: '',
	  location: '',
      phone: '',
      email: '',
      operator: '',
	  companyURL: '',
	  editURL: ''
    }
  },
  mounted: function () {
    var self = this;
    verifyToken(function(data) {
	  if (data.role == 'supplier') {
        var supplierID = data.id;
		self.username = data.username;
      	get('/api/supplier/' + supplierID, {}, function(data) {
          self.person = data.person.name;
          self.company = data.company.name; 
          self.operator = data.company.operator; 
          self.location = data.company.location; 
          self.phone = data.person.phone; 
          self.email = data.person.email; 
		  self.companyURL = '/src/company/detail/detail.html?id='+data.id;
          self.editURL = '/src/supplier/edit.html?id='+data.id;
      	}, true);
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
