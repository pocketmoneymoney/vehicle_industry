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
    var self = this;
    $('.right_panel').height(this.height);
	get('/api/admin/qrcode', {}, function(data) {
		self.qrcode = data;
    }, false);
  },
  data: function() {
    var qrcode = '';
    return {
      qrcode: ''
    }
  },
  components: {}
}
