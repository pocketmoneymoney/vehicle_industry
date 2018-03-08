<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
        <detail :companyId=companyId :isOwner=isOwner></detail>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import LastFooter from '../util/footer.vue'

import Detail from './detail/Detail.vue'


export default {
  data: function() {
    return {
      viewName: "company",
      companyId: '',
      isOwner: false
    }
  },
  methods: {
    getUrlParam: function() {
      var params = window.location.search;
      params = params.replace('?', '');
      var allParams = params.split('&');
      for (let index in allParams) {
        var paramObj = allParams[index].split('=');
        if (paramObj[0] === 'companyId') {
          this.companyId = paramObj[1];
        }
      }
      var self = this;
      if (this.companyId === '') {
        if (getCookie('token') != "") {
          post('/user/book', {}, function(data) {
            self.isOwner = true;
          }, true);
        }
      }
    }
  },
  mounted: function() {
    this.getUrlParam();
  },
  components: {MainHeader, TopBar, MainNav, Detail, LastFooter}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';

.back_wrapper{
  width: t(1200);
  background-color:#f9f9f8;
}
.main{
	width: 1200px;
	margin: 0 auto;
}

/* clearfix elimate float:left has no height */
.clearfix:before,
.clearfix:after {
  content: '\0020';
  display: block;
  overflow: hidden;
  visibility: hidden;
  width: 0;
  height: 0;
}

.clearfix:after {
  clear: both;
}

.main_right{
	float: right;
	width: 970px;
	margin-bottom: 20px;
}

h3{
	height: 14px;
	line-height: 14px;
	font-size: 14px;
	color: #333333;
  margin: 0;
  font-weight: bold;
}
</style>
