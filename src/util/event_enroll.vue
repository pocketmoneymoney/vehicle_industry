<template>
  <div class="project_enroll">
    <!--span class="long"></span-->
    <dl class="clearfix">
        <dd>
            <h4>
                <a> {{activity.name}} </a>
            </h4>
            <p>{{activity.startTime}}-{{activity.endTime}} </p>
			<p>{{activity.location}} </p>
        </dd>
        <dt>
            <span class="event_enroll_button"><a :href="enrollUrl + activity.id">报名</a></span>
        </dt>
    </dl>
  </div>
</template>

<script>
export default {
	props: ['activity'],
	data() {
		return {
			enrollUrl: '/src/activity/apply.html?id='
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
.project_enroll{ margin-top:10px; width:200px; margin-bottom:10px; float:left; background:#fff; padding:9px 2px 2px 2px;overflow:hidden; position:relative;}
.project_enroll a{ width:100%; display:block;}
.project_enroll h4{ font-size:16px; color:#000; padding-bottom:0.25em; margin:0 0 10px 0;}
.project_enroll p{ font-size:11px; color:#888888; line-height:20px;}
.project_enroll dd{ padding-top:4px;}
.project_enroll dd.dd{  font-family:Arial;}
.project_enroll dt{ width:64px; float:right; text-align:center; }
.project_enroll dt b{ font-weight:normal; font-size:11px; line-height:23px; color:#999;}
.project_enroll dt .event_enroll_button{ display:block; background:#e2f5ff; border:1px solid #c8eafa; border-radius:0.2em; font-size:13px; line-height:26px; text-align:center; color:#3d9ccc; padding-left:0px;}
.project_enroll span a{ padding:0px;}
</style>
