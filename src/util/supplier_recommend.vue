<template>
  <div class="clearfix">
    <right-panel :product="product" :height=140></right-panel>
  </div>
</template>

<script>
import RightPanel from './right_panel.vue'

export default {
  data() {
    return {
      product: "supplier" 
    }
  },
  components: {RightPanel}
}
</script>

<style>
</style>
