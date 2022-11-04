<template>
	<el-form-item label="Sku Setting">
		<table class="border">
			<thead>
			<tr>
				<th class="border text-center" v-for="(th,index) in tableHeaders" :key="index" :width="th.width"
				    :colspan="th.colspan"
				    :rowspan="th.rowspan">{{ th.name }}
				</th>
			</tr>
			<tr>
				<th class="border text-center" width="100" v-for="(label,index) in skuLabels" :key="index">{{ label.name }}</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(item,index) in skuList" :key="index">
				<!--<td>{{item.name}}</td>-->
				<td class="text-center border" v-for="(sku,idx) in item.skus" :key="idx">
					{{sku.value}}
				</td>
				<td>
					<el-input v-model="item.pprice" size="small" type="number"/>
				</td>
				<td>
					<el-input v-model="item.oprice" size="small" type="number"/>
				</td>
				<td>
					<el-input v-model="item.cprice" size="small" type="number"/>
				</td>
				<td>
					<el-input v-model="item.stock" size="small" type="number"/>
				</td>
				<td>
					<el-input v-model="item.volume" size="small" type="number"/>
				</td>
				<td>
					<el-input v-model="item.weight" size="small" type="number"/>
				</td>
				<td>
					<el-input v-model="item.code" size="small"/>
				</td>
			</tr>
			</tbody>
		</table>
	</el-form-item>
</template>
<script>
export default {
	name: "SkuTable"
}
</script>
<script setup>
import {initSkuTable} from "~/composables/useSku";

const {tableHeaders, skuList, skuLabels} = initSkuTable();
</script>

<style scoped lang='scss'>

</style>