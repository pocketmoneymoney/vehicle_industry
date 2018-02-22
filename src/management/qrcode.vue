<template>
    <div>
      <div class="list_panel" >
        <h3>二维码</h3>
		<img style="max-width:100px; max-height:100px;" :src="qrcode"/>
      </div>
      <div class="list_panel" >
        <h3>更新二维码</h3>
        <div> 
            <input ref="file" type="file" name="qrcode" style="z-index:10000">
            <span class="span01" style="float:right;"><a @click="updateQRCode">更新</a></span>
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
	width: 698px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px;
	margin-bottom: 8px;
}
.list_panel h3 span{
	float: left;
	padding-left: 15px;
	border-left: 6px solid #3d9ccc;
    margin-bottom: 10px;
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
