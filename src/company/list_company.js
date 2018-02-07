import Search from '../util/search.vue'
import Page from '../util/page.vue'

export default {
  props: ['catalogId', 'subcatalogId', 'catalogName', 'subcatalogName'],
  data() {
    var companys = [];
    var company = {
      name: 'Guangzhou Shiyizhong Information Technology Co., Ltd.',
      products: 'window switch,parking sensor,clock spring,ABS sensor,blower motor resistor',
    };
    companys.push(company);
    return {
      companys: companys,
      curPage: 8,
      totalPage: 11,
      currentItem: {},
      items: []
    }
  },
  methods: {
    changePage: function(page) {
      this.curPage = page;
    },
    chooseItem: function(item) {
      this.currentItem = item;
    }
  },
  watch: {
    catalogId:  function() {
        var self = this;
        console.log(this.catalogId);
        console.log(this.subcatalogId);
        get('/api/menu/subtype/' + this.catalogId + '/' + this.subcatalogId, {}, function(data) {
          if (data.item) {
            console.log(data.item);
            self.items = data.item
            console.log(self.items);
          }
        }, false);
        console.log('return');
    }
  },
  components: {Search, Page}
}
