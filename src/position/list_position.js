import Page from '../util/page.vue'
import Search from './search.vue'

export default {
  data() {
    return {
	  applyURL: '/src/position/enroll.html?id=',
      positions: [],
	  keyword: '',
      curPage: 1,
      totalPage: 9
    }
  },
  methods: {
	searchBar: function (data) {
		if (specialStrCheck(data)) {
			alert("请勿包含非文字或数字内容");
			return;
		}	
		this.keyword = trimStr(data);
		this.getCurrentPageData();
	},
    changePage: function(page) {
      this.curPage = page;
	  this.getCurrentPageData();
    },
	getCurrentPageData: function () {
	  var self = this;
	  var page = self.curPage - 1;

	  if (this.keyword) {
		var params = {};
	  	params['keyword'] = self.keyword;
	  	params['page'] = page;
	  	params['num']  = 10;

		get('/api/position/search', params, function (data) {
		  self.reloadPageData(data.totalPage, data);
		}, false);
	  } else {
	  	getListData('/api/position', page, function(totalPage, data) {
		  self.reloadPageData(totalPage, data);
	  	});
	  }
  	},
	reloadPageData: function (totalPage, data) {
	  this.totalPage = totalPage; 
	  this.positions = retriveData(data);
      for (let index in this.positions) {
        var position = this.positions[index];
		position.brief = position.brief.slice(0, 100) + "... ...";
	  }
	},
    applyPosition: function(position) {
      var newURL = this.applyURL + position.id;
	  window.location.href = newURL;
	}
  },
  mounted: function() {
	this.getCurrentPageData();
  },
  components: {Page, Search}
}
