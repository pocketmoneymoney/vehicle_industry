<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
        <div class="main2_left">
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
import ListPosition from './list_position.vue'
import MainRight from './main_right.vue'

export default {
  data: function() {
    return {
      viewName: "position"
    }
  },
  components: {MainHeader, TopBar, MainNav, MainRight,
			   ListPosition, LastFooter}
}
</script>

<style lang="scss">
@import '../../css/rem.scss';

</style>
