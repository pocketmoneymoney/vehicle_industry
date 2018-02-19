<template>
    <div class="back_wrapper">
      <top-bar></top-bar>
      <main-header></main-header>
      <div class="main clearfix">
        <main-nav></main-nav>
		<div class="main_right">
		  <supplier-info></supplier-info>
		</div>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import LastFooter from '../util/footer.vue'

import Purchase from './purchase.vue'
import SupplierInfo from './Supplier-info.vue'

export default {
  components: {SupplierInfo, TopBar, MainHeader, MainNav, LastFooter, Purchase} 
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
