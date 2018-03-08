<template>
  <div class="header clearfix">
		<img style="margin-right:30px; height:78px; float:left;" src="/img/Logo.png">
    <top-nav></top-nav>
  </div>
</template>

<script>
import TopNav from './top_nav.vue'
export default {
  components: {TopNav}
}
</script>

<style>
/*Í·²¿*/
.header{
	width: 1200px;
	margin: 0 auto;
	height: 80px;
	border-top:1px solid #e0e0df;
	border-bottom:1px solid #e0e0df;
}
</style>
