export default {
  props: ['catalog'],
  data() {
    return {
      url: "/src/company/list.html?catalogId=",
      param: '&subcatalogId=',
      subcatalog: []
    }
  },
  mounted: function() {
    var self = this;
    get('/api/menu/category/' + self.catalog.id, {}, function(data) {
      self.subcatalog = data.subtype
    }, false);
  },
}
