<template>
	<div>
		<el-icon v-if="modelValue">
			<component :is="modelValue"/>
		</el-icon>
		<el-select :filterable="true" :model-value="modelValue" placeholder="Select Icon" @change="handleChange">
			<el-option v-for="item in icons" :key="item" :label="item" :value="item">
				<el-icon class="mr-2">
					<component :is="item"/>
				</el-icon>
				<span>{{item}}</span>
			</el-option>
		</el-select>
	</div>
</template>
<script>
// export default {
// 	name: "IconSelect"
// }
</script>
<script setup>
import {ref} from "vue";
import * as iconList from "@element-plus/icons-vue";

const icons = ref(Object.keys(iconList));
defineProps({
	modelValue: String
})
const emits = defineEmits(["update:modelValue"])
const handleChange = (icon) => {
	emits("update:modelValue", icon)
}
</script>

<style scoped lang='scss'>

</style>