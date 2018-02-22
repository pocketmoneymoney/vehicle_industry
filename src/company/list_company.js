import Search from '../util/search.vue'
import Page from '../util/page.vue'

export default {
  props: ['catalogId', 'subtypeId', 'itemId'],
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
      catalogName: '',
      subcatalogName: '',
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
    this.searchCompany();
  },
  watch: {
    catalogId:  function() {
	  var self = this;
      var params = {};
      if (self.catalogId) {
		params['categoryID'] = self.catalogId;
	  }
	  if (self.subtypeId) {
		params['subtypeID'] = self.subtypeId;
	  }
	  if (self.itemId) {
		params['itemID'] = self.itemId;
	  }

	  get('/api/admin/categoryname', params, function (data) {
	console.log(data);  
		if (data.success) {
	      if (self.catelogId) {
			self.catelogName = data.msg['categoryName'];
		  }
		  if (self.subtypeId) {
		    self.subcatalogId = data.msg['subtypeName'];
		  }
          if (self.itemId) {
		    self.itemId = data.msg['itemName'];
		  }
        }
	  }, false);
    }
  },
  components: {Search, Page}
}
