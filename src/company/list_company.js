import Search from '../util/search.vue'
import Page from '../util/page.vue'

export default {
  props: ['catalogId', 'subcatalogId'],
  data() {
    var companys = [];
    var company = {
      name: 'Guangzhou Shiyizhong Information Technology Co., Ltd.',
      products: 'window switch,parking sensor,clock spring,ABS sensor,blower motor resistor',
    };
    companys.push(company);
    return {
      imgUrl: '/',
      companys: [],
      curPage: 8,
      totalPage: 11,
      currentItem: {},
      items: [],
      catalogName: '',
      subcatalogName: ''
    }
  },
  methods: {
    changePage: function(page) {
      this.curPage = page;
    },
    chooseItem: function(item) {
      this.currentItem = item;
    },
    searchCompany: function() {
      var self = this;
      //TODO: add param catalogId
      get('/api/supplier/overview', {}, function(data) {
        self.companys = data;
        console.log(data);
      }, false);
    }
  },
  mounted: function() {
    this.searchCompany();
  },
  watch: {
    catalogId:  function() {
        var self = this;
        console.log(this.catalogId);
        console.log(this.subcatalogId);
        get('/api/menu/subtype/' + this.catalogId + '/' + this.subcatalogId + '/name', {}, function(data) {
          console.log(data);
          self.subcatalogName = data;
        }, false);
        get('/api/menu/category/' + this.catalogId + '/name', {}, function(data) {
          self.catalogName = data;
        }, false);
        get('/api/menu/subtype/' + this.catalogId + '/' + this.subcatalogId, {}, function(data) {
          if (data.item) {
            console.log(data.item);
            self.items = data.item
            console.log(self.items);
          }
        }, false);
    }
  },
  components: {Search, Page}
}
