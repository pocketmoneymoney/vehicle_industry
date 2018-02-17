<template>
  <div>
    <list-panel :product="product" :title="title" :mainUrl="mainUrl" :component="component" :height=140></list-panel>
  </div>
</template>

<script>
import ListPanel from './list_panel.vue'

export default {
  data() {
    return {
      product: "position",
      title: "最新职位",
      component: "list-position",
	  mainUrl: "/src/position/index.html"
    }
  },
  components: {ListPanel}
}
</script>

<style>
</style>
