import Search from '../util/search.vue'

export default {
  data() {
    return {
      url: "/src/company/list.html?catalogId=",
      param: '&subtypeId=',
      tabs: [],
      subtabs: []
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
			  subtab.push({'name':subtypeName, 'id':subtype.id});
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
