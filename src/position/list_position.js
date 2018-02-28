import Page from '../util/page.vue'

export default {
  data() {
    return {
	  applyURL: '/src/position/enroll.html?id=',
      positions: [],
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
	  getListData('/api/position', page, function(totalPage, data) {
		self.totalPage = totalPage; 
		self.positions = retriveData(data);
          for (let index in self.positions) {
            var position = self.positions[index];
			position.brief = position.brief.slice(0, 100) + "... ...";
		  }
	  });
    },
    applyPosition: function(position) {
      var newURL = this.applyURL + position.id;
	  window.location.href = newURL;
	}
  },
  mounted: function() {
	this.getCurrentPageData();
  },
  components: {Page}
}
