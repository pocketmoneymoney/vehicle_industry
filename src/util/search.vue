<template>
  <div class="searchA">
      <a @click="searchCompany()" style="cursor:pointer">搜索</a>
      <input v-model="searchData" id="txt_searchKey" type="text" 
	   placeholder="请输入您需要寻找的公司名称  /  零部件名称" maxlength="20" />
  </div>
</template>

<script>
export default {
  data() {
	return {
		searchData: ''
	}
  },
  methods: {
	searchCompany: function() {
      this.$emit("searchBar", this.searchData);
	}
  }
}
</script>

<style>
.searchA{ 
	float:right; 
	width:550px; 
	border:2px solid #00A6AA; 
	border-top-right-radius:3px; 
	border-bottom-right-radius:3px; 
	height:42px; 
	background:#ffffff; 
	margin-top:10px; 
	margin-bottom:5px; 
	margin-right:20px; 
	font-family:"微软雅黑";
}

.searchA a{ 
	width:90px; 
	background:#00A6AA; 
	display:block; 
	height:40px; 
	float:right; 
	color:#fff; 
	text-align:center; 
	font-size:18px; 
	line-height:40px;
	font-family:"微软雅黑";
}

.searchA a:hover{
	background:#449cd7; 
	color:#fff;
}

.searchA input{ 
	height:38px;
	line-height:38px; 
	font-size:14px; 
	border:0; 
	outline:0; 
	padding-right:20px; 
	width:380px;
	font-family:"微软雅黑";
}

</style>
