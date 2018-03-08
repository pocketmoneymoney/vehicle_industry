<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
      <div class="main2_left clearfix">
        <div class="formbox">
		  <div class="title_bar" style="width:850px"> 
            <a class="title_bar_a">职位详情</a> 
		  </div> 
		  <div class="info_panel3">
	      <div style="clear:both;"> </div>
          <dl>
              <dt><span>应聘岗位：</span></dt>
              <dd> <span>{{position.name}} </span>
              </dd>
          </dl>
          <dl>
              <dt><span>应聘公司：</span></dt>
              <dd> <span>{{position.company}} </span>
              </dd>
          </dl>
          <dl>
              <dt><span>工作地址：</span></dt>
              <dd> <span>{{position.location}} </span>
              </dd>
          </dl>
          <dl style="margin-bottom:30px">
              <dt><span>职位要求：</span></dt>
              <dd> <span>{{position.brief}} </span>
              </dd>
          </dl>
          </div>

	      <div style="clear:both;"> </div>
		  <div class="title_bar" style="width:850px"> 
            <a class="title_bar_a">我要投递</a>
		  </div> 

		  <div v-if="isNotAdmin" class="info_panel3">
	      <div style="clear:both;"> </div>
          <dl>
              <dt><b>*</b><span>姓名：</span></dt>
              <dd>
                  <input v-model="person.name" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>联系电话：</span></dt>
              <dd>
                  <input v-model="person.phone" class="text" style="z-index: 10000" maxlength="30"
                      type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>邮箱：</span></dt>
              <dd>
                  <input v-model="person.email" class="text" style="z-index: 10000" name="email" type="text" maxlength="30"/>
              </dd>
          </dl>
          <dl class="clearfix">
              <dt><b>*</b><span>上传简历：</span></dt>
              <dd>
                  <input ref="resume" type="file" name="file" style="z-index:10000" />
              </dd>
          </dl>
		  </div>
	      <div style="clear:both;"> </div>
		  <div>
            <span><a @click="cancelActivity">取消并返回</a></span>
            <span><a @click="enrollActivity">提交</a></span>
		  </div>
        </div>
      </div>
	  <main-right></main-right>
	  </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import EventEnrollPanel from '../util/event_enroll_panel.vue'
import RightPanel from '../util/right_panel.vue'
import LastFooter from '../util/footer.vue'
import MainRight from './main_right.vue'


export default {
  data: function() {
    return {
 	  position: {},
	  isNotAdmin: true,
	  person: {
		'name': '',
		'phone': '',
		'email': '',
		'role': '',
		'id': '' }
    }
  },
  methods: {
    cancelActivity: function() {
	  window.location.href='/src/position/index.html';
	},
    enrollActivity: function() {
	  var name = trimStr(this.person.name);
	  var email = trimStr(this.person.email);
	  var phone = trimStr(this.person.phone);

      if (name === '' ||  email === '' || phone === '') {
        alert('请填写完整资料');
        return;
      }

	  if (!this.$refs.resume.files[0]) {
        alert('请上传个人简历');
        return;
	  }

      var oMyForm = new FormData();
      oMyForm.append("name", name);
      oMyForm.append("phone", phone);
      oMyForm.append("email", email);

      oMyForm.append("personID", this.person.id);
      oMyForm.append("personRole", this.person.role);
      oMyForm.append("id", this.position.id);

      oMyForm.append("resume", this.$refs.resume.files[0]);

      var self = this;
      postWithFile('/api/position/apply', oMyForm, function(data) {
        if (!data.success) {
          console.log(data.msg);
        }
        window.location.href = '/src/position/index.html';
      }, false);
    }
  },
  mounted: function() {
	var self = this;

	var id = getUrlKey('id');
	if (!id) {
	  window.location.href="/src/position/index.html";	
	}

    get('/api/position/'+id, {}, function(data) {
	  if (data.success) {
	    self.position = data.msg;
	  }
	}, false);

	getLoginInfo(function (person) {
	  if (person.name) {
		self.person = person;
		if (self.person.role == "admin") {
	  	  self.isNotAdmin = false;
  		} 
	  }
	});
  },
  components: {MainHeader, MainNav, TopBar, LastFooter, EventEnrollPanel, RightPanel,
			   MainRight}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
.h3_cls {
	padding-left: 15px;
	border-left: 6px solid #3d9ccc;
    margin-top: 20px;
    margin-bottom: 40px;
    margin-left: 15px;
	font-size: 32px;
	font-weight: normal;
}   
</style>
