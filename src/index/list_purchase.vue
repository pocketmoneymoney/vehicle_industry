<template>
  <div class="list_purchase">
    <ul>
      <li v-for="purchaseProduct in purchaseProducts"><a :href="purchaseEnrollUrl + purchaseProduct.id">{{ purchaseProduct.name }}</a></li>
    </ul>
  </div>
</template>

<script>
export default {
	data() {
		return {
			purchaseEnrollUrl: '/src/purchase/enroll.html?purchaseId=',
			purchaseProducts: [
			{
				id: 1,
				name: 'aaaaa'
			},
			{
				id: 2,
				name: 'aaaaa'
			},
			{
				id: 3,
				name: 'aaaaa'
			},
			{
				id: 4,
				name: 'aaaaa'
			}
			]
		}
	},
}
</script>

<style>
.list_purchase {
  padding: 5px 0;
}
.list_purchase ul {
padding: 0;
}
.list_purchase ul li {
  line-height: 24px;
}
</style>
