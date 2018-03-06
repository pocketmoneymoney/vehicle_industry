import Search from '../util/search.vue'
import Page from '../util/page.vue'

export default {
  data() {
    return {
      detailUrl: '/src/company/detail/detail.html?id=',
      companies: [],
      curPage: 1,
      totalPage: 9,
	  totalCategory: [],
	  selectCategory: '',
	  selectSubtype: '',
	  selectItem: '',
	  categoryBar: [],
	  subtypeBar: [],
	  itemBar: [],
	  lastKeyword: ''
    }
  },
  methods: {
	searchBar: function (data) {
		var keyword = trimStr(data);
		if (keyword) {
	  		this.searchCompany(keyword);
		}
	},
    changePage: function(page) {
      this.curPage = page;
	  this.searchCompany(this.lastKeyword);
    },
	getSearchData: function () {
	  if (this.selectItem) {
		return this.selectItem;
	  }; 
	  if (this.selectSubtype) {
		var category = this.totalCategory[this.selectCategory];	
		var subtype = category[this.selectSubtype];
		var keyword = this.selectSubtype;
		for (var itemName in subtype) {
			if (itemName != 'id') {
				keyword = keyword + ' ' + itemName;
			}
		}
		return keyword;
	  }; 
	  if (this.selectCategory) {
		return this.selectCategory;
	  }; 
	  return null;
	},
	chooseCategory: function(category) {
		if (category == null) {
			this.selectCategory = '';
			this.selectSubtype = '';
			this.selectItem = '';
		} else {
			this.selectCategory = category;
			this.selectSubtype = '';
			this.selectItem = '';
		}
		this.updateSelectBar();
	  	this.searchCompany(this.getSearchData());
	},
	chooseSubtype: function(subtype) {
		if (subtype == null) {
			this.selectSubtype = '';
			this.selectItem = '';
		} else {
			this.selectSubtype = subtype;
			this.selectItem = '';
		}
		this.updateSelectBar();
	  	this.searchCompany(this.getSearchData());
	},
    chooseItem: function(item) {
		if (item == null) {
			this.selectItem = '';
		} else {
			this.selectItem = item;
		}
		this.updateSelectBar();
	  	this.searchCompany(this.getSearchData());
    },
		
	updateSelectBar: function () {
		this.categoryBar = [];
		this.subtypeBar = [];
		this.itemBar = [];

		for (var categoryName in this.totalCategory) {
			var category = this.totalCategory[categoryName];
			if (this.selectCategory) {
				if (this.selectCategory == categoryName) {
					this.categoryBar.push(categoryName);
					for (var subtypeName in category) {
						var subtype = category[subtypeName];
						if (this.selectSubtype) {
							if (this.selectSubtype == subtypeName) {
								this.subtypeBar.push(subtypeName);
								for (var itemName in subtype) {
									var item = subtype[itemName];
									if ((this.selectItem) && (this.selectItem == itemName)) {
										this.itemBar.push(itemName);
										break;
									} else if (this.selectItem) {
										continue;
									} else {
										if (itemName != 'id') {
											this.itemBar.push(itemName);
										}
									}
								}
							} else {
								continue;
							}
						} else {
							if (subtypeName != 'id') {
								this.subtypeBar.push(subtypeName);
							}
						}
					}
				} else {
					continue;
				}
			} else {
				if (categoryName != 'id') {
					this.categoryBar.push(categoryName);
				}
			}
		}
	},
    searchCompany: function(keyword) {
      var self = this;
	  var params = {};
console.log("keyword", keyword);
	  if (keyword) {
		params['name'] = keyword;
	  }
	  this.lastKeyword = keyword;

	  params['page'] = self.curPage - 1;
	  params['num']  = 10;

      get('/api/supplier/search', params, function(data) {
        self.companies = [];
		if (data.success) {
		  self.totalPage = data.totalPage;
		  for (var index = 0; index < data.msg.length; index++) {
			var company = data.msg[index];
			var newCompany = {
				'id': 	company.id,
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
	get('/api/admin/category', {}, function(data) {
		if (data.success) {
			self.totalCategory = data.msg;
			post('/api/admin/categoryName', params, function (data) {
				if (data.success) {
	      			if (self.categoryId) {
						self.selectCategory = data.msg['categoryName'];
		  			}
		  			if (self.subtypeId) {
		    			self.selectSubtype = data.msg['subtypeName'];
		  			}
          			if (self.itemId) {
		    			self.selectItem = data.msg['itemName'];
		  			}
					self.updateSelectBar();
	  				self.searchCompany(self.getSearchData());
        		}
			}, false);
		}
	}, false);
  },
  components: {Search, Page}
}
