import Page from '../util/page.vue'

export default {
  data() {
    var positions = [];
    var position = {
      name: 'Guangzhou Shiyizhong Information Technology Co., Ltd.',
      products: 'window switch,parking sensor,clock spring,ABS sensor,blower motor resistor',
    };
    positions.push(position);
    return {
      positions: positions,
      curPage: 8,
      totalPage: 11
    }
  },
  methods: {
    changePage: function(page) {
      this.curPage = page;
    }
  },
  mounted: function() {
  },
  components: {Page}
}
