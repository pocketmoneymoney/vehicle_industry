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
    this.tabs = [{'name':'个人信息', 'id':1}, 
                 {'name':'公司信息', 'id':4}, 
                 {'name':'采购记录', 'id':2}, 
	             {'name': '活动报名记录', 'id':3}];
  },
  methods: {
    choose: function (tab) {
      this.$emit('viewChanged', tab);
    }
  }
}
