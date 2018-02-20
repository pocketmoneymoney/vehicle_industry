import Product from './Product.vue'
import Equipment from './Equipment.vue'

export default {
  props: ['type', 'listElement', 'isOwner'],
  data() {
    return {
      updated: 0,
      ownerID: ''
    }
  },
  mounted: function() {
	this.ownerID = getUrlKey('id');
  },
  computed: {
    newUrl: function() {
      if (this.type === 'product') {
        return '/src/company/detail/edit_product.html?oid=' + this.ownerID;
      }
      else if (this.type === 'equipment') {
        return '/src/company/detail/edit_equipment.html?oid=' + this.ownerID;
      }
    }
  },
  watch: {
    updated(val) {
console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    }
  },
  components: {Product, Equipment}
}
