<template>
	<el-card shadow="never">
		<ListHeader @create="handleCreate" @refresh="getData"/>
		<el-table :data="tableData" stripe style="width: 100%" v-loading="loading" l>
			<el-table-column label="Name" width="350">
				<template #default="{row}">
					<div class="border border-dashed py-2 px-4 rounded" :class="row.statusText==='领取中'?'active':'inative'">
						<h5 class=" font-bold text-md">{{row.name}}</h5>
						<small>{{row.start_time}}~{{row.end_time}}</small>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="statusText" label="Status"></el-table-column>
			<el-table-column label="Type">
				<template #default="{row}">
					<span>{{row.type?"满减":"折扣"}} {{row.type?(`¥${row.value}`):(`${row.value}折`)}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="total" label="Total"></el-table-column>
			<el-table-column prop="used" label="Used"></el-table-column>
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
	name: "CouponList"
}
</script>
<script setup>
import { createCoupon, getCouponList, updateCoupon, deleteCoupon } from '~/api/coupon'
import FormDrawer from '~/components/FormDrawer.vue';
import ListHeader from '~/components/ListHeader.vue';
import { useInitTable, useInitForm } from '~/composables/useCommon'
function formatStatus(row){
	let s = "领取中"
	const start = (new Date(row.start_time)).getTime()
	const now = (new Date()).getTime()
	const end = (new Date(row.end_time)).getTime()
	if(start>now){
		s = "未开始"
	}else if(now > end){
		s = "已结束"
	}else if(row.status === 0){
		s = "已失效"
	}
	return s
}
const {
	tableData,
	loading,
	currentPage,
	total,
	limit,
	getData } = useInitTable({
		getList: getCouponList,
		onGetListSuccess(res){
			tableData.value = res.list.map(o=>{
				o.statusText = formatStatus(o);
				total.value = res.totalCount;
				return o
			})
		}
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
		update: updateCoupon,
		create: createCoupon,
		delete: deleteCoupon
	})

</script>

<style scoped>
.active{
	@apply border-rose-200 bg-rose-50 text-red-400;
}
.inactive{
	@apply border-gray-200 bg-gray-50 text-gray-400;
}
</style>