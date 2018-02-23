
export default {
  props: ['product', 'title', 'mainUrl', 'components', 'height'],
  computed: {
  },
  methods: {
    redirectTo: function(component) {
  	  window.location.href = component.url;
    }
  },
  mounted: function() {
    $('.list_panel').height(this.height);
  },
  components: {}
}
