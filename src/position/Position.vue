<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
        <!--main-nav :currentView="viewName"></main-nav-->
        <div class="main2_left">
		  <div class="title_bar">
			<span> <a>热门职位招聘</a> </span>
          	<search @searchBar="searchBar"></search>
		  </div>
          <list-position></list-position>
        </div>
		<main-right></main-right>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import LastFooter from '../util/footer.vue'
import Search from './search.vue'
import ListPosition from './list_position.vue'
import MainRight from './main_right.vue'


export default {
  data: function() {
    return {
      viewName: "position"
    }
  },
  methods: {
	searchBar: function (data) {
		var keyword = trimStr(data);
	},
	viewChange: function(index) {
	  this.itemSeries = this.items[index];
	}
  },
  components: {MainHeader, TopBar, MainNav, Search, MainRight,
			   ListPosition, LastFooter}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';

</style>
