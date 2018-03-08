<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
         <event-enroll-panel></event-enroll-panel>
		 <div class="main_middle">
		   <supplier-info></supplier-info>
		 </div>
	     <right-panel></right-panel>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import LastFooter from '../util/footer.vue'
import EventEnrollPanel from '../util/event_enroll_panel.vue'
import RightPanel from '../util/right_panel.vue'

import SupplierInfo from './Supplier-info.vue'

export default {
  components: {SupplierInfo, TopBar, MainHeader, MainNav, LastFooter,
			   EventEnrollPanel, RightPanel} 
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
