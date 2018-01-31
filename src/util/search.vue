<template>
  <!--搜索-->
  <div class="searchA">
      <a href="javascript:void(0);" onclick="return searchCompany();">搜索</a>
      <input id="txt_searchKey" type="text" placeholder="请输入您需要寻找的公司名称  /  零部件名称" maxlength="20" />
  </div>
</template>

<script>
</script>

<style>
.searchA{ width:700px; border:2px solid #449cd7; border-top-right-radius:3px; border-bottom-right-radius:3px; height:42px; background:#ffffff; margin:10px auto; font-family:"微软雅黑";}
.searchA a{ width:90px; background:#449cd7; display:block; height:40px; float:right; color:#fff; text-align:center; font-size:18px; line-height:40px;font-family:"微软雅黑";}
.searchA a:hover{background:#449cd7; color:#fff;}
.searchA input{ height:38px;line-height:38px; font-size:14px; border:0; outline:0; padding-left:10px; width:580px;font-family:"微软雅黑";}
</style>
