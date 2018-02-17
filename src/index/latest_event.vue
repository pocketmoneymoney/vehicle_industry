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
      product: "event",
      title: "最新活动",
      component: "list-event",
	  mainUrl: "/src/meeting/index.html"
    }
  },
  components: {ListPanel}
}
</script>

<style>
</style>
