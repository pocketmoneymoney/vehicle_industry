<template>
  	<div class="header clearfix">
		<img style="margin-right:30px; margin-top:3px; height:75px; float:left;" src="/img/Logo.png">
    	<top-nav :currentView="currentView"></top-nav>
		<div class="top_nav">
			<ul> </ul>
		</div>
  	</div>
</template>

<script>
import TopNav from './top_nav.vue'
export default {
  props: ["currentView"],
  components: {TopNav}
}
</script>

<style>
.header{
	width: 1200px;
	margin: 0 auto;
}

.top_nav{
	width: 1200px;
	margin: 0 auto;
	height: 10px;
	border-bottom: 2px solid #00A6AA;
	padding-bottom: 1px;
	margin-bottom: 10px;
}

.top_nav ul{
	height: 6px;
	background: #00A6AA;
  	padding-left: 0;
	list-style: none;
}
</style>
