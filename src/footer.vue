<template>
  <div class="footer">
    <contact></contact>
  </div>
</template>

<script>
import Contact from './contact.vue'

export default {
  components: {Contact}
}
</script>

<style>
.footer{
	/*border-top:1px solid #cccccc;*/
  margin-top:35px;

  /*blue background version*/
  background-color: #449cd7;
  color: #fff;
}
</style>
