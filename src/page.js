export default {
  props: ['curPage', 'totalPage'],
  computed: {
    pageRange: function() {
      if (this.totalPage <= 9) {
        return [1,2,3,4,5,6,7,8,9];
      }

      var result = [];
      var first = Math.max(1, this.curPage - 4);
      first = Math.min(first, this.totalPage - 8);
      for (let i = first; i <= first + 8; i++) {
        result.push(i);
      }
      return result;
    }
  },
  methods: {
    changePage: function(page) {
      this.$emit('pageChanged', page);
    }
  },
  mounted: function() {
  },
  components: {}
}
