export default {
  props: ['catalog'],
  data() {
    return {
      url: "/src/company/list.html?catalogId=",
      param1: '&subcatalogId=',
      param2: '&catalogName=',
      param3: '&subcatalogName=',
      subcatalog: []
    }
  },
  mounted: function() {
    var self = this;
    get('/api/menu/category/' + self.catalog.id, {}, function(data) {
      self.subcatalog = data
    }, false);
  },
}
