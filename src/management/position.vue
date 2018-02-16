<template>
    <div>
        <h3>职位列表</h3>
        <span><a class="new_company" @click="newPosition">发布职位</a></span>
        <table id="positionlist">
          <thead>
             <tr>
                <th>职位名称</th>
                <th>公司名称</th>
                <th>发布时间</th>
                <th>操作</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="position in positions">
              <th @click="positionApplication(position)" class="delete_button">{{position.name}}</th>
              <th>{{position.companyName}}</th>
              <th>{{position.time}}</th>
              <th @click="deletePosition(position)" class="delete_button">删除</th>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
  data: function() {
    var positions = [
    {
        name: "Tiger Nixon",
        companyName: "主机",
        time: "2011/04/25"
    },
    {
        name: "Garrett Winters",
        time: "2011/07/25",
        companyName: "采购"
    }
    ];
    return {
      positions: positions
    }
  },
  methods: {
    newPosition: function() {
      this.$emit("newPosition");
    },
    deletePosition: function(position) {
    },
    positionApplication: function(position) {
      this.$emit("positionApplication", position);
    }
  },
  mounted: function() {
    $('#positionlist').DataTable({
    });
  },
}
</script>

<style lang="scss">
#positionlist tbody th {
  font-weight: 400;
}
.delete_button {
  cursor: pointer;
}
.new_company { background:#e2f5ff; border:1px solid #c8eafa; border-radius:0.2em; font-size:13px; line-height:26px; text-align:center; color:#3d9ccc; padding:0 10px;}
</style>
