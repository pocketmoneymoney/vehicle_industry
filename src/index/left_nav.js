export default {
  data: function() {
    return {
      url: '/src/company/list.html?catalog=',
      param: '&subcatalog=',
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
          for (let id in data) {
            var subtab = data[id];
            self.subtabsClone[tab.id].push({name: subtab.name, id: subtab.id});
          }

          //only change of whole data can make vue detect change
          self.subtabs = [];
          self.subtabs = self.subtabsClone;
          console.log(self.subtabs);
        }, false);
      }
    }, false);
  },
  methods: {
    choose: function (index) {
      this.$emit('statuschange', this.tabs[index].index);
    }
  }
}
