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
				   {'name':'活动管理', 'id':3}, {'name':'优秀供应商', 'id':4},
				   {'name':'招聘信息管理', 'id':5}, {'name':'人物采访管理', 'id':6},
				   {'name':'广告位管理', 'id':7}, 
				   {'name':'采购产品列表', 'id':9}, {'name': '二维码', 'id':10}];
  },
  methods: {
    choose: function (index) {
      this.$emit('statuschange', this.tabs[index].index);
    }
  }
}
