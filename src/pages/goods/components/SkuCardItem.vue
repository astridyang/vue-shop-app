<template>
	<div>card item</div>
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
const {item} = initSkuCardItem(props.skuItemId)
console.log(item)
</script>

<style scoped lang='scss'>

</style>