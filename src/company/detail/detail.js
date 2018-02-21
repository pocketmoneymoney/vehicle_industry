
import ListElement from './Element.vue'

export default {
  data() {
    return {
      imgUrl: '/',
      company: {},
	  products: [],
	  equipments: [],
	  certifications: [],
	  avatar: '',
      currentItem: {},
      ownerID: '',
	  isOwner: false,
	  editInfoURL: '/src/redirect/not_authorized.html',
	  editBriefURL: '/src/redirect/not_authorized.html',
	  editCerfURL: '/src/redirect/not_authorized.html'
    }
  },
  methods: {
    chooseItem: function(item) {
      this.currentItem = item;
    },
    searchCompany: function(companyID) {
      var self = this;
      get('/api/supplier/company/' + companyID, {}, function(data) {
        if (data.success) {
          self.company = data['msg'];
        } else {
          console.log(data.msg);
        }
      }, false);
    },
	deleteLogo: function() {
      if(confirm("确定删除么?")) {
         del('/api/supplier/avatar/' + this.ownerID, {}, function(data) {
		   window.location.reload();
		}, false);
	  }
    }
  },
  mounted: function() {
    var self = this;
	self.ownerID = getUrlKey('id');

    get('/api/supplier/' + self.ownerID, {}, function(data) {
        if (data.success && data.msg) {
          self.company = data.msg.company;
          self.avatar = data.msg.avatar;

		  /* Load product list */
		  if (data.msg.product instanceof Array) {
			data.msg.product.forEach(function(productID) {
              get('/api/product/' + productID, {}, function(data) {
                if (data.success) {
                  self.products.push(data.msg);
			    } 
		      }, false);
			});
		  } else {
			console.log("Failed to get array product", data.msg.product);
		  }

		  /* Load equipment list */
		  if (data.msg.equipment instanceof Array) {
			data.msg.equipment.forEach(function(equipmentID) {
              get('/api/equipment/' + equipmentID, {}, function(data) {
                if (data.success) {
                  self.equipments.push(data.msg);
			    } 
		      }, false);
			});
		  } else {
			console.log("Failed to get array equipment", data.msg.equipment);
		  }

		  /* Load certification list */
		  if (data.msg.certification instanceof Array) {
			data.msg.certification.forEach(function(certificationID) {
              get('/api/certification/' + certificationID, {}, function(data) {
                if (data.success) {
                  self.certifications.push(data.msg);
			    } 
		      }, false);
			});
		  } else {
			console.log("Failed to get array certification", data.msg.certification);
		  }

        } else {
          console.log(data.msg);
        }
	}, false);

    if (getCookie('token')) {
      post('/user/book', {}, function(data) {
		if (((data.id == self.ownerID) && (data.role == 'supplier')) ||
			(data.role == 'admin')) {
		  self.isOwner = true;
          self.editInfoURL = '/src/company/detail/edit_info.html?id=' + self.ownerID;
          self.editBriefURL = '/src/company/detail/edit_brief.html?id=' + self.ownerID;
          self.editCerfURL = '/src/company/detail/edit_cerf.html?id=' + self.ownerID;
		} else {
		  self.isOwner = false;
		}	
	  }, true);
	}
  },
  watch: {
    companyId: function() {
       this.searchCompany();
    },
  },
  components: {ListElement}
}
