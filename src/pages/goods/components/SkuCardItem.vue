<template>
	<div v-loading="loading">
		<el-tag
				v-for="(tag,index) in item.goodsSkusCardValue"
				:key="index"
				class="mx-1"
				closable
				:disable-transitions="false"
				@close="handleClose(tag)"
				effect="plain"
		>
			<el-input v-model="tag.text" size="small" class="w-20 ml-[-10px]" @change="handleChange($event,tag)"/>
		</el-tag>
		<el-input
				v-if="inputVisible"
				ref="InputRef"
				v-model="inputValue"
				class="ml-1 w-20"
				size="small"
				@keyup.enter="handleInputConfirm"
				@blur="handleInputConfirm"
		/>
		<el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
			+ New Value
		</el-button>
	</div>
</template>
<script>
export default {
	name: "SkuCardItem"
}
</script>
<script setup>
import {initSkuCardItem} from "~/composables/useSku";


const props = defineProps({
	skuItemId:[Number,String]
})
const {item, inputValue, inputVisible, InputRef, handleClose, showInput, handleInputConfirm,loading,handleChange} = initSkuCardItem(props.skuItemId)
</script>

<style scoped lang='scss'>

</style>