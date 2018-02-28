import Search from '../util/search.vue'
import Page from '../util/page.vue'

export default {
  data() {
    return {
      imgUrl: '/',
      detailUrl: '/src/company/detail.html?companyId=',
      companies: [],
      curPage: 1,
      totalPage: 9,
      currentItem: {},
      items: [],
      categoryName: '',
      subtypeName: '',
      itemName: ''
    }
  },
  methods: {
    changePage: function(page) {
      this.curPage = page;
    },
    chooseItem: function(item) {
      this.currentItem = item;
    },
    searchCompany: function() {
      var self = this;
	  var params = {};
	  if (self.categoryName) {
		params['categoryName'] = "胶粘剂";
	  }; 
/*
	  if (self.subtypeName) {
		params['subtypeName'] = self.subtypeName;
	  }; 
	  if (self.itemName) {
		params['itemName'] = self.itemName;
	  }; 
*/
      get('/api/supplier/search', params, function(data) {
        self.companies = [];
		if (data.success) {
		  for (var index = 0; index < data.msg.length; index++) {
			var company = data.msg[index];
			var newCompany = {
				'avatar': 	company.avatar,
				'name': 	company.company.name,
				'location': company.company.location,
				'product': 	company.company.product
			};
		    self.companies.push(newCompany);
		  }
		}
      }, false);
    }
  },
  mounted: function() {
	this.categoryId = getUrlKey('categoryId');
    this.subtypeId = getUrlKey('subtypeId');
    this.itemId = getUrlKey('itemId');

    var params = {};
    if (this.categoryId) {
      params['categoryID'] = this.categoryId;
	}
    if (this.subtypeId) {
    	params['subtypeID'] = this.subtypeId;
	}
	if (this.itemId) {
		params['itemID'] = this.itemId;
	}

	var self = this;
	post('/api/admin/categoryName', params, function (data) {
		if (data.success) {
	      if (self.categoryId) {
			self.categoryName = data.msg['categoryName'];
		  }
		  if (self.subtypeId) {
		    self.subtypeName = data.msg['subtypeName'];
		  }
          if (self.itemId) {
		    self.itemName = data.msg['itemName'];
		  }
    	  self.searchCompany();
        }
	}, false);
  },
  components: {Search, Page}
}
