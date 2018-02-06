import SubCatalog from './subcatalog.vue'
import Search from '../util/search.vue'

export default {
  data() {
    /*
    var catalog = [];
    var subcatalog = {
      main: '发动机',
      sub: ['冷却系统', '润滑系统', '点火系统']
    };
    catalog.push(subcatalog);
    var subcatalog = {
      main: '电子电器',
      sub: ['蓄电池', '仪表', '暖风空调系统']
    };
    catalog.push(subcatalog);
    */
    return {
      tabs: [],
      subtabs: [],
      subtabsClone: []
    }
  },
  mounted: function() {
    var self = this;
    get('/api/menu/category', {}, function(data) {
      self.tabs = data;
      for (let index in self.tabs) {
      }
    }, false);
  },
  components: {SubCatalog, Search}
}
