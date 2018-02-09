import Search from '../util/search.vue'
import Page from '../util/page.vue'

export default {
  props: ['companyId'],
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
  components: {Search, Page}
}
