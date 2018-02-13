import ListEle from './list_product.vue'

export default {
  props: ['companyId', 'isOwner'],
  data() {
    return {
      imgUrl: '/',
      company: {},
      currentItem: {},
      items: [],
      catalogName: '',
      subcatalogName: ''
    }
  },
  methods: {
    chooseItem: function(item) {
      this.currentItem = item;
    },
    searchCompany: function() {
      var self = this;
      //TODO: add param catalogId
      get('/api/supplier/' + this.companyId, {}, function(data) {
        self.company = data;
      }, false);
      self.company = {products: [{'name':'xx','usage':'yy'}]};
    }
  },
  mounted: function() {
    this.searchCompany();
  },
  watch: {
    companyId: function() {
       this.searchCompany();
    },
  },
  components: {ListEle}
}
