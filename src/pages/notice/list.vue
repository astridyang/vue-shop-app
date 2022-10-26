<template>
	<el-card shadow="never">
		<ListHeader @create="handleCreate" @refresh="getData"/>
		<el-table :data="tableData" stripe style="width: 100%" v-loading="loading" l>
			<el-table-column prop="title" label="Title" />
			<el-table-column prop="create_time" label="Create Time" width="380" />
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
			<el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
				<el-form-item label="Title" prop="title">
					<el-input v-model="form.title"></el-input>
				</el-form-item>
				<el-form-item label="Content" prop="content">
					<el-input v-model="form.content" type="textarea" :rows="5"></el-input>
				</el-form-item>
			</el-form>
		</form-drawer>
	</el-card>

</template>
<script>
export default {
	name: "NoticeList"
}
</script>
<script setup>
import { createNotice, getNoticeList, updateNotice, deleteNotice } from '~/api/notice'
import FormDrawer from '~/components/FormDrawer.vue';
import ListHeader from '~/components/ListHeader.vue';
import { useInitTable, useInitForm } from '~/composables/useCommon'
const {
	tableData,
	loading,
	currentPage,
	total,
	limit,
	getData } = useInitTable({
		getList: getNoticeList
	})
const { formDrawerRef,
	formRef,
	form,
	rules,
	handleCreate,
	drawerTitle,
	handleEdit,
	handleSubmit, 
	handleDelete
} = useInitForm({
		form: {
			title: "",
			content: ""
		},
		rules: {
			title: [{
				required: true,
				message: "title can't be empty",
				trigger: "blur",
			}],
			content: [
				{
					required: true,
					message: "content can't be empty",
					trigger: "blur",
				}
			]
		},
		getData,
		currentPage,
		update: updateNotice,
		create: createNotice,
		delete: deleteNotice
	})

</script>

<style scoped lang='scss'>

</style>