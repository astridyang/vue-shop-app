<template>
	<FormDrawer ref="formDrawerRef" title="Category Goods" confirm-text="connect" @submit="handleConnect">
		<el-table :data="tableData" border stripe style="width: 100%">
			<el-table-column label="ID" prop="goods_id" width="60"/>
			<el-table-column label="Image" width="120">
				<template #default="{row}">
					<el-image :src="row.cover" fit="fill" style="width: 64px;height: 64px"/>
				</template>
			</el-table-column>
			<el-table-column label="Name" prop="name" width="220"/>
			<el-table-column label="Operation">
				<template #default="{row}">
					<el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(row)">
						<template #reference>
							<el-button text type="danger" size="small" :loading="row.loading">Delete</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
	</FormDrawer>
	<ChooseGoods ref="chooseGoodsRef"/>
</template>
<script>
export default {
	name: "CategoryGoods"
}
</script>
<script setup>
import FormDrawer from "~/components/FormDrawer.vue";
import {ref} from "vue";
import {getCategoryGoodsList, deleteCategoryGoods, connectCategoryGoods} from "~/api/category";
import {toast} from "~/composables/util";
import ChooseGoods from "~/components/ChooseGoods.vue";

const formDrawerRef = ref(null)
const categoryId = ref(0)
const tableData = ref([])

const open = (item) => {
	categoryId.value = item.id
	item.goodsDrawerLoading = true
	getData().then(() => {
		formDrawerRef.value.open()
	}).finally(() => {
		item.goodsDrawerLoading = false
	})
}

function getData() {
	return getCategoryGoodsList(categoryId.value).then(res => {
		tableData.value = res.map(o => {
			o.loading = false
			return o;
		})
	})
}

function handleDelete(item) {
	item.loading = true
	deleteCategoryGoods(item.id).then(() => {
		toast("delete success")
		getData()
	})
}

const chooseGoodsRef = ref(null)
const handleConnect = () => {
	formDrawerRef.value.showLoading()
	chooseGoodsRef.value.open((goods_ids) => {
		connectCategoryGoods({
			category_id: categoryId.value,
			goods_ids
		}).then(() => {
			toast("Connect Success")
			getData()
		}).finally(() => {
			formDrawerRef.value.hideLoading()
		})
	})
}

defineExpose({
	open
})
</script>

<style scoped lang='scss'>

</style>