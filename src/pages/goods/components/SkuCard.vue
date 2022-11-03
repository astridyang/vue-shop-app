<template>
	<el-form-item label="Sku Options">
		<el-card shadow="never" class="w-full mb-3" v-for="(item,index) in skuCardList" :key="item.id"
		         v-loading="item.loading">
			<template #header>
				<div class="flex items-center">
					<el-input v-model="item.text" placeholder="sku name" style="width: 200px" @change="updateSkuCard(item)">
						<template #append>
							<el-icon @click="handleChooseSku(item)" class="cursor-pointer">
								<more/>
							</el-icon>
						</template>
					</el-input>
					<el-button size="small" class="ml-auto" @click="sortCard('up',index)" :disabled="index===0">
						<el-icon>
							<top/>
						</el-icon>
					</el-button>
					<el-button size="small" @click="sortCard('down',index)" :disabled="index===skuCardList.length-1">
						<el-icon>
							<bottom/>
						</el-icon>
					</el-button>
					<el-popconfirm title="Are you sure to delete this?" @confirm="handleDeleteSkuCard(item)">
						<template #reference>
							<el-button size="small">
								<el-icon>
									<delete/>
								</el-icon>
							</el-button>
						</template>
					</el-popconfirm>
				</div>
			</template>
			<SkuCardItem :sku-item-id="item.id"/>
		</el-card>
		<el-button type="success" size="small" @click="addSkuCard" :loading="btnLoading">Add option</el-button>
	</el-form-item>
	<ChooseSku ref="chooseSkuRef"/>
</template>
<script>
export default {
	name: "SkuCard"
}
</script>
<script setup>
import SkuCardItem from "~/pages/goods/components/SkuCardItem.vue";
import ChooseSku from "~/components/ChooseSku.vue";
import {
	skuCardList,
	addSkuCard,
	btnLoading,
	updateSkuCard,
	handleDeleteSkuCard,
	sortCard,
	handleSetGoodsSkuCard
} from "~/composables/useSku";
import {ref} from "vue";

const chooseSkuRef = ref(null)
const handleChooseSku = (item) => {
	chooseSkuRef.value.open((value)=>{
		handleSetGoodsSkuCard(item.id,{
			name:value.name,
			value:value.list
		})
	})
}
</script>

<style scoped>
:deep(.el-card__header) {
	@apply !p-2 bg-gray-50;
}
</style>