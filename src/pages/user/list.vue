<template>
	<el-card shadow="never">
		<Search :model="searchForm" @search="getData" @reset="resetSearchForm">
			<SearchItem label="Keyword">
				<el-input v-model="searchForm.title" clearable class="w-[150px]" placeholder="phone/email/nickname"></el-input>
			</SearchItem>
			<template #show>
				<SearchItem label="UserLevel">
					<el-select v-model="searchForm.user_level_id" placeholder="Select Level" clearable>
						<el-option v-for="item in userLevelList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</SearchItem>
			</template>
		</Search>

		<ListHeader @create="handleCreate" @refresh="getData" />

		<el-table :data="tableData" stripe style="width: 100%" v-loading="loading" l>
			<el-table-column label="User" width="200">
				<template #default="{ row }">
					<div class="flex items-center">
						<el-avatar :size="40" :src="row.avatar">
							<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
						</el-avatar>
						<div class="ml-3">
							<h6>{{ row.username }}</h6>
							<p>ID: {{ row.id }}</p>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="Level" align="center">
				<template #default="{ row }">
					{{ row.user_level?.name || '-' }}
				</template>
			</el-table-column>
			<el-table-column label="Register/Login" align="center">
				<template #default="{ row }">
					<p v-if="row.last_login_time">最后登录{{ row.last_login_time }}</p>
					<p>注册时间：{{ row.create_time }}</p>
				</template>
			</el-table-column>
			<el-table-column label="Status" width="120">
				<template #default="{ row }">
					<el-switch :modelValue="row.status" :disabled="row.super === 1" :loading="row.statusLoading" :active-value="1"
						:inactive-value="0" @change="handleUpdateStatus($event, row)" />
				</template>
			</el-table-column>
			<el-table-column label="Operations">
				<template #default="scope">
					<small v-if="scope.row.super === 1">No Operations</small>
					<div v-else>
						<el-button size="small" type="primary" @click="handleEdit(scope.row)" text>Edit</el-button>
						<el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row.id)">
							<template #reference>
								<el-button size="small" text type="danger">Delete
								</el-button>
							</template>
						</el-popconfirm>
					</div>
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
				<el-form-item label="Username" prop="username">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="Nickname" prop="nickname">
					<el-input v-model="form.nickname"></el-input>
				</el-form-item>
				<el-form-item label="Phone" prop="phone">
					<el-input v-model="form.phone"></el-input>
				</el-form-item>
				<el-form-item label="Email" prop="email">
					<el-input v-model="form.email"></el-input>
				</el-form-item>
				<el-form-item label="Password" prop="password">
					<el-input v-model="form.password"></el-input>
				</el-form-item>
				<el-form-item label="Avatar" prop="avatar">
					<ChooseImage v-model="form.avatar" />
				</el-form-item>
				<el-form-item label="Level" prop="user_level_id">
					<el-select v-model="form.user_level_id" value-key="id" placeholder="Select Level">
						<el-option v-for="item in userLevelList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>

				</el-form-item>
				<el-form-item label="status" prop="status">
					<el-switch v-model="form.status" :active-value="1" :inactive-value="0">
					</el-switch>
				</el-form-item>

			</el-form>

		</form-drawer>
	</el-card>

</template>

<script>
export default {
	name: 'UserList'
}
</script>
<script setup>
import { ref } from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';
import ChooseImage from '~/components/ChooseImage.vue';
import ListHeader from '~/components/ListHeader.vue';
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';
import { getUserList, updateStatus, createUser, updateUser, deleteUser } from '~/api/user';
import { useInitTable, useInitForm } from '~/composables/useCommon'
const userLevelList = ref([])
const { searchForm,
	resetSearchForm,
	tableData,
	loading,
	currentPage,
	total,
	limit,
	getData,
	handleDelete
} = useInitTable({
	searchForm: {
		keyword: ""
	},
	getList: getUserList,
	delete: deleteUser,
	onGetListSuccess(res) {
		total.value = res.totalCount;
		tableData.value = res.list.map((item) => {
			item.statusLoading = false;
			return item;
		});
		userLevelList.value = res.user_level;
	}
})
const { formDrawerRef,
	formRef,
	form,
	rules,
	handleCreate,
	drawerTitle,
	handleEdit,
	handleSubmit, } = useInitForm({
		form: {
			username: "",
			password: "",
			status: 1,
			nickname: "",
			phone: "",
			email: "",
			user_level_id: null,
			avatar: ""
		},
		getData,
		currentPage,
		update: updateUser,
		create: createUser,
		delete: deleteUser,
		updateStatus
	})



</script>

<style scoped lang='scss'>

</style>