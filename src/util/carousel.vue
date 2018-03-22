<template>
  <div class="banner-padding-top">
    <div class="container-lg">
      <div :id="carouselId">
        <div v-for='imgPath in imgPaths'>
			<img @click=redirectTo(imgPath) :src="imgPath">
	  	    <div style="clear:both;"> </div>
			<a v-if=hasTitle @click=redirectTo(imgPath) style="cursor:pointer">
			 {{ getTitle(imgPath) }} </a>
		</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['carouselId', 'imgPaths', 'imgHrefs', 'imgTitle', 'hasTitle'],
  data() {
    return {
    }
  },
  mounted: function() {
    this.showCarousel();
  },
  methods: {
	getTitle: function (imgPath) {
		if (this.imgTitle && this.imgTitle[imgPath]) {
			return this.imgTitle[imgPath];
		} else {
			return "";
		}
	},
	redirectTo: function (imgPath) {
		if (this.imgHrefs && this.imgHrefs[imgPath]) {
			window.location.href = this.imgHrefs[imgPath];
		}
	},
    showCarousel: function() {
      if (this.imgPaths.length === 0) {
		return;
	  }

      $('#' + this.carouselId).bxSlider({
          auto: true,
          pause: 3000,
          autoHover: true,
          wrapSelector: '.slides-thumbnail',
      });
    }
  },
  watch: {
    imgPaths: function() {
      var self = this;
      this.$nextTick(function() {
        self.showCarousel();
      });
    }
  }
}
</script>

<style>
.banner-padding-top { 
	float:left; 
	overflow:hidden; 
	height:130px;
}
.container-lg { 
	width:160px;
	height:110px;
}
.container-lg div img{ 
	max-width:160px;
	max-height:100px;
}

.bx-wrapper { position: relative;}
#slides-thumbnail>div:first-child{ position:static; clip:auto;}
#slides-thumbnail>div{position:absolute; clip:rect(0 0 0 0);}
.bx-wrapper img, .find-events-aside img{max-width:100%; vertical-align:middle;}
.slides-thumbnail .dots{ position: absolute; right: 15px;  bottom: 15px;}
.slides-thumbnail .dots .dot{ display: inline-block;}
.bx-controls-direction a, .dots .dot{ font: 0/0 a;  color: transparent;  border: 0;  background-color: transparent;  text-shadow: none;}

.bx-controls-direction a, .dots .dot{ width: 8px; height: 8px;  margin: 0 1px; -webkit-transition: width .5s ease-out; -o-transition: width .5s ease-out;  transition: width .5s ease-out; border-radius: 8px; background: #969ba2;}
.dots .dot{ display: block;}
.slides-thumbnail .dots .active{width:16px; background:#62b651;}
.slides-thumbnail .bx-prev { width: 32px; height: 72px; background-image: url(http://cdn.huodongxing.com/Content/v2.0/dist/css/sprite/index_login_bg.32.png); background-position: -76px 0; } /*big one -298 0*/
.slides-thumbnail .bx-prev:hover { background-image: url(http://cdn.huodongxing.com/Content/v2.0/dist/css/sprite/index_login_bg.32.png);  background-position: -114px 0;  } /*big one -371 0*/
.slides-thumbnail .bx-next { width:32px;  height:72px;background-image:url(http://cdn.huodongxing.com/Content/v2.0/dist/css/sprite/index_login_bg.32.png); background-position:0 0;} /*big one -152 0*/
.slides-thumbnail .bx-next:hover{background-image: url(http://cdn.huodongxing.com/Content/v2.0/dist/css/sprite/index_login_bg.32.png); background-position: -38px 0; } /*big one -225 0*/
.slides-multiple-list .bx-next {  width: 37px; height:73px; background-image: url(http://cdn.huodongxing.com/Content/v2.0/dist/css/sprite/index_login_bg.32.png);background-position: 0 0; }
.slides-multiple-list .bx-next:hover { background-image: url(http://cdn.huodongxing.com/Content/v2.0/dist/css/sprite/index_login_bg.32.png);  background-position: -38px 0; }
.slides-multiple-list .bx-prev { width: 37px; height: 73px; background-image: url(http://cdn.huodongxing.com/Content/v2.0/dist/css/sprite/index_login_bg.32.png); background-position: -76px 0; }
.slides-multiple-list .bx-prev:hover { background-image: url(http://cdn.huodongxing.com/Content/v2.0/dist/css/sprite/index_login_bg.32.png); background-position: -114px 0;}
.slides-thumbnail .bx-pager { position: absolute;  right: 15px; bottom: 15px; }
.bx-pager .bx-pager-item { display: inline-block; }
.slides-thumbnail .bx-pager .bx-pager-link.active { width: 16px; background: #62b651; }
.slides-thumbnail .bx-pager .bx-pager-link { width: 8px; height: 8px; margin: 0 2px; -webkit-transition: width .5s ease-out; -o-transition: width .5s ease-out; transition: width .5s ease-out;  border-radius: 8px;  background: #969ba2;}
.bx-pager .bx-pager-item .bx-pager-link { display: block; }
@media \0screen\,screen\9 { .slides-thumbnail-backdrop-left, .slides-thumbnail-backdrop-right {  filter: alpha(opacity=90); }  }
@media (min-width: 1100px) { .slides-thumbnail .bx-viewport { overflow: visible !important; } }

.slides-thumbnail .bx-next, .slides-thumbnail .bx-prev { display:none; margin-top:-36px;}
.banner-padding-top:hover .slides-thumbnail .bx-next,.banner-padding-top:hover .slides-thumbnail .bx-prev{display:block}
.bx-controls-direction a { position: absolute;  z-index: 1;  top: 50%;   outline: 0;}
.bx-controls-direction a, .bx-pager .bx-pager-item {  font: 0/0 a;  color:transparent;  border:0; background-color:transparent; text-shadow:none;}
.slides-thumbnail-backdrop-left { left: 0;}
.slides-thumbnail-backdrop-right { right: 0;}
.slides-thumbnail-backdrop-left, .slides-thumbnail-backdrop-right {  position: absolute; top:156px; height:351px; opacity: .9; background: #fff;  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=90)';  filter: alpha(opacity=90);}
@media (min-width: 1100px){.slides-thumbnail .bx-prev {left:-85px;}}
@media (min-width: 1100px){.slides-thumbnail .bx-next {right:-85px;}}
.slides-thumbnail .bx-prev { left: 13px;}
.slides-thumbnail .bx-next { right: 13px;}

</style>
