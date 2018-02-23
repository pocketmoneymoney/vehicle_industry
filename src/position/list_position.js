import Page from '../util/page.vue'

export default {
  data() {
    return {
	  applyURL: '/src/position/apply.html?id=',
      positions: [],
      curPage: 8,
      totalPage: 11
    }
  },
  methods: {
    changePage: function(page) {
      this.curPage = page;
    },
    applyPosition: function(position) {
      var newURL = this.applyURL + position.id;
	  window.location.href = newURL;
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
