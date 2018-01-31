import ListPurchase from './list_purchase.vue'
import ListEvent from './list_event.vue'
import ListPosition from './list_position.vue'

export default {
  props: ['product', 'title', 'component', 'height'],
  computed: {
  },
  mounted: function() {
    $('.list_panel').height(this.height);
  },
  components: {ListPurchase, ListEvent, ListPosition}
}
