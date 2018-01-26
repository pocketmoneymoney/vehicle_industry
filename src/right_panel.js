import ListPurchase from './list_purchase.vue'

export default {
  props: ['product', 'height'],
  computed: {
    title: function() {
      if (this.product === "supplier") {
        return "供应商推荐";
      }
    },
    listProductView: function() {
      if (this.product === "purchase") {
        return "list-purchase";
      }
    }
  },
  mounted: function() {
    $('.right_panel').height(this.height);
  },
  components: {ListPurchase}
}
