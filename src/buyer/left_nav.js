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
    var self = this;
    get('/api/menu/category', {}, function(data) {
      self.tabs = data;
      for (let index in self.tabs) {
        let tab = self.tabs[index];
        self.subtabsClone[tab.id] = [];
        get('/api/menu/category/' + tab.id, {}, function(data) {
          for (let id in data.subtype) {
            var subtab = data.subtype[id];
            self.subtabsClone[tab.id].push({name: subtab.name, id: subtab.id});
          }

          //only change of whole data can make vue detect change
          self.subtabs = self.subtabsClone;
        }, false);
        self.subtabs = [{'name':'个人信息', 'id':1}, {'name':'我的采购', 'id':2}];
      }
      self.tabs = [{'name':'个人信息', 'id':1}, {'name':'采购记录', 'id':2}, 
				   {'name': '活动报名记录', 'id':3}];
    }, false);
  },
  methods: {
    choose: function (index) {
      this.$emit('statuschange', this.tabs[index].index);
    }
  }
}
