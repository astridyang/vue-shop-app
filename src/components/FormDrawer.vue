<template>
	<el-drawer v-model="drawer" :destroy-on-close="destroyOnClose" :title="title" :size="size"
	           :close-on-click-modal="false">
		<div class="formDrawer">
			<div class="body">
				<slot/>
			</div>
			<div class="actions">
				<el-button type="primary" :loading="loading" @click="submit">{{ confirmText }}</el-button>
				<el-button type="default" @click="close">Cancel</el-button>
			</div>
		</div>
	</el-drawer>
</template>
<script>
export default {
	name: "FormDrawer"
}
</script>
<script setup>
import {ref} from "vue";

const drawer = ref(false)
const open = () => drawer.value = true;
const close = () => drawer.value = false;

defineProps({
	title: String,
	size: {
		type: String,
		default: "45%"
	},
	destroyOnClose: {
		type: Boolean,
		default: false
	},
	confirmText: {
		type: String,
		default: "Submit"
	}
})
const loading = ref(false)
const showLoading = ()=>loading.value = true
const hideLoading = ()=>loading.value = false
const emits = defineEmits(["submit"])
const submit = () => emits("submit")

defineExpose({
	open,
	close,
	showLoading,
	hideLoading
})
</script>

<style>
.formDrawer {
	width: 100%;
	height: 100%;
	position: relative;
	@apply flex flex-col;
}

.formDrawer .body {
	flex: 1;
	overflow-y: auto;
}

.actions {
	height: 50px;
}
</style>