
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
        self.company = data;
      }, false);
    }
  },
  mounted: function() {
    var self = this;
	var pageHostID = getUrlKey('id');

    self.searchCompany(pageHostID);

    if (getCookie('token')) {
      post('/user/book', {}, function(data) {
		if (((data.id == pageHostID) && (data.role == 'supplier')) ||
			(data.role == 'admin')) {
		  self.isOwner = true;
          self.editInfoURL = '/src/company/detail/edit_info.html?id='+pageHostID;
          self.editBriefURL = '/src/company/detail/edit_brief.html?id='+pageHostID;
          self.editCerfURL = '/src/company/detail/edit_cerf.html?id='+pageHostID;
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
