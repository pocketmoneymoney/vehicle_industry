<template>
  <div>
	<div class="title_bar">
	  <span> <a>修改活动广告</a> </span>
	</div>
	<div style="clear:both;"> </div>
    <div class="formbox clearfix">
        <div>
          <dl>
              <dt><b>*</b><span>活动名称：</span></dt>
              <dd>
                  <input v-model="curAdvertise.name" class="text" style="z-index: 9" maxlength="40" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>活动链接：</span></dt>
              <dd><input class="text" style="z-index: 9" v-model="curAdvertise.link" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>活动图片：</span></dt>
              <dd>
                    <input ref="file" type="file" name="file" style="z-index: 9"/>
			  </dd>
		  </dl>
		  <div style="clear:both;"> </div>
		  <dl>
			  <dt><b>  </b><span>预览:</span> </dt>
			  <dd>
				   <img @click="previewPoster(curAdvertise.path)" :src="curAdvertise.path"
					style="max-width:250px; max-height:150px"> </img>
              </dd>
          </dl>
        </div>
	    <div style="clear:both;"> </div>
		<div style="margin-top:20px">
          <span><a @click="cancelAction">取消</a></span>
          <span><a @click="newActivity">更新</a></span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['advertise'],
  data: function() {
    return {
	  curAdvertise: {}
    }
  },
  methods: {
  	previewPoster: function (url) {
      if (url) {
	    window.open(url);
	  }
	},
    cancelAction: function() {
      this.$emit("editAdvertiseDone");
	},
    newActivity: function() {
      var path = this.$refs.file.files[0];
	  var name = trimStr(this.curAdvertise.name);
	  var link = trimStr(this.curAdvertise.link);

      if (name === '') {
        alert('请填写完整资料');
        return;
      }

      var oMyForm = new FormData();
      oMyForm.append("name", name);
      oMyForm.append("link", link);
      oMyForm.append("avatar", path);

      var self = this;
      postWithFile('/api/admin/advertise/' + this.curAdvertise.id, oMyForm, function(data) {
        self.$emit("editAdvertiseDone");
      }, true);
    }
  },
  mounted: function() {
	this.curAdvertise = this.advertise;
  }
}
</script>

<style>
</style>
