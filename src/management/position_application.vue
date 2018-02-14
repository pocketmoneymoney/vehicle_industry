<template>
    <div>
        <h3>{{position.name}}</h3>
        <table id="position_applicationlist">
          <thead>
             <tr>
                <th>申请人</th>
                <th>申请人邮箱</th>
                <th>申请人电话</th>
                <th>简历</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="application in applications">
              <th>{{application.name}}</th>
              <th>{{application.email}}</th>
              <th>{{application.phone}}</th>
              <th @click="deletePosition(position)" class="delete_button">删除</th>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
  props: ['position'],
  data: function() {
    var applications = [
    {
        name: "Tiger Nixon",
        email: "主机",
        phone: "2011/04/25"
    },
    {
        name: "Garrett Winters",
        email: "2011/07/25",
        phone: "采购"
    }
    ];
    return {
      applications: applications 
    }
  },
  methods: {
  },
  mounted: function() {
    $('#position_applicationlist').DataTable({
    });
  },
}
</script>

<style lang="scss">
#position_applicationlist tbody th {
  font-weight: 400;
}
.delete_button {
  cursor: pointer;
}
.new_company { background:#e2f5ff; border:1px solid #c8eafa; border-radius:0.2em; font-size:13px; line-height:26px; text-align:center; color:#3d9ccc; padding:0 10px;}
</style>
