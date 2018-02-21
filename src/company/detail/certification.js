
export default {
  props: ['type', 'certification', 'isOwner', 'updated'],
  data() {
    return {
      imgUrl: '/',
	  ownerID: ''
    }
  }, 
  methods: {
    deleteItem: function() {
      if(confirm("确定删除么?")){
        del('/api/certification/'+this.certification.id, {}, function(data) {
          console.log(data);
		  self.updated += 1;
	    });
	  }
    }
  },
  mounted: function() {
	this.ownerID = getUrlKey('id');
  },
  computed: {
    editItem: function () {
        return '/src/company/detail/edit_certification.html?pid=' + this.certification.id + 
			   '&oid=' + this.ownerID;
    }  
  }
}

