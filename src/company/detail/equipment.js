
export default {
  props: ['type', 'equipment', 'isOwner', 'updated'],
  data() {
    return {
      imgUrl: '/',
	  ownerID: ''
    }
  }, 
  methods: {
    deleteItem: function() {
      if(confirm("确定删除么?")){
        del('/api/equipment/'+this.equipment.id, {}, function(data) {
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
        return '/src/company/detail/edit_equipment.html?pid=' + this.equipment.id + 
			   '&oid=' + this.ownerID;
    }  
  }
}

