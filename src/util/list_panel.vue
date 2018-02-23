<template>
  <div class="list_panel">
    <h3>
        <span>{{ title }}</span>
        <a :href="mainUrl">更多</a>
    </h3>
	<div style="margin-top:10px; margin-left:30px">
	<a
		v-for="component in components">
		<li style="cursor:pointer; margin-bottom:10px;" 
			@click="redirectTo(component)">{{component.title}} [[{{component.content}}]] </li>
	</a>
	</div>
  </div>
</template>

<script src='./list_panel.js'></script>

<style scoped>

</style>
