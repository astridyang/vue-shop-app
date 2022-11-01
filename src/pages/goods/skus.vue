<template>
	<FormDrawer title="Set Content" destroy-on-close ref="formDrawerRef" @submit="onSubmit">
		<el-form :model="form" label-width="110px">
			<el-form-item label="Sku Type">
				<el-radio-group v-model="form.sku_type">
					<el-radio :label="0">单规格</el-radio>
					<el-radio :label="1">多规格</el-radio>
				</el-radio-group>
			</el-form-item>
			<template v-if="form.sku_type === 0">
				<el-form-item label="Origin price">
					<el-input v-model="form.sku_value.oprice" style="width:35%">
						<template #append>yen</template>
					</el-input>
				</el-form-item>
				<el-form-item label="product price">
					<el-input v-model="form.sku_value.pprice" style="width:35%">
						<template #append>yen</template>
					</el-input>
				</el-form-item>
				<el-form-item label="cost price">
					<el-input v-model="form.sku_value.cprice" style="width:35%">
						<template #append>yen</template>
					</el-input>
				</el-form-item>
				<el-form-item label="weight">
					<el-input v-model="form.sku_value.weight" style="width:35%">
						<template #append>kg</template>
					</el-input>
				</el-form-item>
				<el-form-item label="volume">
					<el-input v-model="form.sku_value.volume" style="width:35%">
						<template #append>m³</template>
					</el-input>
				</el-form-item>
			</template>
			<template v-else>
				<SkuCard/>
			</template>
		</el-form>
	</FormDrawer>

</template>

<script>
export default {
	name: 'GoodsSkus'
}
</script>
<script setup>
import {ref, reactive} from 'vue'
import FormDrawer from "~/components/FormDrawer.vue";
import {readGoods, updateskus} from '~/api/goods';
import {toast} from '~/composables/util';
import SkuCard from "~/pages/goods/components/SkuCard.vue";
import {goodsId,initSkuCardList} from "~/composables/useSku";

const formDrawerRef = ref(null)
const form = reactive({
	sku_type: 0,
	"sku_value": {
		"oprice": 0,
		"pprice": 0,
		"cprice": 0,
		"weight": 0,
		"volume": 0
	},
})


const open = (row) => {
	goodsId.value = row.id
	row.skusLoading = true
	readGoods(goodsId.value).then(res => {
		initSkuCardList(res)
		form.sku_type = res.sku_type
		form.sku_value = res.sku_value || {
			"oprice": 0,
			"pprice": 0,
			"cprice": 0,
			"weight": 0,
			"volume": 0
		}
		formDrawerRef.value.open()
	}).finally(() => {
		row.skusLoading = false
	})
}
const emits = defineEmits(["reloadData"])
const onSubmit = () => {
	formDrawerRef.value.showLoading()
	updateskus(goodsId.value, form).then(res => {
		toast("set skus success")
		emits("reloadData")
		formDrawerRef.value.close()
	}).finally(() => {
		formDrawerRef.value.hideLoading()
	})
}
defineExpose({
	open,
})
</script>

<style scoped lang='scss'>

</style>