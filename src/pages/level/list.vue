<template>
	<el-card shadow="never">
		<ListHeader @create="handleCreate" @refresh="getData" />
		<el-table :data="tableData" stripe style="width: 100%" v-loading="loading" l>
			<el-table-column prop="name" label="UserLevel" />
			<el-table-column prop="discount" label="Discount" />
			<el-table-column prop="level" label="Level" />
			<el-table-column label="Status">
				<template #default="{ row }">
					<el-switch :modelValue="row.status" :loading="row.statusLoading" :active-value="1" :inactive-value="0"
						@change="handleUpdateStatus($event, row)" />
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

		<form-drawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
			<el-form :model="form" ref="formRef" :rules="rules" label-width="120px" :inline="false">
				<el-form-item label="Name" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="Level Weight" prop="level">
					<el-input v-model="form.level"></el-input>
				</el-form-item>
				<el-form-item label="Status" prop="status">
					<el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
				</el-form-item>
				<el-form-item label="Up Condition">
					<div>
						<small class="text-sm mr-2">累计消费满</small>
						<el-input v-model="form.max_price" type="number" style="width:50%;">
							<template #append>RMB</template>
						</el-input>
						<small class="text-gray-400 flex">设置会员等级所需要累计消费金额</small>
					</div>
					<div>
						<small class="text-sm mr-2">累计次数</small>
						<el-input v-model="form.max_times" type="number" style="width:50%;">
							<template #append>times</template>
						</el-input>
						<small class="text-gray-400 flex">设置会员等级所需要累计消费次数</small>
					</div>
				</el-form-item>
				<el-form-item label="Discount" prop="discount">
					<div>
						<el-input v-model="form.discount" type="number" style="width:50%;">
							<template #append>%</template>
						</el-input>
						<small class="text-gray-400 flex">百分比</small>
					</div>
				</el-form-item>
			</el-form>
		</form-drawer>

	</el-card>

</template>
<script>
export default {
	name: "UserLevelList"
}
</script>
<script setup>
import { createUserLevel, getUserLevelList, updateUserLevel, deleteUserLevel, updateUserLevelStatus } from '~/api/level'
import FormDrawer from '~/components/FormDrawer.vue';
import ListHeader from '~/components/ListHeader.vue';
import { useInitTable, useInitForm } from '~/composables/useCommon'

const {
	tableData,
	loading,
	currentPage,
	total,
	limit,
	getData,
	handleUpdateStatus,
	handleDelete
} = useInitTable({
	getList: getUserLevelList,
	updateStatus: updateUserLevelStatus,
	delete: deleteUserLevel
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
		level: 0,
		status: 1,
		discount: 0,
		max_price: 0,
		max_times: 0
	},
	rules: {
		name: [{
			required: true,
			message: "name can't be empty",
			trigger: "blur",
		}],
	},
	getData,
	currentPage,
	update: updateUserLevel,
	create: createUserLevel,
})



</script>

<style scoped lang='scss'>

</style>