export default {
  props: ['product', 'height'],
  computed: {
    title: function() {
      if (this.product === "supplier") {
        return "供应商推荐";
      }
    },
    component: function() {
    }
  },
  mounted: function() {
    $('.right_panel').height(this.height);
  },
  components: {}
}
