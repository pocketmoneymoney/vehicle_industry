<template>
  <div>
    <div class="title_bar">
	  <span> <a>热门职位招聘</a> </span>
   	  <search @searchBar="searchBar"></search>
    </div>
    <div class="list_position">
      <ul class="position_list">
         <li v-for="position in positions">
             <div class="position_list_right">
                 <dl>
                     <dt>职位名称</dt>
                     <dd><h4 class="position_title"> {{ position.name }}</h4>
					 </dd>
                 </dl>
			 </div>
             <div class="position_list_right">
                 <dl>
                     <dt>公司名称</dt>
                     <dd>
             		   <em>{{ position.company }}</em>
					 </dd>
                 </dl>
			 </div>
             <div class="position_list_right">
                 <dl>
                     <dt>工作地址</dt>
                     <dd>
             		   <em>{{ position.location }}</em>
					 </dd>
                 </dl>
			 </div>
             <div class="position_list_right">
                 <dl>
                     <dt>职位要求</dt>
                     <dd>{{ position.brief }}</dd>
                 </dl>
             </div>
            <a @click="applyPosition(position)" class="contact_btn">更多详情</a>
         </li>
     </ul>
     <page :curPage="curPage" :totalPage="totalPage" @pageChanged="changePage"></page>
    </div>
  </div>
</template>

<script src="./list_position.js"></script>

<style>
.list_position{
	float: left;
	width: 850px;
	border: 1px solid #e5e5e5;
	background: #fff;
	padding: 19px 20px;
	margin-bottom: 8px;
}

.list_position h3 {
  height: 42px;
}

.list_position h3 span{
	float: left;
  padding-top: 15px;
  padding-left: 15px;
}

.list_position h3 a{
	color: #999999;
	font-size: 12px;
	float: right;
	font-weight: normal;
}

.position_list li{
	border-bottom: 1px dashed #e5e5e5;
	padding: 20px 0;
	overflow: hidden;
}

.position_title{
	color: #449cd7;
	font-size: 20px;
	line-height: 22px;	
	height: 22px;
	margin-bottom: 15px;
}

.position_title a{
	color: #449cd7;
}
.position_title a:hover{
	color: #73c5ec;
}

.position_list_right{
	margin-top: 10px;
}
.position_list_right dl{
	overflow: hidden;
	font-size: 12px;
}
.position_list_right dl dt{
	float: left;
	width: 100px;
	padding-right: 20px;
	line-height: 22px;
	color: #999;
}
.position_list_right dl dd{
	float: left;
	width: 500px;
	line-height: 22px;
	color: #333;
}

.position_list li a{
	font-weight: normal;
	border-radius:0.2em; 
	font-size:13px; 
	text-align:center; 
	background:#3d9ccc; 
	color:#fff;
	cursor: pointer;
}
</style>
