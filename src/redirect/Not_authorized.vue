<template>
    <div class="back_wrapper">
      <div class="clearfix topfixed">
        <top-bar></top-bar>
        <main-header></main-header>
      </div>
      <div class="main clearfix">
      	<h2>您没有访问该页面的用户权限， 如果您的用户已过期，请重新登录</h2>
		<div>
       		<span><a href="/src/index.html"><<< 返回首页      </a></span>
            <span><a href="/src/register/login.html">前往登录页面 >>></a></span>
	    </div>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'
import MainNav from '../util/main_nav.vue'
import LastFooter from '../util/footer.vue'

export default {
  components: {MainHeader, MainNav, TopBar, LastFooter} 
}
</script>

<style lang="scss">
@import '../../css/rem.scss';
</style>
