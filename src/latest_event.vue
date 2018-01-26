<template>
  <div>
    <list-panel :product="product" :height=140></list-panel>
  </div>
</template>

<script>
import ListPanel from './list_panel.vue'

export default {
  data() {
    return {
      product: "event"
    }
  },
  components: {ListPanel}
}
</script>

<style>
</style>
