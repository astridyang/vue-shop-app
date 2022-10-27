<template>
	<el-card shadow="never">
		<ListHeader @create="handleCreate" @refresh="getData"/>
		<el-table :data="tableData" stripe style="width: 100%" v-loading="loading" l>
			<el-table-column prop="name" label="Role name"/>
			<el-table-column prop="desc" label="Role Desc" width="180"/>
			<el-table-column label="Status">
				<template #default="{row}">
					<el-switch :modelValue="row.status" :loading="row.statusLoading" :active-value="1"
					           :inactive-value="0" @change="handleUpdateStatus($event, row)"/>
				</template>
			</el-table-column>
			<el-table-column label="Operations">
				<template #default="scope">
					<el-button size="small" type="primary" @click="openConfigRule(scope.row)" text>Config Rule</el-button>
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
				<el-form-item label="Name" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="Desc" prop="desc">
					<el-input v-model="form.desc" type="textarea" :rows="5"></el-input>
				</el-form-item>
				<el-form-item label="Status" prop="content">
					<el-switch v-model="form.status" :active-value="1"
					           :inactive-value="0"/>
				</el-form-item>

			</el-form>
		</form-drawer>
		<form-drawer ref="configDrawerRef" title="Config Rule" @submit="handleConfigSubmit">
			<el-tree-v2 ref="elTreeRef" node-key="id" :check-strictly="checkStrictly"
			            :default-expanded-keys="defaultExpandedKeys" :data="ruleList"
			            :props="{children: 'child', label: 'name'}" show-checkbox :height="treeHeight"
			            @check="handleTreeCheck">
				<template #default="{ node,data }">
					<el-tag :type="data.menu?'':'info'" size="small">{{ data.menu ? 'Menu' : 'Rule' }}</el-tag>
					<span class="ml-2 text-sm">{{ data.name }}</span>
				</template>
			</el-tree-v2>
		</form-drawer>
	</el-card>

</template>
<script>
export default {
	name: "RoleList"
}
</script>
<script setup>
import {createRole, getRoleList, updateRole, deleteRole, updateRoleStatus, setRoleRules} from '~/api/role'
import FormDrawer from '~/components/FormDrawer.vue';
import ListHeader from '~/components/ListHeader.vue';
import {useInitTable, useInitForm} from '~/composables/useCommon'
import {ref} from "vue";
import {getRuleList} from "~/api/rule";
import {toast} from "~/composables/util";

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
	getList: getRoleList,
	updateStatus: updateRoleStatus,
	delete: deleteRole
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
		desc: "",
		status: 1
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
	update: updateRole,
	create: createRole,
})
const configDrawerRef = ref(null)
const roleId = ref(0)
const ruleList = ref([])
const treeHeight = ref(0)
const elTreeRef = ref(null)
const defaultExpandedKeys = ref([])
const ruleIds = ref([])
const checkStrictly = ref(false)

function openConfigRule(row) {
	treeHeight.value = window.innerHeight - 180
	roleId.value = row.id
	checkStrictly.value = true
	getRuleList(1).then(res => {
		ruleList.value = res.list;
		defaultExpandedKeys.value = res.list.map(o => o.id)
		configDrawerRef.value.open();
		ruleIds.value = row.rules.map(o => o.id)
		setTimeout(() => {
			elTreeRef.value.setCheckedKeys(ruleIds.value)
			checkStrictly.value = false
		}, 150)
	})
}


function handleConfigSubmit() {
	configDrawerRef.value.showLoading()
	setRoleRules(roleId.value, ruleIds.value).then((res) => {
		toast("Config success")
		configDrawerRef.value.close()
		getData()
	}).finally(() => {
		configDrawerRef.value.hideLoading()
	})

}

function handleTreeCheck(...e) {
	const {checkedKeys, halfCheckedKeys} = e[1]
	ruleIds.value = [...checkedKeys, ...halfCheckedKeys]
}
</script>

<style scoped lang='scss'>

</style>