<template>
  <div class="product clearfix">
    <img style="max-width:200px; max-height:150px;" :src="certification.avatar" />
    <ul>
      <li><p>认证名称  {{certification.name}}</p></li>
     <div v-if="isOwner">
      <span> <a :href="editItem">修改</a></span>
      <span> <a @click="deleteItem">删除</a></span>
     </div>
    </ul>
  </div>
</template>

<script src="./certification.js"></script>

<style>
</style>
