<template>
	<el-dialog title="Choose Goods" v-model="dialogVisible" width="80%">
		<el-table ref="tableRef" :data="tableData" stripe style="width: 100%" v-loading="loading"
		          @selection-change="handleSelectionChange" height="300px">
			<el-table-column type="selection" width="55"/>
			<el-table-column label="Goods" width="300">
				<template #default="{ row }">
					<div class="flex">
						<el-image :src="row.cover" fit="cover" class="rounded mr-3" style="width:50px;height:50px"></el-image>
						<div class="flex-1">
							<p>{{ row.title }}</p>
							<p class="text-gray-400 text-xs mb-1">Category: {{ row.category ? row.category.name : "unCategory" }}
							</p>
							<p class="text-gray-400 text-xs">Create Time: {{ row.create_time }}</p>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="Stock" prop="stock" align="center" width="90"></el-table-column>
			<el-table-column label="Sale" prop="sale_count" align="center" width="220">
				<template #default="{row}">
					<span class="text-rose-500">￥ {{ row.min_price }}</span>
					<el-divider direction="vertical"/>
					<span class="text-gray-500">￥ {{ row.min_oprice }}</span>
				</template>
			</el-table-column>
		</el-table>
		<div class="flex items-center justify-center mt-5">
			<el-pagination @current-change="getData" :current-page="currentPage" :page-size="limit"
			               layout=" prev,pager, next" background :total="total">
			</el-pagination>
		</div>
		<template #footer>
			<span>
				<el-button @click="close">Cancel</el-button>
				<el-button @click="submit" type="primary">Confirm</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script>
export default {
	name: "ChooseGoods"
}
</script>
<script setup>
import {ref} from "vue";
import {useInitTable} from "~/composables/useCommon";
import {deleteGoods, getGoodsList, updateStatus} from "~/api/goods";

const {
	searchForm,
	tableData,
	loading,
	currentPage,
	total,
	limit,
	getData,
	handleDelete,
	handleSelectionChange,
	selectIds,
	tableRef
} = useInitTable({
	searchForm: {
		title: "",
		tab: "all",
		category_id: null
	},
	getList: getGoodsList,
	updateStatus: updateStatus,
	delete: deleteGoods,
	onGetListSuccess(res) {
		total.value = res.totalCount;
		tableData.value = res.list
	}
})
const dialogVisible = ref(false)
const callbackFun = ref(null)
const open = (callback = null) => {
	callbackFun.value = callback
	dialogVisible.value = true
}
const close = () => dialogVisible.value = false
const submit = () => {
	callbackFun.value && callbackFun.value(selectIds.value)
	close()
	if (tableRef.value) {
		tableRef.value.clearSelection()
	}
}
defineExpose({
	open
})
</script>

<style scoped lang='scss'>

</style>