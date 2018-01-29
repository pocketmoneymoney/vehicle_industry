<template>
  <div class="event_enroll_panel clearfix">
    <h3>
        <span>活动预告及报名</span>
        <a href="../inquiry/product_list.aspx">More &gt;</a>
    </h3>
    <event-enroll></event-enroll>
    <div class="seperate"></div>
    <event-enroll></event-enroll>
  </div>
</template>

<script>
import EventEnroll from './event_enroll.vue'

export default {
  components: {EventEnroll}
}
</script>

<style>
.event_enroll_panel{
	width: 544px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px;
	margin-bottom: 8px;
}
.event_enroll_panel h3 {
  padding-bottom: 25px;
  border-bottom: #d7d7d7 1px solid;
}
.event_enroll_panel h3 span{
	float: left;
}
.event_enroll_panel h3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
}
.seperate {
  float:left;
  width:0px;
  height:68px;
  margin-top:10px;
  border-left:#d7d7d7 1px solid;
}
</style>
