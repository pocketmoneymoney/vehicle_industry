import Search from './search.vue'

export default {
  data() {
    var companys = [];
    var company = {
      name: 'Guangzhou Shiyizhong Information Technology Co., Ltd.',
      products: 'window switch,parking sensor,clock spring,ABS sensor,blower motor resistor',
    };
    companys.push(company);
    return {
      companys: companys
    }
  },
  mounted: function() {
  },
  components: {Search}
}
