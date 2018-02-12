<template>
    <div class="main_nav">
        <ul class="left_main_nav">
          <li
            v-for="tab in tabs"
            @click="choose(tab)">
              <a href='#'>{{tab.name}}</a>
          </li>
        </ul>
    </div>
</template>

<script src='./left_nav.js'></script>

<style>
ul{
	list-style: none;
}

a{
	text-decoration: none;
}

a:hover{
	text-decoration: none;
}

/*左侧导航*/
.main_nav{
	float: left;
	width: 214px;
	height: 742px;
	border: 1px solid #fff;
	padding: 0 12px;
	box-shadow:  0 0 3px #999;
	/*background: #fff url('../../img/main_nav_bg.jpg') right bottom no-repeat;*/
  background-color: #fff;
	z-index: 1000;
}
.main_nav_title{
	height: 42px;
	border-bottom:2px solid #449cd7;
	line-height: 42px;
	font-size: 15px;
	color: #449cd7;
	padding-left: 37px;
	background: url('../../img/nav_icon.png') 10px 15px no-repeat;
}
.left_main_nav{
	padding-top: 5px;
  padding-left: 5px;

}
.left_main_nav li{
	/*width: 202px;*/
	height: 44px;
	line-height: 44px;
	padding-left: 0px;
	background:#fff url('../../img/nav_arrow.jpg') right center no-repeat;
	border:1px solid #fff;
	border-left: 2px solid #fff;
	position: relative;

}
.left_main_nav li a{
	color: #333;
	font-size: 14px;
	display: block;
}

.left_main_nav li:hover{
	border:1px solid #fff;
	border-left: 2px solid #449cd7;
	box-shadow: 0 0 1px #999;
	position: relative;
	width: 220px;
	margin-left: -27px;
	padding-left: 28px;
	background:#fff url('../../img/nav_arrow.jpg') 233px center no-repeat;
	z-index: 10;
}

.three_nav{
	background: #fff;
	position: absolute;
	height: 478px;
	border:1px solid #fff;
	z-index: 1000;
	left: 219px;
	display: none;
	padding-left: 20px;
	box-shadow: 0 0 3px #999;
	top: -2px;
	width: 214px;
}
.left_main_nav li:hover .three_nav{
  display:block;
}
.left_main_nav li:hover .three_nav:hover{
  display:block;
}
.three_nav ul{
  padding-left: 0;
}
.three_nav ul li {
	height: 44px;
	line-height: 44px;
  padding-top: 10px;
	padding-left: 0px;
	background:#fff;
	border:1px solid #fff;
	border-left: 2px solid #fff;
	position: relative;
}
</style>
