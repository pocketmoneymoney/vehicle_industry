<template>
  <div>
    <list-panel :product="product" :title="title" :mainUrl="mainUrl" :component="component" :height=140></list-panel>
  </div>
</template>

<script>
import ListPanel from '../index/list_panel.vue'

export default {
  data() {
    return {
      product: "purchase",
      title: "最新采购",
      component: "list-purchase",
	  mainUrl: "/src/purchase/index.html"
    }
  },
  components: {ListPanel}
}
</script>

<style>
</style>
