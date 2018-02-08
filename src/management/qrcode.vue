<template>
    <div>
      <div class="list_panel" >
        <h3>二维码</h3>
		<img :src="qrcode"/>
      </div>
      <div class="list_panel" >
        <h3>更新二维码</h3>
        <div> 
            <input ref="file" type="file" name="qrcode" style="z-index:10000">
            <span class="span01"><a @click="updateQRCode">更新</a></span>
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
    }
  },
  mounted: function() {
    var self = this;
	get('/api/admin/qrcode', {}, function(data) {
		self.qrcode = data;
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
}
.list_panel h3 a{
	color: #999999;
	font-size: 12px;
	float: right;
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
