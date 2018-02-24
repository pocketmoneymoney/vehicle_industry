<template>
  <div class="activity_panel">
    <div>
         <a target="_blank" style="cursor:pointer;" @click="enroll(activity)">
		 <img :src="posterUrl"/></a>
    </div>
    <p class="title">
	  <span class="spantitl">
		<a target="_blank" style="cursor:pointer;" @click="enroll(activity)">{{activity.name}}</a></span>
	</p>
    <div class="Lowerpart">
        <p class="time">{{activity.startTime}} - {{activity.endTime}} </p>
        <p class="add">{{activity.location}}</p>
    </div>
  </div>
</template>

<script>
export default {
	props: ['activity'],
	data() {
	  return {
	    enrollUrl: '/src/activity/enroll.html?id=',
	    posterUrl: ''
      }
	},
    methods: {
	  enroll: function (activity) {
		window.location.href = this.enrollUrl + activity.id + "&tp=" + activity.type;
      } 
	},
    mounted: function() {
	  if (this.activity.smallPoster) {
	    this.posterUrl = this.activity.smallPoster;
	  } else {
	    this.posterUrl = this.activity.bigPoster;
      } 
	}
}
</script>

<style scoped>
.activity_panel { 
	width:286px; 
	float:left; 
	margin:10px 10px 5px 5px;
	background:#fff; 
	height: auto;
	overflow: hidden; 
	border-radius:2px;		
	transition: all .5s linear;	
	-webkit-transition: all .5s linear;	
	-moz-transition: all .5s linear; 
	-ms-transition: all .5s linear;	
}

.activity_panel a{ 
	width:100%; 
	height:100%; 
	display:block;
}	

.activity_panel:hover{
	box-shadow: 0 6px 6px rgba(0,0,0,.175)
}

.activity_panel:hover div img{
	-webkit-animation:zoomIn 2s cubic-bezier(0.42,0,.58,1)
}

.activity_panel div { 
	width:286px;  
	overflow:hidden; 
	display:block; 
	border-top-left-radius:2px;  
	border-top-right-radius:2px; 
}

.activity_panel div img{ 
	display:block; 
	width:100%; 
	height:220px;
}

.activity_panel p.title{  
	padding:8px 20px; 
	color:#333; 
	zoom:1;
}

.activity_panel p.title:after{
	display:block;
	clear:both;
	content:"";
	visibility:hidden;
	height:0;
}

.activity_panel p.title .spantitl{ 
	font:normal 17px/26px "Microsoft YaHei"; 
	height:52px; 
	overflow:hidden; 
	display:block; 
}

.Lowerpart{ border-top:1px solid #ececec; color:#444;  margin-top:9px; /*background:#f3f7fb;*/ padding:9px 20px 12px;}
.Lowerpart .time{ background:url(/img/active.png) no-repeat 0 -54px;  font:12px/23px "Microsoft Yahei"; color:#616669; padding-left:20px; height:23px; overflow:hidden; }
.Lowerpart .time span{margin-left:15px; color:#f95640;}
.Lowerpart .add{background:url(/img/active.png) no-repeat 0 -106px;  font:12px/23px "Microsoft Yahei"; color:#616669; padding-left:20px; height:23px; overflow:hidden; }
.width1100 .paging{ background:none;}

</style>
