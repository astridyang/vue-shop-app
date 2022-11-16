<template>
	<div>
		<el-tabs v-model="searchForm.tab" @tab-change="getData">
			<el-tab-pane :label="item.name" :name="item.key" v-for="(item, index) in tabBars" :key="index"></el-tab-pane>

		</el-tabs>
		<el-card shadow="never">
			<Search :model="searchForm" @search="getData" @reset="resetSearchForm">
				<SearchItem label="No.">
					<el-input v-model="searchForm.no" clearable class="w-[220px]"></el-input>
				</SearchItem>
				<template #show>
					<SearchItem label="收货人">
						<el-input v-model="searchForm.name" clearable class="w-[220px]"></el-input>
					</SearchItem>
					<SearchItem label="Phone">
						<el-input v-model="searchForm.phone" clearable class="w-[220px]"></el-input>
					</SearchItem>
					<SearchItem label="Start Time">
						<el-date-picker v-model="searchForm.starttime" type="date" placeholder="Pick a day" :size="size"
							value-format="YYYY-MM-DD" />
					</SearchItem>
					<SearchItem label="End Time">
						<el-date-picker v-model="searchForm.endtime" type="date" placeholder="Pick a day" :size="size"
							value-format="YYYY-MM-DD" />
					</SearchItem>
				</template>
			</Search>

			<ListHeader layout="refresh,download" @refresh="getData" @download="handleExportExcel">
				<el-button size="small" @click="handleMultiDelete" v-if="searchForm.tab !== 'delete'">Multi delete
				</el-button>
			</ListHeader>

			<el-table :data="tableData" stripe style="width: 100%" v-loading="loading"
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column label="Goods" width="400">
					<template #default="{ row }">
						<div class="flex">
							<div>
								<p>Order No.</p>
								<small>{{ row.no }}</small>
							</div>
							<div class="ml-6">
								<p>Order Time</p>
								<small class="text-sm text-gray-500">{{ row.create_time }}</small>
							</div>
						</div>
						<div v-for="(item, index) in row.order_items" class="flex mt-2">
							<el-image class="mr-2" :src="item.goods_item ? item.goods_item.cover : ''" style="width:50px;height:50px;"
								fit="cover" :lazy="true"></el-image>
							<p>{{ item.goods_item ? item.goods_item.title : "Goods has been deleted" }}</p>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="Pay Amount" prop="total_price" align="center" width="90">
				</el-table-column>
				<el-table-column label="Buyer" width="120">
					<template #default="{ row }">
						<p>{{ row.user.nickname || row.user.username }}</p>
						<p>(UserId: {{ row.user.id }})</p>
					</template>
				</el-table-column>
				<el-table-column label="Status" width="200">
					<template #default="{ row }">
						<p>付款状态:
							<el-tag type="success" size="small" v-if="row.payment_method">{{ row.payment_method }}</el-tag>
							<el-tag type="info" size="small" v-else>unpaid</el-tag>
						</p>
						<p>发货状态:
							<el-tag type="success" size="small" v-if="row.ship_data">shiped</el-tag>
							<el-tag type="info" size="small" v-else>unShip</el-tag>
						</p>
						<p>收货状态:
							<el-tag type="success" size="small" v-if="row.ship_status === 'received'">received</el-tag>
							<el-tag type="info" size="small" v-else>pending</el-tag>
						</p>
					</template>
				</el-table-column>
				<el-table-column label="Operations">
					<template #default="scope">
						<el-button size="small" class="px-1" type="primary" @click="openInfo(scope.row)" text>Order Detail
						</el-button>
						<el-button v-if="searchForm.tab === 'noship'" size="small" class="px-1" type="primary"
							@click="handleEdit(scope.row)" text>Ship Order</el-button>
						<el-button v-if="searchForm.tab === 'refunding'" size="small" class="px-1" type="primary"
							@click="handleRefund(scope.row.id, 1)" text>Accept Refund</el-button>
						<el-button v-if="searchForm.tab === 'refunding'" size="small" class="px-1" type="primary"
							@click="handleRefund(scope.row.id, 0)" text>Deny Refund</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div class="flex items-center justify-center mt-5">
				<el-pagination @current-change="getData" :current-page="currentPage" :page-size="limit"
					layout=" prev,pager, next" background :total="total">
				</el-pagination>
			</div>

		</el-card>
		<ExportExcel ref="ExportExcelRef" :tabs="tabBars" />
		<InfoModal ref="InfoModalRef" />
	</div>
</template>

<script>
export default {
	name: 'OrderList'
}
</script>
<script setup>
import { ref } from 'vue';
import ListHeader from '~/components/ListHeader.vue';
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';
import ExportExcel from './ExportExcel.vue';
import InfoModal from './InfoModal.vue';
import {
	getOrderList,
	deleteOrder,
	refundOrder
} from '~/api/order';

import { useInitTable } from '~/composables/useCommon'

import { toast, showModel, showPrompt } from "~/composables/util";

const {
	searchForm,
	resetSearchForm,
	tableData,
	loading,
	currentPage,
	total,
	limit,
	getData,
	handleSelectionChange,
	handleMultiDelete,
	selectIds,
	tableRef
} = useInitTable({
	searchForm: {
		no: "",
		tab: "all",
		starttime: '',
		endtime: "",
		name: "",
		phone: ""
	},
	getList: getOrderList,
	delete: deleteOrder,
	onGetListSuccess(res) {
		total.value = res.totalCount;
		tableData.value = res.list.map((item) => {
			item.bannerLoading = false;
			item.contentLoading = false;
			item.skusLoading = false;
			return item;
		});

	}
})

const tabBars = [
	{
		key: "all",
		name: "全部"
	},
	{
		key: "nopay",
		name: "待支付"
	},
	{
		key: "noship",
		name: "待发货"
	},
	{
		key: "shiped",
		name: "待收货"
	},
	{
		key: "received",
		name: "已收货"
	},
	{
		key: "finish",
		name: "已完成"
	},
	{
		key: "closed",
		name: "已关闭"
	},
	{
		key: "refunding",
		name: "退款中"
	},
]
const ExportExcelRef = ref(null)
const handleExportExcel = () => {
	ExportExcelRef.value.open()
}

const InfoModalRef = ref(null)
const openInfo = (row) => {
	InfoModalRef.value.open(row)
}

const handleRefund = (id, agree) => {
	(agree ? showModel("accept this refund?") : showPrompt("reject this refund?")).then(({ value }) => {
		const data = { agree }
		if (value) {
			data.disagree_reason = value
		}
		refundOrder(id, data).then(res => {
			getData();
			toast("operate success.")
		})
	})
}
</script>

<style scoped lang='scss'>

</style>