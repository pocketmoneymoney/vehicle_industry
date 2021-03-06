export default {
  data: function() {
    return {
      url: '/src/company/list.html?catalogId=',
      param: '&subcatalogId=',
      tabs: [],
      subtabsClone: {},
      subtabs: {}
    }
  },
  mounted: function() {
 	this.tabs = [{'name':'供应商管理', 'id':1}, 
				 {'name':'采购商管理', 'id':2}, 
				 {'name':'活动管理', 'id':3},
				 {'name':'招聘信息管理', 'id':4},
				 {'name':'采购项目管理', 'id':5}, 
				 {'name': '分类列表管理', 'id':7},
				 {'name': '二维码管理', 'id':6} ,
				 {'name': '优质供应商管理', 'id':8} ,
				 {'name': '活动广告位管理', 'id':9} ,
	];
  },
  methods: {
    choose: function (tab) {
      this.$emit('viewChanged', tab);
    }
  }
}
