<template>
  <div class="project_enroll">
    <dl class="clearfix">
        <dd>
            <h4>
                <a> {{activity.name}} </a>
            </h4>
            <p>{{activity.startTime}}-{{activity.endTime}} </p>
			<p>{{activity.location}} </p>
        </dd>
        <dt>
            <span class="event_enroll_button"><a :href='enrollUrl + activity.id + "&tp=" + activity.type'>报名</a></span>
        </dt>
    </dl>
  </div>
</template>

<script>
export default {
	props: ['activity'],
	data() {
		return {
			enrollUrl: '/src/activity/enroll.html?id='
		}
	},
  watch: {
    activity: function() {
      console.log("activity", this.activity);
    }
  }
}
</script>

<style scoped>
.project_enroll{ 
	width:270px; 
	margin-bottom:10px; 
	margin-left:10px; 
	float:left; 
	background:#fff; 
	padding:5px 2px 2px 2px;
	overflow:hidden; 
	position:relative;
}
.project_enroll a{ width:100%; display:block;}
.project_enroll h4{ font-size:16px; color:#000; padding-bottom:0.25em; margin:0 0 10px 0;}
.project_enroll p{ font-size:11px; color:#888888; line-height:20px;}
.project_enroll dd{ padding-top:4px;}
.project_enroll dd.dd{  font-family:Arial;}
.project_enroll dt{ width:64px; float:right; text-align:center; }
.project_enroll dt b{ font-weight:normal; font-size:11px; line-height:23px; color:#999;}
.project_enroll dt .event_enroll_button{ 
	display:block; 
	border-radius:0.2em; 
	font-size:13px; 
	line-height:26px; 
	text-align:center; 
	background:#3d9ccc; 
	color: #fff;
	padding-left:0px;
}
.project_enroll span a{ 
	padding:0px;
	color: #fff;
}
</style>
