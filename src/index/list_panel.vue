<template>
  <div class="list_panel">
    <h3>
        <span>{{ title }}</span>
        <a :href="mainUrl">More &gt;</a>
    </h3>
    <component :is="component"></component>
  </div>
</template>

<script src='./list_panel.js'></script>

<style scoped>
.list_panel{
	width: 698px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px;
	margin-bottom: 8px;
}
.list_panel h3 span{
	float: left;
}
.list_panel h3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
}

</style>
