import Product from './Product.vue'
import Equipment from './Equipment.vue'
import Certification from './Certification.vue'

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
      else if (this.type === 'certification') {
        return '/src/company/detail/edit_certification.html?oid=' + this.ownerID;
      }
    }
  },
  components: {Product, Equipment, Certification}
}
