
import ListEle from './../list_product.vue'

export default {
  props: ['companyId', 'isOwner'],
  data() {
    return {
      imgUrl: '/',
      company: {},
      currentItem: {},
      items: [],
      catalogName: '',
      subcatalogName: '',
      ownerID: '',
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
    }
  },
  mounted: function() {
    var self = this;
	self.ownerID = getUrlKey('id');
    self.searchCompany(self.ownerID);

    if (getCookie('token')) {
      post('/user/book', {}, function(data) {
		if (((data.id == self.ownerID) && (data.role == 'supplier')) ||
			(data.role == 'admin')) {
		  self.isOwner = true;
          self.editInfoURL = '/src/company/detail/edit_info.html?id='+self.ownerID;
          self.editBriefURL = '/src/company/detail/edit_brief.html?id='+self.ownerID;
          self.editCerfURL = '/src/company/detail/edit_cerf.html?id='+self.ownerID;
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
  components: {ListEle}
}
