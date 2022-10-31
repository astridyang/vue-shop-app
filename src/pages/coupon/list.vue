<template>
	<el-card shadow="never">
		<ListHeader @create="handleCreate" @refresh="getData" />
		<el-table :data="tableData" stripe style="width: 100%" v-loading="loading" l>
			<el-table-column label="Name" width="350">
				<template #default="{ row }">
					<div class="border border-dashed py-2 px-4 rounded" :class="row.statusText === '领取中' ? 'active' : 'inative'">
						<h5 class=" font-bold text-md">{{ row.name }}</h5>
						<small>{{ row.start_time }}~{{ row.end_time }}</small>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="statusText" label="Status"></el-table-column>
			<el-table-column label="Type">
				<template #default="{ row }">
					<span>{{ row.type === 0 ? "满减" : "折扣" }} {{ row.type === 0 ? (`¥${row.value}`) : (`${row.value}折`) }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="total" label="Total"></el-table-column>
			<el-table-column prop="used" label="Used"></el-table-column>
			<el-table-column label="Operations">
				<template #default="scope">
					<el-button v-if="scope.row.statusText === '未开始'" size="small" type="primary" @click="handleEdit(scope.row)" text>Edit</el-button>
					<el-popconfirm v-if="scope.row.statusText !== '领取中'" title="Are you sure to delete this?" @confirm="handleDelete(scope.row.id)">
						<template #reference>
							<el-button size="small" text type="primary">Delete
							</el-button>
						</template>
					</el-popconfirm>
					<el-popconfirm v-if="scope.row.statusText === '领取中'" title="Are you sure to invalid this?" @confirm="handleUpdateStatus(0,scope.row)">
						<template #reference>
							<el-button size="small" type="danger">Invalid
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
				<el-form-item label="Type" prop="type">
					<el-radio-group v-model="form.type" @change="">
						<el-radio :label="0">
							Price-break
						</el-radio>
						<el-radio :label="1">
							Discount
						</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="Value" prop="value">
					<el-input v-model="form.value"><template #append>{{ form.type ? "Off" : "￥" }}</template></el-input>
				</el-form-item>
				<el-form-item label="Min price" prop="min_price">
					<el-input v-model="form.min_price" type="number"></el-input>
				</el-form-item>
				<el-form-item label="Total" prop="total">
					<el-input-number v-model="form.total" :min="1" :max="10000">
					</el-input-number>
				</el-form-item>
				<el-form-item label="Order" prop="order">
					<el-input-number v-model="form.order" :min="1" :max="1000">
					</el-input-number>
				</el-form-item>
				<el-form-item label="Time">
					<el-date-picker :editable="false" v-model="dateRange" value-format="YYYY-MM-DD HH:mm:ss" type="daterange" range-separator="To"
						start-placeholder="Start date" end-placeholder="End date" />
				</el-form-item>
				<el-form-item label="Desc" prop="desc">
					<el-input v-model="form.desc" type="textarea" :rows="5"></el-input>
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
import { computed } from 'vue';
import { createCoupon, getCouponList, updateCoupon, deleteCoupon, updateCouponStatus } from '~/api/coupon'
import FormDrawer from '~/components/FormDrawer.vue';
import ListHeader from '~/components/ListHeader.vue';
import { useInitTable, useInitForm } from '~/composables/useCommon'
function formatStatus(row) {
	let s = "领取中"
	const start = (new Date(row.start_time)).getTime()
	const now = (new Date()).getTime()
	const end = (new Date(row.end_time)).getTime()
	if (start > now) {
		s = "未开始"
	} else if (now > end) {
		s = "已结束"
	} else if (row.status === 0) {
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
	handleUpdateStatus,
	handleDelete,
	getData } = useInitTable({
		getList: getCouponList,
		onGetListSuccess(res) {
			tableData.value = res.list.map(o => {
				o.statusText = formatStatus(o);
				total.value = res.totalCount;
				return o
			})
		},
		updateStatus:updateCouponStatus,
		delete: deleteCoupon,
	})
const { formDrawerRef,
	formRef,
	form,
	rules,
	handleCreate,
	drawerTitle,
	handleEdit,
	handleSubmit
} = useInitForm({
	form: {
		name: "",
		type: 0,
		value: 0,
		min_price: 0,
		total: 100,
		order: 50,
		start_time: null,
		end_time: null,
		desc: ""
	},
	getData,
	currentPage,
	update: updateCoupon,
	create: createCoupon,
	onBeforeSubmit(f){
		if(f.start_time && typeof f.start_time !== 'number'){
			f.start_time = (new Date(f.start_time)).getTime()
		}
		if(f.end_time && typeof f.end_time !== 'number'){
			f.end_time = (new Date(f.end_time)).getTime()
		}
		return f
	}
})

const dateRange = computed({
	get() {
		return form.start_time && form.end_time ? [form.start_time, form.end_time] : []
	},
	set(val) {
		form.start_time = val[0]
		form.end_time = val[1]
	}
})

</script>

<style scoped>
.active {
	@apply border-rose-200 bg-rose-50 text-red-400;
}

.inactive {
	@apply border-gray-200 bg-gray-50 text-gray-400;
}
</style>