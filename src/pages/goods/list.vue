<template>
	<div>
		<el-tabs v-model="searchForm.tab" @tab-change="getData">
			<el-tab-pane :label="item.name" :name="item.key" v-for="(item, index) in tabBars" :key="index"></el-tab-pane>

		</el-tabs>
		<el-card shadow="never">
			<Search :model="searchForm" @search="getData" @reset="resetSearchForm">
				<SearchItem label="Title">
					<el-input v-model="searchForm.title" clearable class="w-[150px]"></el-input>
				</SearchItem>
				<template #show>
					<SearchItem label="Category">
						<el-select v-model="searchForm.category_id" placeholder="Select Category" clearable>
							<el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</SearchItem>
				</template>
			</Search>

			<ListHeader @create="handleCreate" @refresh="getData" layout="create,refresh">
				<el-button size="small" @click="handleMultiDelete" v-if="searchForm.tab !== 'delete'">Multi delete
				</el-button>
				<el-button size="small" type="warning" @click="handleRestoreGoods" v-if="searchForm.tab === 'delete'">Multi
					Restore
				</el-button>
				<el-popconfirm v-if="searchForm.tab === 'delete'" title="Are you sure to delete this?"
					@confirm="handleMultiDestroy">
					<template #reference>
						<el-button size="small" type="danger">Multi Destroy
						</el-button>
					</template>
				</el-popconfirm>
				<el-button size="small" @click="handleMultiUpdateStatus(1)"
					v-if="searchForm.tab === 'all' || searchForm.tab === 'off'">上架
				</el-button>
				<el-button size="small" @click="handleMultiUpdateStatus(0)"
					v-if="searchForm.tab === 'all' || searchForm.tab === 'saling'">下架
				</el-button>

			</ListHeader>

			<el-table :data="tableData" stripe style="width: 100%" v-loading="loading"
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column label="Goods" width="300">
					<template #default="{ row }">
						<div class="flex">
							<el-image :src="row.cover" fit="cover" class="rounded mr-3" style="width:50px;height:50px"></el-image>
							<div class="flex-1">
								<p>{{ row.title }}</p>
								<div>
									<span class="text-rose-500">￥{{ row.min_price }}</span>
									<el-divider direction="vertical"></el-divider>
									<span class="text-gray-500 text-sm">{{ row.min_oprice }}</span>
								</div>
								<p class="text-gray-400 text-xs mb-1">Catogory: {{ row.category ? row.category.name : "unCategory" }}
								</p>
								<p class="text-gray-400 text-xs">Create Time: {{ row.create_time }}</p>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="Sale" prop="sale_count" align="center" width="90">
				</el-table-column>
				<el-table-column label="Status" width="120">
					<template #default="{ row }">
						<el-tag :type="row.status ? 'success' : 'info'" size="small">{{ row.status === 1 ? 'onSale' : 'Off' }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="Check" width="120" v-if="searchForm.tab !== 'delete'">
					<template #default="{ row }">
						<div v-if="row.ischeck === 0">
							<el-button type="success" size="small" plain>Pass</el-button>
							<el-button class="!ml-0 mt-2" type="danger" size="small" plain>Reject</el-button>
						</div>
						<span v-else>{{ row.ischeck === 1 ? 'Passed' : 'Rejected' }}</span>
					</template>
				</el-table-column>
				<el-table-column label="Stock" prop="stock" align="center" width="90"></el-table-column>
				<el-table-column label="Operations">
					<template #default="scope">
						<div v-if="searchForm.tab !== 'delete'">
							<el-button size="small" class="px-1" type="primary" @click="handleEdit(scope.row)" text>Edit</el-button>
							<el-button size="small" class="px-1" :type="(scope.row.sku_type === 0 && !scope.row.sku_value) || (scope.row.sku_type === 1 && !scope.row.goods_skus
							.length) ? 'danger' : 'primary'" text @click="handleSetSkus(scope.row)" :loading="scope.row.skusLoading">Sku
							</el-button>
							<el-button size="small" class="px-1" :type="scope.row.goods_banner.length ? 'primary' : 'danger'" text
								@click="handleSetBanners(scope.row)" :loading="scope.row.bannerLoading">SetBanners
							</el-button>
							<el-button size="small" class="px-1" :type="scope.row.content ? 'primary' : 'danger'" text
								@click="handleSetContent(scope.row)">Detail
							</el-button>
							<el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete([scope.row.id])">
								<template #reference>
									<el-button size="small" text type="danger">Delete
									</el-button>
								</template>
							</el-popconfirm>
						</div>
						<span v-else>No Operation</span>
					</template>
				</el-table-column>
			</el-table>

			<div class="flex items-center justify-center mt-5">
				<el-pagination @current-change="getData" :current-page="currentPage" :page-size="limit"
					layout=" prev,pager, next" background :total="total">
				</el-pagination>
			</div>

			<form-drawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
				<el-form :model="form" ref="formRef" :rules="rules" label-width="90px" :inline="false">
					<el-form-item label="title" prop="title">
						<el-input v-model="form.title"></el-input>
					</el-form-item>
					<el-form-item label="cover" prop="cover">
						<ChooseImage v-model="form.cover" />
					</el-form-item>
					<el-form-item label="desc" prop="desc">
						<el-input v-model="form.desc" type="textarea" rows="5"></el-input>
					</el-form-item>
					<el-form-item label="unit" prop="unit">
						<el-input v-model="form.unit"></el-input>
					</el-form-item>
					<el-form-item label="min_price" prop="min_price">
						<el-input v-model="form.min_price" type="number">
							<template #append>元</template>
						</el-input>
					</el-form-item>
					<el-form-item label="min_oprice" prop="min_oprice">
						<el-input v-model="form.min_oprice" type="number">
							<template #append>元</template>
						</el-input>
					</el-form-item>
					<el-form-item label="stock" prop="stock">
						<el-input v-model="form.stock">
							<template #append>{{ form.unit || '件' }}</template>
						</el-input>
					</el-form-item>
					<el-form-item label="min_stock" prop="min_stock">
						<el-input v-model="form.min_stock">
							<template #append>{{ form.unit || '件' }}</template>
						</el-input>
					</el-form-item>
					<el-form-item label="status" prop="status">
						<el-radio-group v-model="form.status">
							<el-radio :label="0">inStock</el-radio>
							<el-radio :label="1">onSale</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="stock_display" prop="stock_display">
						<el-radio-group v-model="form.stock_display">
							<el-radio :label="0">Hide</el-radio>
							<el-radio :label="1">Show</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="Category" prop="category_id">
						<el-select v-model="form.category_id" value-key="id" placeholder="Select Category">
							<el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>

				</el-form>

			</form-drawer>
		</el-card>
		<goods-banners ref="bannerRef" @reload-data="getData" />
		<content ref="contentRef" @reload-data="getData" />
		<skus ref="skusRef" @reload-data="getData" />
	</div>
