<template>
    <div>
        <h3>{{activity.name}}</h3>
        <table id="activity_applicationlist">
          <thead>
             <tr>
                <th>报名人</th>
                <th>报名人公司</th>
                <th>报名人职位</th>
                <th>报名人邮箱</th>
                <th>报名人电话</th>
                <th>报名人留言</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="application in applications">
              <th>{{application.name}}</th>
              <th>{{application.company}}</th>
              <th>{{application.position}}</th>
              <th>{{application.email}}</th>
              <th>{{application.phone}}</th>
              <th>{{application.comment}}</th>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
  props: ['activity'],
  data: function() {
    var applications = [
    {
        name: "Tiger Nixon",
		company: "bb",
		position: "cc",
        email: "主机",
        phone: "2011/04/25",
		comment: "dd"
    },
    {
        name: "Garrett Winters",
		company: "BB",
		position: "CC",
        email: "2011/07/25",
        phone: "采购",
		comment: "dd"
    }
    ];
    return {
      applications: applications 
    }
  },
  methods: {
  },
  mounted: function() {
    $('#activity_applicationlist').DataTable({
    });
  },
}
</script>

<style lang="scss">
#activity_applicationlist tbody th {
  font-weight: 400;
}
.delete_button {
  cursor: pointer;
}
.new_company { background:#e2f5ff; border:1px solid #c8eafa; border-radius:0.2em; font-size:13px; line-height:26px; text-align:center; color:#3d9ccc; padding:0 10px;}
</style>
