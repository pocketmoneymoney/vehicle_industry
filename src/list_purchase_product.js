import Page from './page.vue'

export default {
  data() {
    var purchaseProducts = [];
    var product = {
      product: 'For Audi a6 ABS Sensor 4B0927803 IABSAD003',
      company: 'Guangzhou Shiyizhong Information Technology Co., Ltd.'
    };
    purchaseProducts.push(product);
    var product = {
      product: 'For Audi a6 ABS Sensor ALS424 IABSAD003i',
      company: 'Guangzhou Shiyizhong Information Technology Co., Ltd.'
    };
    purchaseProducts.push(product);
    return {
      purchaseProducts: purchaseProducts,
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
