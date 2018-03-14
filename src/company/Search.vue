<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header currentView="company"></main-header>
      </div>
      <div class="main clearfix">
		<div>
			<left-nav></left-nav>
          	<ListCompany></ListCompany>
		</div>
      </div>
	  <div style="clear:both;"> </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import LastFooter from '../util/footer.vue'
import RightPanel from '../util/right_panel.vue'
import LeftNav from '../index/left_nav.vue'

import EventEnrollPanel from '../util/event_enroll_panel.vue'
import LatestPurchase from '../util/latest_purchase.vue'
import ListCompany from './list_company.vue'


export default {
  data: function() {
    return {
      viewName: "company"
    }
  },
  components: {MainHeader, TopBar, EventEnrollPanel, LatestPurchase, 
			   ListCompany, RightPanel, LastFooter, LeftNav}
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
	width: 740px;
	margin-bottom: 20px;
	padding: 0px 12px 10px 10px;
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
