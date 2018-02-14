<template>
    <div>
        <h3>供应商列表</h3>
        <table id="userlist">
          <thead>
             <tr>
                <th>公司名称</th>
                <th>用户名称</th>
                <th>认证</th>
                <th>认证操作</th>
                <th>广告位</th>
                <th>广告位操作</th>
                <th>优质供应商</th>
                <th>优质供应商操作</th>
                <th>操作</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="user in users">
              <th>{{user.name}}</th>
              <th>{{user.username}}</th>
              <th v-if="user.authenticated">已认证</th>
              <th v-else></th>
              <th v-if="user.authenticated" @click="deAuthenticate(user)" class="delete_button">取消认证</th>
              <th v-else @click="authenticate(user)" class="delete_button">认证</th>
              <th v-if="user.ad">已占广告位</th>
              <th v-else></th>
              <th v-if="user.ad" @click="deAd(user)" class="delete_button">取消广告位</th>
              <th v-else @click="ad(user)" class="delete_button">添加至广告位</th>
              <th v-if="user.selected">是</th>
              <th v-else></th>
              <th v-if="user.selected" @click="deSelect(user)" class="delete_button">取消优质供应商</th>
              <th v-else @click="select(user)" class="delete_button">添加至优质供应商</th>
              <th @click="deleteUser(user)" class="delete_button">删除</th>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
  data: function() {
    var users = [
      {name: "Tiger Nixon",
       username: "System Architect",
       authenticated: true,
       ad: true,
       selected: true
      },
      {
        name: "Garrett Winters",
        username: "Director",
       authenticated:false,
       ad: false,
       selected: false
      }
    ];
    return {
      users: users
    }
  },
  methods: {
    authenticate: function(user) {
    },
    deAuthenticate: function(user) {
    },
    ad: function(user) {
    },
    deAd: function(user) {
    },
    select: function(user) {
    },
    deSelect: function(user) {
    },
    deleteUser: function(user) {
    }
  },
  mounted: function() {
    $('#userlist').DataTable({
    });
  },
}
</script>

<style lang="scss">
#userlist tbody th {
  font-weight: 400;
}
.delete_button {
  color: #449cd7;
  cursor: pointer;
}
</style>
