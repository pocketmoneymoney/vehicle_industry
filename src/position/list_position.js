import Page from '../util/page.vue'

export default {
  data() {
    return {
	  enrollUrl: '/src/position/apply.html?positionId=',
      positions: [],
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
    get('/api/position/list?page=0&num=4', {}, function(data) {
       if (data.success) {
		self.positions = data.msg;
		}
    }, false);
  },
  components: {Page}
}
