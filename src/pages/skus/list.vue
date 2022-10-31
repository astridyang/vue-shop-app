<template>
	<el-card shadow="never">
		<ListHeader @create="handleCreate" @refresh="getData" layout="create,delete,refresh" @delete="handleMultiDelete"/>
		<el-table ref="tableRef" :data="tableData" stripe style="width: 100%" v-loading="loading"
		          @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"/>
			<el-table-column prop="name" label="Skus name"/>
			<el-table-column prop="default" label="Skus Value"/>
			<el-table-column label="Status">
				<template #default="{row}">
					<el-switch :modelValue="row.status" :loading="row.statusLoading" :active-value="1"
					           :inactive-value="0" @change="handleUpdateStatus($event, row)"/>
				</template>
			</el-table-column>
			<el-table-column label="Operations">
				<template #default="scope">
					<el-button size="small" type="primary" @click="handleEdit(scope.row)" text>Edit</el-button>
					<el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row.id)">
						<template #reference>
							<el-button size="small" text type="danger">Delete
							</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>

		<div class="flex items-center justify-center mt-5">
			<el-pagination @current-change="getData" :current-page="currentPage" :page-size="limit" layout=" prev,pager, next"
			               background :total="total">
			</el-pagination>
		</div>

		<form-drawer destroy-on-close ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
			<el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
				<el-form-item label="Name" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="Order" prop="order">
					<el-input-number :min="0" :max="1000" v-model="form.order"/>
				</el-form-item>
				<el-form-item label="Status" prop="content">
					<el-switch v-model="form.status" :active-value="1"
					           :inactive-value="0"/>
				</el-form-item>
				<el-form-item label="Value" prop="default">
					<TagInput v-model="form.default"/>
				</el-form-item>
			</el-form>
		</form-drawer>
	</el-card>

</template>
<script>
export default {
	name: "SkusList"
}
</script>
<script setup>
import {createSkus, getSkusList, updateSkus, deleteSkus, updateSkusStatus} from '~/api/skus'
import FormDrawer from '~/components/FormDrawer.vue';
import ListHeader from '~/components/ListHeader.vue';
import {useInitTable, useInitForm} from '~/composables/useCommon'
import {ref} from "vue";
import {toast} from "~/composables/util";
import TagInput from "~/components/TagInput.vue";
const {
	tableData,
	loading,
	currentPage,
	total,
	limit,
	getData,
	handleUpdateStatus,
	handleDelete,
	tableRef,
	handleSelectionChange,
	handleMultiDelete
} = useInitTable({
	getList: getSkusList,
	updateStatus: updateSkusStatus,
	delete: deleteSkus
})
const {
	formDrawerRef,
	formRef,
	form,
	rules,
	handleCreate,
	drawerTitle,
	handleEdit,
	handleSubmit,
} = useInitForm({
	form: {
		name: "",
		status: 1,
		default: "",
		order: 50,
	},
	rules: {
		name: [{
			required: true,
			message: "name can't be empty",
			trigger: "blur",
		}],
		default: [{
			required: true,
			message: "attr value can't be empty",
			trigger: "blur",
		}],
	},
	getData,
	currentPage,
	update: updateSkus,
	create: createSkus,
})

</script>

<style scoped lang='scss'>

</style>