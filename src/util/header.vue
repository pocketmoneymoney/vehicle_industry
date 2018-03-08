<template>
  	<div class="header clearfix">
		<img style="margin-right:30px; height:78px; float:left;" src="/img/Logo.png">
    	<top-nav></top-nav>
		<div class="index_nav">
			<ul> </ul>
		</div>
  	</div>
</template>

<script>
import TopNav from './top_nav.vue'
export default {
  components: {TopNav}
}
</script>

<style>
.header{
	width: 1200px;
	margin: 0 auto;
}

.index_nav{
	width: 1200px;
	margin: 0 auto;
	height: 60px;
	border-bottom: 2px solid #00A6AA;
	padding-bottom: 1px;
	margin-bottom: 10px;
}

.index_nav ul{
	height: 56px;
	background: #00A6AA;
  	padding-left: 0;
	list-style: none;
}
</style>
