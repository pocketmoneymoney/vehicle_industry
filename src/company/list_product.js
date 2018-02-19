import Product from './product.vue'

export default {
  props: ['type', 'listEle', 'isOwner'],
  data() {
    return {
      imgUrl: '/',
      ownerID: '',
      company: {},
      currentItem: {},
      items: [],
      catalogName: '',
      subcatalogName: ''
    }
  },
  methods: {
    chooseItem: function(item) {
      this.currentItem = item;
    },
  },
  mounted: function() {
	this.ownerID = getUrlKey('id');
  },
  computed: {
    newUrl: function() {
      if (this.type === 'product') {
        return '/src/company/new_product.html?oid='+this.ownerID;
      }
      else if (this.type === 'equipment') {
        return '/src/company/new_equipment.html';
      }
      else {
        return '';
      }
    }
  },
  components: {Product}
}
