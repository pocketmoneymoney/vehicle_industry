
export default {
  props: ['product', 'title', 'mainUrl', 'components', 'height'],
  computed: {
  },
  methods: {
    redirectTo: function(component) {
  	  window.location.href = component.url;
    }
  },
  components: {}
}
