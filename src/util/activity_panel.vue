<template>
  <div class="activity_panel">
    <div>
         <a target="_blank" :href="activityEnrollUrl + activity._id"><img :src="imgUrl + activity.smallPoster"  /></a>
    </div>
    <p class="title"><span class="spantitl"><a target="_blank" :href="activityEnrollUrl + activity._id">{{activity.name}}</a></span></p>
    
    <!--p class="cont">42人已报名  </p-->
    
    <div class="Lowerpart">
        <p class="time">{{activity.time}}<!--span>12天后开始</span--></p>
        <p class="add">{{activity.location}}</p>
    </div>
  </div>
</template>

<script>
export default {
	props: ['activity'],
	data() {
		return {
      imgUrl: 'http://localhost:8099/',
	    activityEnrollUrl: '/src/util/activity_enroll.html?activityId=',
		}
	}
}
</script>

<style scoped>
.activity_panel { width:350px; float:left; margin:0 19px 25px 4px; background:#fff; height: auto;overflow: hidden; border-radius:2px;		transition: all .5s linear;	-webkit-transition: all .5s linear;	-moz-transition: all .5s linear; -ms-transition: all .5s linear;	}
.activity_panel a{ width:100%; height:100%; display:block;}	
.activity_panel:hover{box-shadow: 0 6px 6px rgba(0,0,0,.175)}
.activity_panel:hover div img{-webkit-animation:zoomIn 2s cubic-bezier(0.42,0,.58,1)}
.activity_panel div { width:350px;  overflow:hidden; display:block; border-top-left-radius:2px;  border-top-right-radius:2px; }
.activity_panel div img{ display:block; width:100%; height:220px;}
.activity_panel p.title{  padding:8px 20px; color:#333; zoom:1;}
.activity_panel p.title:after{display:block;clear:both;content:"";visibility:hidden;height:0;}
.activity_panel p.title .spantitl{ font:normal 17px/26px "Microsoft YaHei"; height:52px; overflow:hidden; display:block; }

/*.activity_panel p.cont{  font:normal 13px/23px "Microsoft YaHei"; color:#8d8d8d; background:url(../images/bmicon.png) no-repeat 20px 4px; padding-left:40px; }*/
.Lowerpart{ border-top:1px solid #ececec; color:#444;  margin-top:9px; /*background:#f3f7fb;*/ padding:9px 20px 12px;}
.Lowerpart .time{ background:url(/img/active.png) no-repeat 0 -54px;  font:12px/23px "Microsoft Yahei"; color:#616669; padding-left:20px; height:23px; overflow:hidden; }
.Lowerpart .time span{margin-left:15px; color:#f95640;}
.Lowerpart .add{background:url(/img/active.png) no-repeat 0 -106px;  font:12px/23px "Microsoft Yahei"; color:#616669; padding-left:20px; height:23px; overflow:hidden; }
.width1100 .paging{ background:none;}

</style>
