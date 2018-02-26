<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav></main-nav>
        <left-nav @viewChanged="chooseView"></left-nav>
		<div class="main_right">
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
			:activity="currentActivity" 
			:category="currentCategory" 
			:position="currentPosition" 
			:purchase="purchase"></component>
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
import NoAuthorized from './no_authorized.vue'
import LastFooter from '../util/footer.vue'

import Supplier from './supplier.vue'
import Buyer from './buyer.vue'
import Qrcode from './qrcode.vue'

import Activity from './activity.vue'
import EditActivity from './edit_activity.vue'
import ActivityApplication from './activity_application.vue'

import Position from './position.vue'
import EditPosition from './edit_position.vue'
import PositionApplication from './position_application.vue'

import Purchase from './purchase.vue'
import PurchaseApplication from './purchase_application.vue'

import Category from './category.vue'
import EditCategory from './edit_category.vue'


export default {
  data: function() {
    return {
      currentView: "no-authorized",
	  currentActivity: "",
	  currentCategory: "",
	  currentPosition: "",
	  activity: {},
	  purchase: {}
    }
  },
  methods: {
    chooseView: function(tab) {
      if (this.currentView != "no-authorized") {
        if (tab.id === 1) {
          this.currentView = 'supplier';
        } else if (tab.id === 2) {
          this.currentView = 'buyer';
        } else if (tab.id === 3) {
          this.currentView = 'activity';
        } else if (tab.id === 4) {
          this.currentView = 'position';
        } else if (tab.id === 5) {
          this.currentView = 'purchase';
        } else if (tab.id === 6) {
          this.currentView = 'qrcode';
        } else if (tab.id === 7) {
          this.currentView = 'category';
		}
      }
    },
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
  mounted: function() {
    var self = this;
    if (getCookie('token') != "") {
      post('/user/book', {}, function(data) {
        if (data.username) {
          self.currentView = "supplier";
        }
      }, true);
    }
  },
  components: {LeftNav, TopBar, MainHeader, MainNav, LastFooter, 
			   NoAuthorized, 
			   Supplier, Buyer, 
			   Activity, EditActivity, ActivityApplication, 
			   Purchase, PurchaseApplication,
         	   Position, EditPosition, PositionApplication, 
			   Category, EditCategory, 
			   Qrcode} 
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
#userlist tbody th {
  font-weight: 400;
}
.delete_button {
  cursor: pointer;
}
</style>
