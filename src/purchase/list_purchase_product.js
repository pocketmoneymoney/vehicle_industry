import Page from '../util/page.vue'

export default {
  data() {
    return {
	  purchases: [],
	  enrollUrl: '/src/purchase/enroll.html?id=',
      curPage: 8,
      totalPage: 11
    }
  },
  methods: {
    changePage: function(page) {
      this.curPage = page;
    }
  },
  mounted: function() {
	var self = this;
    get('/api/purchase/list?page=0&num=100', {}, function(data) {
  	  self.purchases = retriveData(data);
	}, false);
  },
  components: {Page}
}
