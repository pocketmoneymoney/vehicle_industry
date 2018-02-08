<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav :currentView="viewName"></main-nav>
        <left-nav></left-nav>
		<div class="main_right">
		  <buyer-info></buyer-info>
		</div>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import LeftNav from './left_nav.vue'

import BuyerInfo from './buyer-info.vue'

import LastFooter from '../util/footer.vue'

import NoAuthorized from './no_authorized.vue'
import User from './user.vue'
import Company from './company.vue'
import Purchase from './purchase.vue'

import NewCompany from './new_company.vue'

export default {
  data: function() {
    var users = [
      [
        "Tiger Nixon",
        "System Architect",
        "Edinburgh",
        "5421",
        "2011/04/25",
        "$3,120"
      ],
      [
        "Garrett Winters",
        "Director",
        "Edinburgh",
        "8422",
        "2011/07/25",
        "$5,300"
      ]
    ];
    return {
      users: users,
      currentView: "no-authorized",
    }
  },
  methods: {
    chooseView: function(view) {
      if (this.currentView != "no-authorized") {
        this.currentView = view;
      }
    },
    newCompany: function() {
      if (this.currentView != "no-authorized") {
        this.currentView = "new-company";
      }
    }
  },
  mounted: function() {
    var self = this;
    if (getCookie('token') != "") {
      post('/user/book', {}, function(data) {
        if (data.username) {
          self.currentView = "user";
        }
      }, true);
    }
  },
  components: {LeftNav, BuyerInfo, TopBar, MainHeader, MainNav, LastFooter, NoAuthorized, User, Company, Purchase, NewCompany} 
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

#userlist tbody th {
  font-weight: 400;
}
.delete_button {
  cursor: pointer;
}
</style>
