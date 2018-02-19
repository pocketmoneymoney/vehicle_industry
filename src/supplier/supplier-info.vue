<template>
  <div>
	<h2>我的个人信息</h2>
    <div class="list_panel">
	  <h3>基本信息</h3>
	  <table>
	    <tr><td>用户名:      </td><td>  {{ username }}</td></tr>
	    <tr><td>真实姓名:    </td><td>  {{ person }}</td></tr>
	    <tr><td>公司名称:    </td><td>  {{ company }}</td></tr>
	    <tr><td>联系电话:    </td><td>  {{ phone }}</td></tr>
	    <tr><td>邮    箱:    </td><td>  {{ email }}</td></tr>
	  </table>
      <div style="float:right;">
        <span class="span01"><a href="/">修改基本信息   </a></span>
        <span class="span01"><a href="/src/register/password.html">重置密码    </a></span>
      </div>
    </div>
    <div class="list_panel">
	  <h3>公司信息</h3>
    </div>
    <div class="list_panel">
	  <h3>采购记录</h3>
    </div>
    <div class="list_panel">
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
      phone: '',
      email: ''
    }
  },
  mounted: function () {
    var self = this;
    if (getCookie('token')) { 
      post('/user/book', {}, function(data) {
        if (data.username) {
          self.username = data.username;
		  if (data.role == 'supplier') {
      	    var supplierID = data.id;
      	    get('/api/supplier/' + supplierID, {}, function(data) {
        	  self.person = data.person;
        	  self.company = data.company; 
        	  self.phone = data.phone; 
        	  self.email = data.email; 
      	    }, true);
          } else {
		    delCookie('token');
		    delCookie('id');
		    delCookie('role');
            window.location.href = '/src/redirect/expired.html';
		  }
        } else {
		  delCookie('token');
		  delCookie('id');
		  delCookie('role');
          window.location.href = '/src/redirect/expired.html';
	    }
	  }, true);
    } else {
      delCookie('token');
	  delCookie('id');
	  delCookie('role');
      window.location.href = '/src/redirect/expired.html';
    }	
  },
  components: {}
}
</script>

<style scoped>
.list_panel{
	width: 970px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 15px 15px 30px;
	margin-bottom: 8px;
}
.list_panel h3 span{
	float: left;
}
.list_panel h3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
}
.list_panel tr{
    padding:15px;
	font-size: 18px;
}

</style>
