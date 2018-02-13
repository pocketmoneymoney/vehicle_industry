<template>
  <div class="equipment clearfix">
    <img :src="imgUrl + equipment.avatar" />
    <ul>
      <li><span>设备名称</span>{{equipment.name}}</li>
      <li><span>设备用途</span>{{equipment.usage}}</li>
      <li v-if="isOwner"><a class="delete_button">删除</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['equipment', 'isOwner'],
  data() {
    return {
      imgUrl: '/'
    }
  }
}
</script>

<style>
.equipment {
  padding-left: 25px;
}
.equipment img{
	margin:0 auto 5px auto;
	border:1px solid #e5e5e5;
	width: 194px;
  /*remove height*/
  height: 112px;
}
.delete_button {
	float: left;
  margin: 10px 0 0 30px;
	width: 64px;
	background: #e2f5ff; /*url('../styImg/xunpan/message_icon.png') 15px center no-repeat;*/
	font-size: 13px;
	line-height: 26px;
	border-radius: 3px;
  border:1px solid #c8eafa;
  text-align:center;
  color:#3d9ccc;
}
.equipment ul {
  padding-left: 20px;
  list-style: none;
}
.equipment ul li {
  font-size: 12px;
  color: #444444;
  line-height: 22px;
  margin: 5px 0px;
  zoom: 1;
  word-wrap: break-word;
  word-break: break-all;
}
.equipment ul li:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
.equipment ul li span {
  font-size: 12px;
  color: #999999;
  margin-right: 10px;
  text-align: right;
  display: block;
  float: left;
}
</style>
