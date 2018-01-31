<template>
  <div id='rpSearchResultList' class='paging'>
    <a v-for="page in pageRange" :class="{current: page === curPage}" @click="changePage(page)">{{ page }}</a>&nbsp;
    <!--span class='current'>1</span>&nbsp;
    <a href='http://i.gasgoo.com/supplier/c-298/index-2.html'>2</a>&nbsp;
    <a href='http://i.gasgoo.com/supplier/c-298/index-3.html'>3</a>&nbsp;
    <a href='http://i.gasgoo.com/supplier/c-298/index-4.html'>4</a>&nbsp;
    <a href='http://i.gasgoo.com/supplier/c-298/index-5.html'>5</a>&nbsp;
    <a href='http://i.gasgoo.com/supplier/c-298/index-6.html'>6</a>&nbsp;
    <a href='http://i.gasgoo.com/supplier/c-298/index-7.html'>7</a>&nbsp;
    <a href='http://i.gasgoo.com/supplier/c-298/index-8.html'>8</a>&nbsp;
    <a href='http://i.gasgoo.com/supplier/c-298/index-9.html'>9</a>&nbsp;...
    <a href='http://i.gasgoo.com/supplier/c-298/index-2.html' class='next'>>></a-->
  </div>
</template>

<script src='./page.js'></script>

<style>
/*页码*/
.paging{ padding-top:40px; padding-bottom:40px; text-align:center; background-color:#FFF; margin-bottom:13px;}
.paging a{ display:inline-block; padding:6px 15px; border:1px solid #dbdbdb; font-size:18px; margin-left:-1px; color:#787575; font-family:"Microsoft YaHei";}
.paging a.on{ background:#55b9ed; color:#FFF;border:1px solid #0d9be6;}
.paging .current{ display:inline-block; padding:6px 15px; border:1px solid #0d9be6; font-size:18px; margin-left:-1px; color:#FFF;background:#55b9ed;}
</style>
