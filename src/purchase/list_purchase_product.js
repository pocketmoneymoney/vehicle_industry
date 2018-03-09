import Page from '../util/page.vue'
import Search from './search.vue'

export default {
  data() {
    return {
	  enrollUrl: '/src/purchase/enroll.html?id=',
	  purchases: [],
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

		get('/api/purchase/search', params, function (data) {
		  self.reloadPageData(data.totalPage, data);
		}, false);
	  } else {
	    getListData('/api/purchase', page, function(totalPage, data) {
		  self.reloadPageData(totalPage, data);
	    });
	  }
    },
	reloadPageData: function (totalPage, data) {
	  this.totalPage = totalPage; 
	  this.purchases = retriveData(data);
	}
  },
  mounted: function() {
	this.getCurrentPageData();
  },
  components: {Page, Search}
}
