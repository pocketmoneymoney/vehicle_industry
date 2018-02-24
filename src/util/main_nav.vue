<template>
  <div class="index_nav">
      <ul>
          <li>
              <a href="/src/index.html" :class="{current: currentView === index}">首页</a>
          </li>
          <li>
              <a href="/src/company/index.html" :class="{current: currentView === company}">OE供应商</a>
          </li>
          <li>
              <a href="/src/purchase/index.html" :class="{current: currentView === purchase}">采购项目专区</a>
          </li>
          <li>
              <a href="/src/activity/meeting.html" :class="{current: currentView === meeting}">采购配对会</a>
          </li>
          <li>
              <a href="/src/activity/visiting.html" :class="{current: currentView === visiting}">走进主机厂</a>
          </li>
          <li>
              <a href="/src/position/index.html" :class="{current: currentView === position}">人才猎头</a>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  props: ["currentView"],
  data() {
    return {
      index: "index",
      company: "company",
      purchase: "purchase",
      meeting: "meeting",
      visiting: "visiting",
      position: "position"
    }
  },
}
</script>

<style>
.index_nav{
	height: 40px;
	border-bottom: 2px solid #73c5ec;
	padding-bottom: 1px;
	margin-bottom: 10px;
}
.index_nav ul{
	height: 36px;
	background: #449cd7;
  padding-left: 0;
  list-style: none;
}
.index_nav li{
	float: left;
	padding:0 20px;
	height: 36px;
	line-height: 36px;
	text-align: center;
	font-size: 15px;
	font-weight: bold;
}
.index_nav li:hover{
	background: #73c5ec;
}
.index_nav li a{
	display: block;
	color: #fff;
  font-size: 15px;
  line-height: 34px;
}
.current {
  text-decoration:underline;
}
</style>
