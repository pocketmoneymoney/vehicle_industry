<template>
    <div>
      <div class="list_panel" >
        <h3 class="h3_datatable_list">【二维码】</h3>
	    <div style="clear:both;"> </div>
		<img style="max-width:300px; max-height:300px;" :src="qrcode"/>
      </div>
      <div class="list_panel" >
        <h3 class="h3_datatable_list">【更新二维码】</h3>
	    <div style="clear:both;"> </div>
        <div> 
            <input ref="file" type="file" name="qrcode" style="z-index:10000">
            <span><a class="admin_add" @click="updateQRCode">更新</a></span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data: function() {
    var qrcode = '';
    return {
      qrcode: ''
    }
  },
  methods: {
    updateQRCode: function () {
      if (!this.$refs.file.files[0]) {
		alert("请指定上传文件");
		return;
      }

      var formData = new FormData();
      formData.append('avatar', this.$refs.file.files[0]);

	  postWithFile('/api/admin/qrcode', formData, function(data) {
		if (!data.success) {
		  console.log(data.msg);
		}
        window.location.href = '/src/management/index.html';
	  }, false);
    }
  },
  mounted: function() {
    var self = this;
	get('/api/admin/qrcode', {}, function(data) {
   		if (data.success) {
		  self.qrcode = data.msg;
		} else {
		  console.log(data.msg);
		}
    }, false);
  }
}

</script>

<style>

.list_panel{
	float: left;
	width: 700px;
	border: 1px solid #e5e5e5;
	background: #fff;
	margin-bottom: 10px;
}
.list_panel div span{
	float: right;
	padding-right: 30px;
    margin-bottom: 10px;
	font-size:16px;
}
.list_panel h3 a{
	color: #999999;
	font-size: 12px;
	font-weight: normal;
}

.fileinput-button {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.fileinput-button input{
  position: absolute;
  left: 0px;
  top: 0px;
  opacity: 0;
 -ms-filter: 'alpha(opacity=0)';
}
</style>
