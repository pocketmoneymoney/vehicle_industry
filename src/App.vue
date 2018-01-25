<template>
  <div style="width:100%;background-color:#f9f9f8;">
    <main-header></main-header>
    <div class="main clearfix">
      <main-nav id="mainnav" :tabs="tabs" :defaultTab="defaultTab" @viewchange="viewChange"></main-nav>
    </div>
  </div>
</template>

<script>
import MainNav from './main_nav.vue'
import MainHeader from './header.vue'

export default {
  data: function() {
    return {
	    tabs: [
	      {index: 1,
		   name: 'Engine System'},
	      {index: 2,
		   name: 'Car Accessories'},
	      {index: 5,
		   name: '电子和电子产品'},
	      {index: 6,
		   name: '身体&配件'},
	      {index: 7,
		   name: '动力传动系统'},
	      {index: 8,
		   name: '制动系统'},
	      {index: 9,
		   name: '转向系统'},
	      {index: 3,
		   name: '材料和设备'},
	      {index: 4,
		   name: '处理部件和模具'},
	    ],
	    defaultTab: 1
    }
  },
  methods: {
	viewChange: function(index) {
	  this.itemSeries = this.items[index];
	  console.log(this.itemSeries);
	}
  },
  components: {MainNav, MainHeader}
}
</script>

<style>
.main{
	width: 1200px;
	margin: 0 auto;
}

/* clearfix elimate float:left has no height */
.clearfix:before,
.clearfix:after {
  content: '\0020';
  display: block;
  overflow: hidden;
  visibility: hidden;
  width: 0;
  height: 0;
}

.clearfix:after {
  clear: both;
}

</style>
