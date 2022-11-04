<template>
	<div>
		<el-card shadow="never" class="border-0">
			<ListHeader @refresh="getData" @create="handleCreate"/>
			<el-tree :data="tableData" :props="{ children: 'child', label: 'name' }" node-key="id" v-loading="loading"
			>
				<template #default="{ node, data }">
					<div class="custom-tree-node">
						<span class="ml-2">{{ data.name }}</span>
						<div class="ml-auto">
							<el-button :loading="data.goodsDrawerLoading" type="primary" size="small" text @click="handleOpenDrawer(data)">Recommend</el-button>

							<el-switch :model-value="data.status" :active-value="1" :inactive-value="0"
							           @change="handleUpdateStatus($event,data)">
							</el-switch>
							<el-button type="primary" size="small" text @click="handleEdit(data)">Update</el-button>
							<span @click.stop="()=>{}">
							<el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(data.id)">
							<template #reference>
								<el-button size="small" text type="danger">Delete
								</el-button>
							</template>
						</el-popconfirm>
						</span>
						</div>
					</div>
				</template>
			</el-tree>
			<form-drawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
				<el-form :model="form" ref="formRef" label-width="120px" :inline="false">
					<el-form-item label="Name" prop="name">
						<el-input v-model="form.name" style="width:70%;"></el-input>
					</el-form-item>
				</el-form>
			</form-drawer>
		</el-card>
		<CategoryGoods ref="categoryGoodsRef"/>
	</div>
</template>

<script>
export default {
	name: 'CategoryList'
}
</script>
<script setup>
import {ref} from 'vue';
import ListHeader from '~/components/ListHeader.vue';
import FormDrawer from '~/components/FormDrawer.vue';
import {useInitTable, useInitForm} from '~/composables/useCommon';
import {createCategory, deleteCategory, updateCategory, updateCategoryStatus} from '~/api/category';
import {getCategoryList} from '~/api/category'
import CategoryGoods from "~/pages/category/components/CategoryGoods.vue";

const tableData = ref([])

const {loading, getData, currentPage, handleUpdateStatus, handleDelete} = useInitTable({
	getList: getCategoryList,
	onGetListSuccess(res) {
		tableData.value = res.map(o=>{
			o.goodsDrawerLoading = false
			return o
		})
	},
	updateStatus: updateCategoryStatus,
	delete: deleteCategory
})
const {
	formDrawerRef,
	formRef,
	form,
	handleCreate,
	drawerTitle,
	handleEdit,
	handleSubmit,
} = useInitForm({
	form: {
		name: "",
	},
	getData,
	currentPage,
	update: updateCategory,
	create: createCategory,
})

const categoryGoodsRef = ref(null)

function handleOpenDrawer(data) {
	categoryGoodsRef.value.open(data)
}
</script>

<style scoped>
:deep(.el-tree-node__label) {
	flex: 1;
}

.custom-tree-node {
	display: flex;
	align-items: center;
	font-size: 14px;
	padding-right: 8px;
}

:deep(.el-tree-node__content) {
	padding: 20px 0;
}
</style>