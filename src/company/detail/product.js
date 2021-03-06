
export default {
  props: ['type', 'product', 'isOwner', 'updated'],
  data() {
    return {
	  ownerID: ''
    }
  }, 
  methods: {
    deleteItem: function() {
      if(confirm("确定删除么?")){
        del('/api/product/'+this.product.id, {}, function(data) {
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

