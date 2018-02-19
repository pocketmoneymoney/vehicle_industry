import Product from './product.vue'

export default {
  props: ['type', 'listEle', 'isOwner', 'ownerID'],
  data() {
    return {
      imgUrl: '/',
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
  },
  watch: {
  },
  computed: {
    newUrl: function() {
      if (this.type === 'product') {
        return '/src/company/new_product.html';
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
