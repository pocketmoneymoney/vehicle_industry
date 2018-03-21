<template>
  <div>
	<div class="title_bar">
	  <span> <a>修改优质供应商</a> </span>
	</div>
	<div style="clear:both;"> </div>
    <div class="formbox clearfix">
        <div>
          <dl>
              <dt><b>*</b><span>优质供应商名称：</span></dt>
              <dd>
                  <input v-model="curSuperior.name" class="text" style="z-index: 9" maxlength="40" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>优质供应商链接：</span></dt>
              <dd><input class="text" style="z-index: 9" v-model="curSuperior.link" type="text" />
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
				   <img @click="previewPoster(curSuperior.path)" :src="curSuperior.path"
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
  props: ['superior'],
  data: function() {
    return {
	  curSuperior: {}
    }
  },
  methods: {
  	previewPoster: function (url) {
      if (url) {
	    window.open(url);
	  }
	},
    cancelAction: function() {
      this.$emit("editSuperiorDone");
	},
    newActivity: function() {
      var path = this.$refs.file.files[0];
	  var name = trimStr(this.curSuperior.name);
	  var link = trimStr(this.curSuperior.link);

      if (name === '') {
        alert('请填写完整资料');
        return;
      }

      var oMyForm = new FormData();
      oMyForm.append("name", name);
      oMyForm.append("link", link);
      oMyForm.append("avatar", path);

      var self = this;
      postWithFile('/api/admin/superior/' + this.curSuperior.id, oMyForm, function(data) {
        self.$emit("editSuperiorDone");
      }, true);
    }
  },
  mounted: function() {
	this.curSuperior = this.superior;
  }
}
</script>

<style>
</style>
