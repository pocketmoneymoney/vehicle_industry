<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
	    <div>
         <event-enroll-panel></event-enroll-panel>
		 <div class="main_middle">
          <component :is=currentView 
			@editPosition="editPosition" 
			@editPositionDone="editPositionDone" 
			@positionApplication="positionApplication" 
			@editActivity="editActivity" 
			@editActivityDone="editActivityDone" 
			@activityApplication="activityApplication" 
			@editCategory="editCategory" 
			@editCategoryDone="editCategoryDone" 
			@purchaseApplication="purchaseApplication" 
		    :publisherID="publisherID"
			:activity="currentActivity" 
			:category="currentCategory" 
			:position="currentPosition" 
			:purchase="purchase"></component>
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

import Activity from '../management/activity.vue'
import EditActivity from '../management/edit_activity.vue'
import ActivityApplication from '../management/activity_application.vue'

import Position from '../management/position.vue'
import PositionApplication from '../management/position_application.vue'

import Purchase from '../management/purchase.vue'
import PurchaseBuyer from '../management/purchase_buyer.vue'
import PurchaseApplication from '../management/purchase_application.vue'

export default {
  data: function() {
    return {
      currentView: "purchase-buyer",
      publisherID: "",
	  currentActivity: "",
	  currentCategory: "",
	  currentPosition: "",
	  activity: {},
	  purchase: {}
    }
  },
  methods: {
    editActivity: function(activity) {
      if (this.currentView != "no-authorized") {
        this.currentView = "edit-activity";
      }
    },
    editPosition: function(position) {
      if (this.currentView != "no-authorized") {
        this.currentView = "edit-position";
		this.currentPosition = position;
      }
    },
    editPositionDone: function() {
      if (this.currentView != "no-authorized") {
        this.currentView = "position";
      }
    },
    editActivity: function(activity) {
      if (this.currentView != "no-authorized") {
        this.currentView = "edit-activity";
		this.currentActivity = activity;
      }
    },
    editActivityDone: function() {
      if (this.currentView != "no-authorized") {
        this.currentView = "activity";
      }
    },
    editCategory: function(category) {
      if (this.currentView != "no-authorized") {
        this.currentView = "edit-category";
		this.currentCategory = category;
      }
    },
    editCategoryDone: function() {
      if (this.currentView != "no-authorized") {
        this.currentView = "category";
      }
    },
    positionApplication: function(position) {
      if (this.currentView != "no-authorized") {
        this.currentPosition = position;
        this.currentView = "position-application";
      }
    },
    activityApplication: function(activity) {
      if (this.currentView != "no-authorized") {
        this.currentView = "activity-application";
        this.currentActivity = activity;
      }
    },
    purchaseApplication: function(purchase) {
      if (this.currentView != "no-authorized") {
        this.purchase = purchase;
        this.currentView = "purchase-application";
      }
    },
  },
  components: {TopBar, MainHeader, MainNav, LastFooter, EventEnrollPanel,
			   NoAuthorized, RightPanel,
			   Activity, EditActivity, ActivityApplication, 
			   Purchase, PurchaseApplication, PurchaseBuyer,
         	   Position, PositionApplication}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
