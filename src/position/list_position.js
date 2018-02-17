import Page from '../util/page.vue'

export default {
  data() {
    var positions = [];
    var position = {
	  id: 3,
      name: 'Guangzhou Shiyizhong Information Technology Co., Ltd.',
      company: 'window switch,parking sensor,clock spring,ABS sensor,blower motor resistor',
	  brief: 'aaaa,a,,a,,aaaaa,b,,b,s,s,,,cddsdfkdd'
    };
    positions.push(position);
    return {
	  enrollUrl: '/src/position/apply.html?positionId=',
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
