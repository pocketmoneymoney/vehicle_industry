<template>
  <div>
	<h2>我的个人信息</h2>
    <div class="list_panel">
	  <h3>基本信息</h3>
	  <table>
	    <tr><td>注册用户名:  </td><td>xxx</td></tr>
	    <tr><td>真实姓名:    </td><td>xxx</td></tr>
	    <tr><td>公司名称:    </td><td>xxx</td></tr>
	    <tr><td>联系电话:    </td><td>xxx</td></tr>
	    <tr><td>邮    箱:    </td><td>xxx</td></tr>
	  </table>
      <div style="float:right;">
        <span class="span01"><a href="/">修改基本信息   </a></span>
        <span class="span01"><a href="/">重置密码    </a></span>
      </div>
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
	  psersonName: '',
	  company: '',
      phone: '',
      email: ''
    }
  },
  methods: {
    mounted: function () {
      var self = this;
      
      

      get
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
	padding: 19px 20px;
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

</style>
