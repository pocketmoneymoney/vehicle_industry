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

    <div class="info_panel2">
	  <h2>公司信息</h2>
	  <div style="clear:both;"> </div>
	  <table>
	    <tr><td>公司名称:    </td><td>  {{ company }}</td></tr>
	    <tr><td>配套客户:    </td><td>  {{ customer }}</td></tr>
	    <tr><td>主营产品:    </td><td>  {{ product }}</td></tr>
	    <tr><td>公司法人:    </td><td>  {{ operator }}</td></tr>
	    <tr><td>公司所在地:  </td><td>  {{ location }}</td></tr>
	  </table>
      <div style="float:right;">
        <span><a :href="companyURL"> 更多信息 </a></span>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      username: '',
      id: '',
	  person: '',
	  company: '',
	  location: '',
      phone: '',
      email: '',
      operator: '',
	  companyURL: '',
	  editURL: '',
	  purchasePublishRecordURL: '',
      activities: []
    }
  },
  mounted: function () {
    var self = this;
    verifyToken(function(data) {
	  if (data.role == 'supplier') {
        self.id = data.id;
		self.username = data.username;

      	get('/api/supplier/' + self.id, {}, function(data) {
          if (data.success) { 
            self.person = data.msg.person.myname;
            self.company = data.msg.company.name; 
            self.operator = data.msg.company.operator; 
            self.location = data.msg.company.location; 
            self.customer = data.msg.company.customer; 
            self.product = data.msg.company.product; 
            self.phone = data.msg.person.phone; 
            self.email = data.msg.person.email; 
		    self.companyURL = '/src/company/detail/detail.html?id=' + data.msg.id;
            self.editURL = '/src/supplier/edit.html?id=' + data.msg.id;
			self.purchasePublishRecordURL = 
				'/src/supplier/purchase_publish_record.html?id=' + data.msg.id;
          } else {
            console.log(data.msg);
          }
      	}, true);

        get('/api/activity/all', {userId: self.id}, function(data) {
          self.activities = data;
        });
      } else {
        window.location.href = '/src/redirect/expired.html';
      } 
    });
  }
}
</script>

<style scoped>

</style>
