import Page from '../util/page.vue'
import Search from './search.vue'

export default {
  data() {
    return {
	  purchases: [],
	  enrollUrl: '/src/purchase/enroll.html?id=',
      curPage: 1,
      totalPage: 9
    }
  },
  methods: {
    changePage: function(page) {
      this.curPage = page;
	  this.getCurrentPageData();
    },
	getCurrentPageData: function () {
	  var self = this;
	  var page = self.curPage - 1;
	  getListData('/api/purchase', page, function(totalPage, data) {
		self.totalPage = totalPage; 
		self.purchases = retriveData(data);
	  });
    }
  },
  mounted: function() {
	this.getCurrentPageData();
  },
  components: {Page, Search}
}
