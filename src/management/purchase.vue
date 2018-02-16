<template>
    <div>
        <h3>采购项目管理</h3>
        <table id="purchaselist">
          <thead>
             <tr>
                <th>采购项目名称</th>
                <th>发布人</th>
                <th>发布人电话</th>
                <th>采购公司</th>
                <th>采购类型</th>
                <th>采购有效期</th>
				<th>发布时间</th>
				<th>注册用户</th>
                <th>操作</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="purchase in purchases">
			  <th class="delete_button" @click="purchaseApplication(purchase)">{{purchase.product}}</th>
			  <th>{{purchase.name}}</th>
			  <th>{{purchase.phone}}</th>
			  <th>{{purchase.company}}</th>
			  <th>{{purchase.type}}</th>
			  <th>{{purchase.expire}}</th>
			  <th>{{purchase.create}}</th>
			  <th>{{purchase.username}}</th>
              <th @click="deletePurchase(purchase)" class="delete_button">删除</th>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
  data: function() {
    var purchases = [
	  {
        name: "Tiger Nixon",
        product: "System Architect",
        company: "Edinburgh",
        expire: "5421",
        create: "2011/04/25",
        type: "$3,120"
	  },
	  {
        name: "Garrett Winters",
        product: "Director",
        company: "Edinburgh",
        expire: "8422",
        create: "2011/07/25",
        type: "$5,300"
	  }
    ];
    return {
      purchases: purchases 
    }
  },
  methods: {
    deletePurchase: function(purchase) {
    },
    purchaseApplication: function(purchase) {
      this.$emit("purchaseApplication", purchase);
    }
  },
  mounted: function() {
    $('#purchaselist').DataTable({
    });
  },
}
</script>

<style lang="scss">
#purchaselist tbody th {
  font-weight: 400;
}
.delete_button {
  cursor: pointer;
}
</style>
