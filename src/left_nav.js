export default {
  props: ['tabs', 'defaultTab'],
  data: function() {
    console.log(this.tabs);
    return {
    }
  },
  methods: {
    choose: function (index) {
      this.$emit('statuschange', this.tabs[index].index);
    }
  }
}
