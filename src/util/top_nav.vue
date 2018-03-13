<template>
  <div class="clearfix ws-head-nav am-cf">
    <div class="am-fl ws-head-col">
      <a class="ws-head-colName" href="/src/index.html">首页</a>
    </div>
    <div class="am-fl ws-head-col">
      <a class="ws-head-colName" href="/src/company/search.html">供应商</a>
    </div>
    <div class="am-fl ws-head-col">
      <a class="ws-head-colName" href="/src/purchase/index.html">采购项目</a>
    </div>
    <div class="am-fl ws-head-col">
      <a class="ws-head-colName" href="/src/activity/meeting.html">活动专区</a>
    </div>
    <div class="am-fl ws-head-col">
      <a class="ws-head-colName" href="/src/position/index.html">企业招聘</a>
      <span class="head_new"></span>
    </div>
  </div>
</template>

<style>
.ws-head-col {
    font-size: 20px;
	color: #2F4F4F;
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    cursor: pointer;
    position: relative;
}
.ws-head-col a:hover {
    color: #f60;
}
.ws-head-col:nth-child(2) {
    padding: 0 20px;
}
.ws-head-col:nth-child(1) {
    padding-left: 0;
}
.ws-head-colNameLastS {
    padding-left: 20px;
    display: block;
}
.ws-head-colNameLast {
    padding-left: 20px;
    display: block;
}
.ws-head-app{
    color:#f60;
    font-size: 30px;
}
.ws-head-colName {
    color: #333333;
    position: relative;
}
.ws-head-colIcon {
    position: absolute;
    top: 7px;
    right: -18px;
    width: 10px;
    height: 5px;
}
.ws-head-app {
    position: absolute;
    top: 30px;
    left: -3px;
    width: 13px;
    height: 20px;
}
.ws-head-colGold {
    position: absolute;
    top: 32px;
    left: -3px;
    width: 18px;
    height: 18px;
}
.ws-head-colList:after {
    position: absolute;
    content: '';
    top: -20px;
    left: 50%;
    border: 10px solid transparent;
    border-bottom: 10px solid #f60;
    margin-left: -10px;
}
.ws-head-colList {
    border-top: 3px solid #f60;
    display: none;
    position: absolute;
    top: 80px;
    left: 50%;
    margin-left: -100px;
    background: #fff;
    padding: 20px;
    box-shadow: 0 1px 15px rgba(18, 21, 21, 0.2);
    -webkit-animation-duration: 0.2s;
    -moz-animation-duration: 0.2s;
    -ms-animation-duration: 0.2s;
    -o-animation-duration: 0.2s;
    animation-duration: 0.2s;
    -webkit-transform-origin: top center;
    -moz-transform-origin: top center;
    -ms-transform-origin: top center;
    -o-transform-origin: top center;
    transform-origin: top center;
    text-transform: uppercase;
    z-index: 3;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
.ws-head-colList .ws-head-colListItem {
    width: 50%;
    text-align: center;
    border-right: 1px solid #ceced0;
    line-height: 46px;
    color: #333;
}
.ws-head-colList .ws-head-colListItem:hover {
    color: #f60;
}
.ws-head-colList .ws-head-colListItem:nth-child(even) {
    border-right: none;
}
.ws-head-colList .ws-head-colListItem:last-child {
    border-bottom: none;
}
.ws-head-colList .ws-head-colListItem:nth-last-child(2) {
    border-bottom: none;
}
.ws-head-colList .ws-head-colListItem2 {
    display: block;
    height: 46px;
    width: 60%;
    margin: 0 auto;
    text-align: center;
    /*border-bottom: 1px solid #ccc;*/
    line-height: 46px;
    color: #333;
}
.ws-head-colList .ws-head-colListItem2:last-child {
    border-bottom: none;
}
.ws-head-col:hover .ws-head-colList {
    display: block;
    width: 200px;
    height: auto;
    -webkit-animation-name: zoomIn;
    animation-name: zoomIn;
}
.ws-head-col:hover .ws-head-colList2 {
    width: 160px;
    margin-left: -80px;
    padding: 0;
}
.ws-head-col .head_new {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 20px;
    right: 0;
    /*background: url(../images/new.png) no-repeat;
    background-size: cover;*/
}
.ws-head-col .am-round {
    display: none;
    font-size: 10px;
    padding: 0 3px 1px;
    position: absolute;
    top: 26px;
    line-height: 1;
    right: -3px;
    background: #f60;
    color: #fff;
}
.am-fl {
    float: left;
}
</style>