</template>

<script>
export default {
	components: { goodsBanners, content },
	name: 'GoodsList'
}
</script>
<script setup>
import { ref } from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';
import ChooseImage from '~/components/ChooseImage.vue';
import ListHeader from '~/components/ListHeader.vue';
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';
import {
	getGoodsList,
	updateStatus,
	createGoods,
	updateGoods,
	deleteGoods,
	restoreGoods,
	destroyGoods
} from '~/api/goods';
import { getCategoryList } from '~/api/category'
import { useInitTable, useInitForm } from '~/composables/useCommon'
import goodsBanners from "~/pages/goods/goodsBanners.vue";
import content from "~/pages/goods/content.vue";
import skus from "~/pages/goods/skus.vue";
import { toast } from "~/composables/util";

const {
	searchForm,
	resetSearchForm,
	tableData,
	loading,
	currentPage,
	total,
	limit,
	getData,
	handleDelete,
	handleSelectionChange,
	handleMultiDelete,
	handleMultiUpdateStatus,
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
		tableData.value = res.list.map((item) => {
			item.bannerLoading = false;
			item.contentLoading = false;
			item.skusLoading = false;
			return item;
		});

	}
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
		"title": "", //商品名称
		"category_id": null, //商品分类
		"cover": null, //商品封面
		"desc": "", //商品描述
		"unit": "件", //商品单位
		"stock": 100, //总库存
		"min_stock": 10, //库存预警
		"status": 1, //是否上架 0仓库1上架
		"stock_display": 1, //库存显示 0隐藏1显示
		"min_price": 0, //最低销售价
		"min_oprice": 0 //最低原价
	},
	getData,
	currentPage,
	update: updateGoods,
	create: createGoods,
	delete: deleteGoods,
	updateStatus
})

const tabBars = [
	{
		key: "all",
		name: "全部"
	},
	{
		key: "checking",
		name: "审核中"
	},
	{
		key: "saling",
		name: "出售中"
	},
	{
		key: "off",
		name: "已下架"
	},
	{
		key: "min_stock",
		name: "库存预警"
	},
	{
		key: "delete",
		name: "回收站"
	},
]
const categoryList = ref([])
getCategoryList().then(res => categoryList.value = res)
const showSearch = ref(false)
const bannerRef = ref(null)
const handleSetBanners = (row) => {
	bannerRef.value.open(row)
}
const contentRef = ref(null)
const handleSetContent = (row) => {
	contentRef.value.open(row)
}
const skusRef = ref(null)
const handleSetSkus = (row) => {
	skusRef.value.open(row)
}
const handleRestoreGoods = () => handleMultiAction(restoreGoods, "Restore");
const handleMultiDestroy = () => handleMultiAction(destroyGoods, "Destroy");

function handleMultiAction(func, msg) {
	loading.value = true
	func(selectIds.value).then(res => {
		toast(msg + " success")
		if (tableRef.value) {
			tableRef.value.clearSelection()
		}
		getData();
	}).finally(() => {
		loading.value = false
	})
}

</script>

<style scoped lang='scss'>

</style>