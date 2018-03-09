<template>
  <div>
	<div class="title_bar">
	  <span> <a>发布职位</a> </span>
	</div>
	<div style="clear:both;"> </div>
    <div class="formbox clearfix">
    	<div>
          <dl>
              <dt><b>*</b><span>职位名称：</span></dt>
              <dd>
                  <input v-model="curPosition.name" class="text" style="z-index: 10000;" 
					maxlength="30" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>公司名称：</span></dt>
              <dd>
                  <input v-model="curPosition.company" class="text" style="z-index: 10000" 
					maxlength="50" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b></b><span>公司介绍：</span></dt>
              <dd>
                  <textarea v-model="curPosition.companyBrief" class="text" 
				    style="z-index: 10000; width:450px;height:300px;" 
					maxlength="500" type="text" />
              </dd>
          </dl>
	      <div style="clear:both;"> </div>
          <dl>
              <dt><b>*</b><span>工作地址：</span></dt>
              <dd>
                  <input v-model="curPosition.location" class="text" style="z-index: 10000" 
					maxlength="50" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b></b><span>职位描述：</span></dt>
              <dd>
                  <textarea style="z-index: 10000; width:450px;height:300px;" 
				   v-model="curPosition.brief" maxlength="1000" type="text" />
              </dd>
          </dl>
	      <div style="clear:both;"> </div>
          <dl>
              <dt><b></b><span>职位要求：</span></dt>
              <dd>
                  <textarea style="z-index: 10000; width:450px;height:300px;" 
				   v-model="curPosition.requirement" maxlength="1000" type="text" />
              </dd>
          </dl>
	      <div style="clear:both;"> </div>
          <dl>
              <dt><b></b><span>薪资待遇 ：</span></dt>
              <dd>
                  <input v-model="curPosition.salary" class="text" style="z-index: 10000" 
					maxlength="50" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>联系信息：</span></dt>
              <dd>
                  <input v-model="curPosition.contact" class="text" style="z-index: 10000" 
					maxlength="50" type="text" />
              </dd>
          </dl>
        </div>
	    <div style="clear:both;"> </div>
		<div>
          <span><a @click="cancelAction">取消</a></span>
          <span><a @click="newAction">更新</a></span>
        </div>
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
	  curPosition: {},
	  defaultPostion: {
      	name: '',
      	company: '',
      	companyBrief: '',
      	contact: '',
      	requirement: '',
      	brief: '',
      	location: '',
      	salary: '',
		id: '',
		apply: []}
    }
  },
  methods: {
    cancelAction: function() {
      this.$emit("editPositionDone");
	},
    newAction: function() {
	  var name = trimStr(this.curPosition.name);
	  var company = trimStr(this.curPosition.company);
	  var brief = this.curPosition.brief;
	  var location = this.curPosition.location;
	  var contact = this.curPosition.contact;

      if (name === '' || company === '' || brief === '' || location === '' ||
		  contact === '') {
        alert('请填写完整资料');
        return;
      }

	  var params = {};
	  params['name'] = name;
	  params['company'] = company;
	  params['companyBrief'] = this.curPosition.companyBrief;
	  params['brief'] = brief;
	  params['contact'] = this.curPosition.contact;
	  params['requirement'] = this.curPosition.requirement;
	  params['location'] = location;
	  params['salary'] = this.curPosition.salary;
	
      if (this.position.id) {
		params['id'] = this.curPosition.id;
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
	if (this.position.id) {
	  this.isNew = false;
	  this.oldPosition = this.position;
	  this.curPosition = this.position;
	} else {
	  this.isNew = true;
	  this.curPosition = this.defaultPostion;
	}
  }
}
</script>

<style>
</style>
