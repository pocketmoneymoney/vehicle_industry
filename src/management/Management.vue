<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav></main-nav>
        <left-nav @viewChanged="chooseView"></left-nav>
		<div class="main_right">
          <component :is=currentView @newActivity="newActivity" @newPosition="newPosition" @positionApplication="positionApplication" @activityApplication="activityApplication" @purchaseApplication="purchaseApplication" :activity="activity" :position="position" :purchase="purchase"></component>
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

import LastFooter from '../util/footer.vue'

import NoAuthorized from './no_authorized.vue'
import Supplier from './supplier.vue'
import Buyer from './buyer.vue'
import Activity from './activity.vue'
import NewActivity from './new_activity.vue'
import ActivityApplication from './activity_application.vue'
import Position from './position.vue'
import NewPosition from './new_position.vue'
import PositionApplication from './position_application.vue'
import Purchase from './purchase.vue'
import PurchaseApplication from './purchase_application.vue'

import Qrcode from './qrcode.vue'

export default {
  data: function() {
    return {
      currentView: "no-authorized",
      position: {},
	  activity: {},
	  purchase: {}
    }
  },
  methods: {
    chooseView: function(tab) {
      if (this.currentView != "no-authorized") {
        if (tab.id === 1) {
          this.currentView = 'supplier';
        }
        else if (tab.id === 2) {
          this.currentView = 'buyer';
        }
        else if (tab.id === 3) {
          this.currentView = 'activity';
        }
        else if (tab.id === 4) {
          this.currentView = 'position';
        }
        else if (tab.id === 5) {
          this.currentView = 'purchase';
        } else if (tab.id === 6) {
          this.currentView = 'qrcode';
		    }
      }
    },
    newActivity: function() {
      if (this.currentView != "no-authorized") {
        this.currentView = "new-activity";
      }
    },
    newPosition: function() {
      if (this.currentView != "no-authorized") {
        this.currentView = "new-position";
      }
    },
    positionApplication: function(position) {
      if (this.currentView != "no-authorized") {
        this.position = position;
        this.currentView = "position-application";
      }
    },
    activityApplication: function(activity) {
      if (this.currentView != "no-authorized") {
        this.activity = activity;
        this.currentView = "activity-application";
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
			   NoAuthorized, Supplier, Buyer, Activity, NewActivity, 
			   ActivityApplication, Purchase, PurchaseApplication,
         Position, NewPosition, PositionApplication, Purchase, Qrcode} 
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
