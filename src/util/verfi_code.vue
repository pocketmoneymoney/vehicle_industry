<template>
  <div>验证码：   
    <input type="text" id="input"/>   
    <input type="button" class=".code" :id=code onclick="createCode()" style="width:60px" title='点击更换验证码' /> 
    <input type="button" value="验证" onclick="validate()"/> 
  </div>   
</template>

<script>
export default {
  data() {
    return {
       code: ""
    },
  methods: {
    createCode: function() { 
   	  this.code = "";    
      var codeLength = 4;//验证码的长度   
      var checkCode = document.getElementById("code");    
      var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
          'S','T','U','V','W','X','Y','Z');//随机数   
      for(var i = 0; i < codeLength; i++) {//循环操作   
        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）   
        this.code += random[index];//根据索引取得随机数加到code上   
      }   
      checkCode.value = this.code;//把code值赋给验证码   
    }
  }
}

</script>

<style>
.code{ 
  font-family:Arial,宋体; 
  font-style:italic; 
  color:green; 
  border:0; 
  padding:2px 3px; 
  letter-spacing:3px; 
  font-weight:bolder; 
} 
</style>
