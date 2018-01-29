<template>
  <div>
    <list-panel :product="product" :title="title" :component="component" :height=140></list-panel>
  </div>
</template>

<script>
import ListPanel from './list_panel.vue'

export default {
  data() {
    return {
      product: "purchase",
      title: "最新采购",
      component: "list-purchase"
    }
  },
  components: {ListPanel}
}
</script>

<style>
</style>
