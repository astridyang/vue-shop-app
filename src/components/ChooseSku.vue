<template>
	<el-dialog top="5vh" width="80%" title="Choose Sku" v-model="dialogVisible">
		<el-container style="height: 65vh;">
			<el-aside width="220px" class="image-aside">
				<div class="top">
					<div class="sku-list" @click="handleChangeActiveId(item.id)" :class="{'active':(activeId===item.id)}"
					     v-for="(item,index) in tableData" :key="index">
						{{ item.name }}
					</div>
				</div>
				<div class="bottom">
					<el-pagination @current-change="getData" :current-page="currentPage" :page-size="limit" layout=" prev, next"
					               background :total="total">
					</el-pagination>
				</div>
			</el-aside>
			<el-main>
				<el-checkbox-group v-model="form.list">
					<el-checkbox v-for="item in list" :key="item" :label="item" border>{{ item }}</el-checkbox>
				</el-checkbox-group>
			</el-main>
		</el-container>
		<template #footer>
			<span>
				<el-button @click="dialogVisible = false">Cancel</el-button>
				<el-button @click="submit" type="primary">Ok</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script>
export default {
	name: "ChooseSku"
}
</script>
<script setup>
import {reactive, ref} from "vue";
import {getSkusList} from "~/api/skus";
import {useInitTable} from "~/composables/useCommon";

const activeId = ref(0)
const {
	loading,
	tableData,
	currentPage,
	limit,
	total,
	getData
} = useInitTable({
	getList: getSkusList,
	onGetListSuccess(res) {
		total.value = res.totalCount;
		tableData.value = res.list;
		let item = tableData.value[0]
		if (item) {
			handleChangeActiveId(item.id)
		}
	}
})

const dialogVisible = ref(false)
const callbackFun = ref(null)
const open = (callback = null) => {
	callbackFun.value = callback
	getData(1)
	dialogVisible.value = true
}
const form = reactive({
	name: "",
	list: []
})
const list = ref([])

function handleChangeActiveId(id) {
	activeId.value = id
	list.value = []
	let item = tableData.value.find(o => o.id === id);
	if (item) {
		list.value = item.default.split(",")
		form.name = item.name
	}
}

const submit = () => {
	if (typeof callbackFun.value === 'function') {
		callbackFun.value(form)
	}
	dialogVisible.value = false
}
defineExpose({
	open
})
</script>

<style scoped>
.image-aside {
	border-right: 1px solid #eee;
	position: relative;
}

.image-aside .top {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 50px;
	overflow-y: auto;
}

.image-aside .bottom {
	position: absolute;
	bottom: 0;
	height: 50px;
	left: 0;
	right: 0;
	@apply flex items-center justify-center;
}

.sku-list {
	border-bottom: 1px solid #f4f4f4;
	@apply p-3 text-sm text-gray-600 flex items-center cursor-pointer;
}

.sku-list:hover, .active {
	@apply bg-blue-50;
}
</style>