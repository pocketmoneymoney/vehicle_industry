<template>
    <div class="formbox clearfix">
      <h3>发布职位</h3>
    	<div>
          <dl>
              <dt><b>*</b><span>职位名称：</span></dt>
              <dd>
                  <input v-model="position.name" class="text" style="z-index: 10000;" 
					maxlength="30" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>公司名称：</span></dt>
              <dd>
                  <input v-model="position.company" class="text" style="z-index: 10000" 
					maxlength="50" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>职位要求：</span></dt>
              <dd>
                  <textarea style="z-index: 10000; width:450px;height:300px;" v-model="position.brief" 
				   maxlength="1000" type="text" />
              </dd>
          </dl>
        </div>
	    <div style="clear:both;"> </div>
		<div>
          <span><a @click="cancelAction">取消</a></span>
          <span><a @click="newAction">更新</a></span>
        </div>
    </div>
</template>

<script>
export default {
  props: ['position'],
  data: function() {
    return {
	  isNew: false,
	  oldPosition: {},
	  defaultPostion: {
      	name: '',
      	company: '',
      	brief: '',
		id: '',
		time: '',
		apply: []}
    }
  },
  methods: {
    cancelAction: function() {
      this.$emit("editPositionDone");
	},
    newAction: function() {
	  var name = trimStr(this.position.name);
	  var company = trimStr(this.position.company);
	  var brief = trimStr(this.position.brief);

      if (name === '' || company === '' || brief === '') {
        alert('请填写完整资料');
        return;
      }

	  var params = {};
	  params['name'] = name;
	  params['company'] = company;
	  params['brief'] = brief;
	
      if (this.position.id) {
		params['id'] = this.position.id;
	  }

	  post('/api/position', params, function (data) {
  		if (!data.success) {
		  console.log(data.msg);
		}
	  }, true);
      this.$emit("editPositionDone");
	}
  },
  mounted: function() {
	if (this.position != {}) {
	  this.isNew = false;
	  this.oldPosition = this.position;
	} else {
	  this.isNew = true;
	  this.position = this.defaultPostion;
	}
  }
}
</script>

<style>
</style>
