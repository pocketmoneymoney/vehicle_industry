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
            <a class="title_bar_a">活动详情</a>
		  </div> 
		  <div class="info_panel3">
	      <div style="clear:both;"> </div>
          <dl>
              <dt><b></b><span>活动名称：</span></dt>
              <dd> <span>{{activity.name}} </span> </dd>
          </dl>
          <dl>
              <dt><b></b><span>活动时间：</span></dt>
              <dd> <span>{{activity.startTime}} - {{activity.endTime}} </span> </dd>
          </dl>
          <dl>
              <dt><b></b><span>活动地点：</span></dt>
              <dd> <span>{{activity.location}} </span> </dd>
          </dl>
		  </div>

	      <div style="clear:both;"> </div>
		  <div class="title_bar" style="width:850px"> 
            <a class="title_bar_a">我要报名</a>
		  </div> 

		  <div v-if="isNotAdmin" class="info_panel3">
          <dl>
              <dt><b>*</b><span>姓名：</span></dt>
              <dd>
                  <input v-model="person.name" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>公司：</span></dt>
              <dd>
                  <input v-model="company" class="text" style="z-index: 10000" maxlength="40"
                      type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>职位：</span></dt>
              <dd>
                  <input v-model="position" class="text" style="z-index: 10000" maxlength="30"
                      type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>联系电话：</span></dt>
              <dd>
                  <input v-model="person.phone" class="text" style="z-index: 10000" maxlength="20"
                      type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>邮箱：</span></dt>
              <dd>
                  <input v-model="person.email" class="text" style="z-index: 10000" name="email" type="text" maxlength="30"/>
              </dd>
          </dl>
          <dl>
              <dt><b>*</b><span>留言：</span></dt>
              <dd>
                  <textarea v-model="comment" class="text" style="z-index: 10000; height:99px" maxlength="400"
                      type="text" />
              </dd>
          </dl>
	      <div style="clear:both;"> </div>
		  <div>
            <span><a @click="cancelActivity">取消并返回</a></span>
            <span><a @click="enrollActivity">提交</a></span>
		  </div>
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
	  activity: {},
	  isNotAdmin: true,
	  person: {
		'name': '',
		'phone': '',
		'email': '',
		'role': '',
		'id': '' },
      company: '',
      position: '',
      comment: '',
	  id: '',
	  type: ''
    }
  },
  methods: {
    cancelActivity: function() {
	  window.location.href='/src/activity/' + this.type + '.html';
	},
    enrollActivity: function() {
	  var name = trimStr(this.person.name);
	  var email = trimStr(this.person.email);
	  var phone = trimStr(this.person.phone);

	  var company = trimStr(this.company);
	  var position = trimStr(this.position);
	  var comment = trimStr(this.comment);

      if (name === '' || email === '' || company === '' || 
		  phone === '' || position === '' || comment === '') {
        alert('请填写完整资料');
        return;
      }

	  var params = {};
	  params['name'] = name;
	  params['email'] = email;
	  params['phone'] = phone;
	  params['company'] = company;
	  params['position'] = position;
	  params['comment'] = comment;

	  params['id'] = this.activity.id;
      params['personID'] = this.person.id;
      params['personRole'] = this.person.role;

	  var self = this;
      post('/api/activity/apply', params, function (data) {
        if (!data.success) {
          console.log(data.msg);
        }
	  	window.location.href='/src/activity/' + self.type + '.html';
      }, true);
    }
  },
  mounted: function() {
	var self = this;
	var id = getUrlKey('id');
	this.type = getUrlKey('tp');
	if (!id || !this.type || id == 'undefined') {
	  window.location.href="/src/index.html";	
	}

    get('/api/activity/'+id, {}, function(data) {
	  if (data.success) {
	    self.activity = data.msg;
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
