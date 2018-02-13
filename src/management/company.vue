<template>
    <div>
        <h3>公司列表</h3>
        <!--span><a class="new_company" @click="newCompany">新增</a></span-->
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
</template>

<script>
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
    /*
    newCompany: function() {
      this.$emit("newCompany");
    },
    */
    deleteUser: function() {
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
  cursor: pointer;
}
.new_company { background:#e2f5ff; border:1px solid #c8eafa; border-radius:0.2em; font-size:13px; line-height:26px; text-align:center; color:#3d9ccc; padding:0 10px;}
</style>
