<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav></main-nav>
		<div class="main_right">
		  <supplier-info></supplier-info>
		</div>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import LastFooter from '../util/footer.vue'
import NoAuthorized from './no_authorized.vue'

import Purchase from './purchase.vue'
import SupplierInfo from './supplier-info.vue'

export default {
   mounted: function() {
      var self = this;
      if (getCookie('token') != "") {
        post('/user/book', {}, function(data) {
          if (!data.username) {
            window.location.href = '/src/redirect/expired.html';
          }
        }, true);
      } else {
          window.location.href = '/src/redirect/expired.html';
      }
  },
  components: {SupplierInfo, TopBar, MainHeader, MainNav, LastFooter, NoAuthorized, Purchase} 
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
	float: left;
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
