import Product from './Product.vue'
import Equipment from './Equipment.vue'
import Certification from './Certification.vue'

export default {
  props: ['type', 'listElement', 'isOwner', 'isVerified'],
  data() {
    return {
      updated: 0,
      ownerID: ''
    }
  },
  mounted: function() {
	this.ownerID = getUrlKey('id');
  },
  methods: {
	addElement: function(url) {
	   if (!this.isVerified && this.listElement.length >= 3) {
		 alert('非认证用户只能最多上传三个文件，如许上传更多，请申请成为认证用户');
		 return
	   } else {
		 window.location.href = url;
	   }
	}
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
