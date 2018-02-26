<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav></main-nav>
	    <div>
         <event-enroll-panel></event-enroll-panel>
		 <div class="main_middle">
          <component :is="currentView"></component>
		  </div>
		</div>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import EventEnrollPanel from '../util/event_enroll_panel.vue'
import LastFooter from '../util/footer.vue'
import RightPanel from '../util/right_panel.vue'

import NoAuthorized from '../management/no_authorized.vue'

import ActivityEnroller from '../management/activity_enroller.vue'

export default {
  data: function() {
    return {
      currentView: "activity-enroller"
    }
  },
  components: {TopBar, MainHeader, MainNav, LastFooter, EventEnrollPanel,
			   NoAuthorized, RightPanel, ActivityEnroller}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
