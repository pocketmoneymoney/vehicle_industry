<template>
  <div class="user_button_panel clearfix">
    <h3>
        <span>进入人才库</span>
    </h3>
    <user-button></user-button>
    <!--div class="seperate"></div>
    <user-button></user-button-->
  </div>
</template>

<script>
import UserButton from './user_button.vue'

export default {
  components: {UserButton}
}
</script>

<style>
.user_button_panel{
	width: 235px;
	border: 1px solid #e5e5e5;
	background: #fff;
	float: left;
	padding: 19px 20px;
	margin-bottom: 8px;
  margin-right: 4px;
}
.user_button_panel h3 {
  padding-bottom: 25px;
  border-bottom: #d7d7d7 1px solid;
}
.user_button_panel h3 span{
	float: left;
}
.user_button_panel h3 a{
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
