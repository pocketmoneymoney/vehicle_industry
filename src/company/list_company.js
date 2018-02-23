import Search from '../util/search.vue'
import Page from '../util/page.vue'

export default {
  data() {
    var companys = [];
    var company = {
      name: 'Guangzhou Shiyizhong Information Technology Co., Ltd.',
      products: 'window switch,parking sensor,clock spring,ABS sensor,blower motor resistor',
    };
    companys.push(company);
    return {
      imgUrl: '/',
      detailUrl: '/src/company/detail.html?companyId=',
      companys: [],
      curPage: 8,
      totalPage: 11,
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
      //TODO: add param catalogId
      get('/api/supplier/list', {}, function(data) {
        self.companys = data;
        console.log(data);
      }, false);
    }
  },
  mounted: function() {
	this.categoryId = getUrlKey('categoryId');
    this.subtypeId = getUrlKey('subtypeId');

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
        }
	}, false);
    this.searchCompany();
  },
  watch: {
    catalogId:  function() {
    }
  },
  components: {Search, Page}
}
