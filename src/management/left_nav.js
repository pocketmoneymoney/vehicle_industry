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
 	this.tabs = [{'name':'供应商管理', 'id':1}, {'name':'采购商管理', 'id':2}, 
				   {'name':'活动管理', 'id':3},
				   {'name':'招聘信息管理', 'id':4},
				   {'name':'采购项目管理', 'id':5}, {'name': '二维码', 'id':6}];
  },
  methods: {
    choose: function (tab) {
      this.$emit('viewChanged', tab);
    }
  }
}
