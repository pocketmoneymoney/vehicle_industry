<template>
    <div class="back_wrapper">
      <main-header></main-header>
      <div class="main clearfix">
        <h3>用户列表</h3>
        <table id="userlist">
          <thead>
             <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th data-class-name="priority">Salary</th>
                <th>操作</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="user in users">
              <th v-for = "attr in user">{{ attr }}
              </th>
              <th @click="deleteUser(user)" class="delete_button">删除</th>
            </tr>
          </tbody>
        </table>
      </div>
      <last-footer></last-footer>
    </div>
</template>

<script>
import TopBar from '../util/topbar.vue'
import MainHeader from '../util/header.vue'

import LastFooter from '../util/footer.vue'

export default {
  data: function() {
    var users = [
      [
        "Tiger Nixon",
        "System Architect",
        "Edinburgh",
        "5421",
        "2011/04/25",
        "$3,120"
      ],
      [
        "Garrett Winters",
        "Director",
        "Edinburgh",
        "8422",
        "2011/07/25",
        "$5,300"
      ]
    ];
    return {
      users: users
    }
  },
  methods: {
    deleteUser: function() {
    }
  },
  mounted: function() {
    $('#userlist').DataTable({
    });
  },
  components: {MainHeader, TopBar, LastFooter} 
}
</script>

<style lang="scss">
@import '../../css/rem.scss';

.back_wrapper{
  width: t(1200);
  background-color:#f9f9f8;
}
.main{
	width: 1200px;
	margin: 0 auto;
}

#userlist tbody th {
  font-weight: 400;
}
.delete_button {
  cursor: pointer;
}
</style>
