<template>
  <div class="product clearfix">
    <img :src="imgUrl + equipment.avatar" />
    <ul>
      <li><p>设备名称  {{equipment.name}}</p></li>
      <li><p>设备用途  {{equipment.usage}}</p></li>
      <li><p>设备用途  {{equipment.provider}}</p></li>
     <div v-if="isOwner">
      <span> <a :href="editItem">修改</a></span>
      <span> <a @click="deleteItem">删除</a></span>
     </div>
    </ul>
  </div>
</template>

<script src="./equipment.js"></script>

<style>
</style>
