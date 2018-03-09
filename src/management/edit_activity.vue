<template>
  <div>
	<div class="title_bar">
	  <span> <a>发布活动</a> </span>
	</div>
	<div style="clear:both;"> </div>
    <div class="formbox clearfix">
        <div>
          <dl>
              <dt><b>*</b><span>活动名称：</span></dt>
              <dd>
                  <input v-model="curActivity.name" class="text" style="z-index: 9" maxlength="40" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>活动时间：</span></dt>
              <dd>
				<label>
                  <input class="text" v-model="curActivity.startTime" style="z-index: 10000;width:180px;" type="text"/> </label>
				  <span> 到 </span>
				<label>
                  <input class="text" v-model="curActivity.endTime" style="z-index: 10000;width:180px;" type="text"/> </label>
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>活动地点：</span></dt>
              <dd><input class="text" style="z-index: 9" v-model="curActivity.location" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>活动大海报：</span></dt>
              <dd>
                    <input ref="bigActivityPoster" type="file" name="file" style="z-index: 9"/>
			  <dd>
			  </dd>
				   <span @click="previewPoster(curActivity.bigPoster)"> 预览: {{curActivity.bigPoster}} </span> 
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>活动小海报：</span></dt>
              <dd>
                  <input ref="smallActivityPoster" type="file" name="file" style="z-index: 9" />
              </dd>
			  </dd>
				   <span @click="previewPoster(curActivity.bigPoster)"> 预览: {{curActivity.smallPoster}} </span> 
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>活动预告图：</span></dt>
              <dd>
                  <input ref="tinyActivityPoster" type="file" name="file" style="z-index: 9" />
              </dd>
			  </dd>
				   <span @click="previewPoster(curActivity.bigPoster)"> 预览: {{curActivity.tinyPoster}} </span> 
              </dd>
          </dl>
        </div>
	    <div style="clear:both;"> </div>
		<div>
          <span><a @click="cancelAction">取消</a></span>
          <span><a @click="newActivity">更新</a></span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['activity'],
  data: function() {
    return {
	  isNew: false,
	  hasPreview: true,
	  curActivity: {},
	  defaultActivity: {
		id: '',
		name: '',
		location: '',
		startTime: '',
		endTime: '',
		type: '',
		bigPoster: '',	
		smallPoster: '',	
		tinyPoster: '',	
	  }
    }
  },
  methods: {
  	previewPoster: function (url) {
      if (url) {
	    window.open(url);
	  }
	},
    cancelAction: function() {
      this.$emit("editActivityDone");
	},
    newActivity: function() {
      var time1 = trimStr(this.curActivity.startTime);
      var time2 = trimStr(this.curActivity.endTime);

      var bigPoster = this.$refs.bigActivityPoster.files[0];
      var smallPoster = this.$refs.smallActivityPoster.files[0];
      var tinyPoster = this.$refs.tinyActivityPoster.files[0];

	  var name = trimStr(this.curActivity.name);
	  var location = trimStr(this.curActivity.location);
	  var type = 'meeting';

	  if (this.isNew) {
		if (!type) {
          alert('请填写活动类型');
          return;
        }

		if (bigPoster === undefined && smallPoster === undefined &&
		    tinyPoster === undefined) {
          alert('请上传至少一张活动海报');
          return;
        }
	  }

      if (name === '' || time1 === '' || time2 === '' || location === '') {
        alert('请填写完整资料');
        return;
      }

      var oMyForm = new FormData();
      oMyForm.append("name", name);
      oMyForm.append("location", location);
      oMyForm.append("startTime", time1);
      oMyForm.append("endTime", time2);
      oMyForm.append("type", type);
      oMyForm.append("bigPoster", bigPoster);
      oMyForm.append("smallPoster", smallPoster);
      oMyForm.append("tinyPoster", tinyPoster);

	  if (this.curActivity.id) {
        oMyForm.append("id", this.curActivity.id);
	  }

      var self = this;
      postWithFile('/api/activity/new', oMyForm, function(data) {
        self.$emit("editActivityDone");
      }, true);
    }
  },
  mounted: function() {
	if (this.activity.id) {
	  this.isNew = false;
	  this.curActivity = this.activity;
	} else {
	  this.curActivity = this.defaultActivity;
	  this.isNew = true;
	}

    $(this.$refs.activityDatepicker).datepicker({
      format: 'mm/dd/yyyy',
      startDate: '-3d'
    });
    $(this.$refs.activityDatepicker2).datepicker({
      format: 'mm/dd/yyyy',
      startDate: '-3d'
    });
  }
}
</script>

<style>
</style>
