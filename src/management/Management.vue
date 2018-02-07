<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav @viewChanged="chooseView"></main-nav>
        <component :is=currentView></component>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from './nav.vue'

import LastFooter from '../util/footer.vue'

import NoAuthorized from './no_authorized.vue'
import User from './user.vue'

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
  components: {TopBar, MainHeader, MainNav, LastFooter, NoAuthorized, User} 
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

#userlist tbody th {
  font-weight: 400;
}
.delete_button {
  cursor: pointer;
}
</style>
