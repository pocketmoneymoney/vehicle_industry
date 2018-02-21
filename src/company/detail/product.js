
export default {
  props: ['type', 'product', 'isOwner', 'updated'],
  data() {
    return {
      imgUrl: '/',
	  ownerID: ''
    }
  }, 
  methods: {
    deleteItem: function() {
      if(confirm("确定删除么?")){
        del('/api/product/'+this.product.id, {}, function(data) {
		  self.updated += 1;
		  window.location.reload();
	    });
	  }
    }
  },
  mounted: function() {
	this.ownerID = getUrlKey('id');
  },
  computed: {
    editItem: function () {
        return '/src/company/detail/edit_product.html?pid=' + this.product.id + 
			   '&oid=' + this.ownerID;
    }  
  }
}

