
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
      get('/api/supplier/' + companyID, {}, function(data) {
        self.company = {
			'name': data.company,
			'brief': data.brief, 
			'product': data.product,
			'customer': data.customer,
			'avatar': data.avatar,
			'location': data.location,
			'assets': data.assets,
			'createTime': data.createTime,
			'operator': data.operator};
      }, false);
    }
  },
  mounted: function() {
    var self = this;
	var pageHostID = getUrlKey('id');

    if (getCookie('token')) {
      post('/user/book', {}, function(data) {
		if (((data.id == pageHostID) && (data.role == 'supplier')) ||
			(data.role == 'admin')) {
		  self.isOwner = true;
          self.editInfoURL = '/src/company/detail/edit_info.html?id='+data.id;
          self.editBriefURL = '/src/company/detail/edit_brief.html?id='+data.id;
          self.editCerfURL = '/src/company/detail/edit_cerf.html?id='+data.id;
		} else {
		  self.isOwner = false;
		}	

        if ((data.id) && (data.role == 'supplier')) {
          self.searchCompany(pageHostID);
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
