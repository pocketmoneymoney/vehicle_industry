import Search from '../util/search.vue'

export default {
  data() {
    return {
      url: "/src/company/search.html?categoryId=",
      param: '&subtypeId=',
      tabs: [],
      subtabs: []
    }
  },
  methods: {
	searchBar: function (data) {
		var keyword = trimStr(data);
		if (keyword) {
			var kw = encodeURI(encodeURI(keyword));
			var url = '/src/company/search.html?keyword=' + kw;
			window.location.href = url;
		}
	}
  },
  mounted: function() {
    var self = this;
    get('/api/admin/category', {}, function(data) {
	  if (data.success) {
		for (var categoryName in data.msg) {
		  var category = data.msg[categoryName];
		  self.tabs.push({'name':categoryName, 'id':category.id});
		  var subtab = [];
		  for (var subtypeName in category) {
			if (subtypeName == 'id') {
			  continue;
			} else {
			  var subtype = category[subtypeName];
			  var oneSubtab = {'name':subtypeName, 'id':subtype.id, 'subsub': []};
				
			  for (var itemName in subtype) {
				if (itemName == 'id') {
				  continue;
				} else {
				  var item = subtype[itemName];
				  oneSubtab.subsub.push({'id': item.id, 'name': itemName});
				}
			  }
			  subtab.push(oneSubtab);
			}
		  }
		  self.subtabs[category.id] = subtab;
		}
	  } else {
		console.log(data.msg);
	 }
	}, false);
  },
  components: {Search}
}
