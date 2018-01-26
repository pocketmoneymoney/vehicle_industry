import ListPurchase from './list_purchase.vue'
import ListEvent from './list_event.vue'

export default {
  props: ['product', 'height'],
  computed: {
    title: function() {
      if (this.product === "purchase") {
        return "最新采购";
      }
      else if (this.product === "event") {
        return "最新活动";
      }
    },
    listProductView: function() {
      if (this.product === "purchase") {
        return "list-purchase";
      }
      else if (this.product === "event") {
        return "list-event";
      }
    }
  },
  mounted: function() {
    $('.list_panel').height(this.height);
  },
  components: {ListPurchase, ListEvent}
}
