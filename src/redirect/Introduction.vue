<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
        <div class="main clearfix" style="margin-left:250px">
			<img src="/img/introduction_1.jpg"> </img>
	  	    <div style="clear:both;"> </div>
			<img src="/img/introduction_2.jpg"> </img>
	  	    <div style="clear:both;"> </div>
			<img src="/img/introduction_3.jpg"> </img>
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

export default {
  components: {MainHeader, MainNav, TopBar, LastFooter} 
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
