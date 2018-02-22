
export default {
  props: ['product', 'title', 'mainUrl', 'components', 'height'],
  computed: {
  },
  mounted: function() {
    $('.list_panel').height(this.height);
  },
  components: {}
}
