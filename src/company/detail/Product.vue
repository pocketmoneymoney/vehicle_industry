<template>
  <div class="product clearfix">
    <img style="max-width:200px; max-height:150px;" :src="product.avatar" />
    <ul>
      <li><p>产品名称  {{product.name}}</p></li>
      <li><p>产品用途  {{product.usage}}</p></li>
      <li><p>设计产能  {{product.capacity}}</p></li>
      <li><p>配套客户  {{product.customer}}</p></li>
     <div v-if="isOwner">
      <span> <a :href="editItem">修改</a></span>
      <span> <a @click="deleteItem">删除</a></span>
     </div>
    </ul>
  </div>
</template>

<script src="./product.js"></script>

<style>
</style>


