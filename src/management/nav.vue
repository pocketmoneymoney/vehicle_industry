<template>
  <div class="index_nav">
      <ul>
          <li>
              <a name="user" @click="chooseView">用户</a>
          </li>
          <li>
              <a name="company" @click="chooseView">OE供应商</a>
          </li>
          <li>
              <a name="purchase" @click="chooseView">采购项目专区</a>
          </li>
          <li>
              <a name="meeting" @click="chooseView">采购配对会</a>
          </li>
          <li>
              <a name="visiting" @click="chooseView">走进主机厂</a>
          </li>
          <li>
              <a name="position" @click="chooseView">人才猎头</a>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
    }
  },
  methods: {
    chooseView: function(event) {
      this.$emit("viewChanged", event.target.name);
    },
  }
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
</style>
