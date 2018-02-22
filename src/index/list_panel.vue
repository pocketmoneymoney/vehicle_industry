<template>
  <div class="list_panel">
    <h3>
        <span>{{ title }}</span>
        <a :href="mainUrl">更多</a>
    </h3>
	<div style="margin-top:10px; margin-left:30px">
	<li
		v-for="component in components">
		<p>{{component.title}} </p>
		<p>{{component.content}} </p>
	</li>
	</div>
  </div>
</template>

<script src='./list_panel.js'></script>

<style scoped>

</style>
