<template>
<div class="banner-padding-top">
<div class="container-lg">
  <div id="slides-thumbnail">
    <a><img src="/img/1.jpg" /></a>
    <a><img src="/img/2.jpg" /></a>
    <a><img src="/img/3.jpg" /></a>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  mounted: function() {
    var slidesWrap = $('.banner-padding-top');
    var $backDropLeft, $backDropRight, backDropWidth, calcSlidesBackdrop;
    $('#slides-thumbnail').bxSlider({
        auto: true,
        pause: 3000,
        autoHover: true,
        wrapSelector: '.slides-thumbnail',
    });
  }
}
</script>

<style>
</style>
