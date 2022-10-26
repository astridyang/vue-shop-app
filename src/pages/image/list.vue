<template>
	<el-container class="bg-white rounded" :style="{ height: (h + 'px') }">
		<el-header class="image-header">
			<el-button size="small" type="primary" @click="handleOpenCreate">Create Class</el-button>
			<el-button size="small" type="warning" @click="handleOpenUpload">Upload</el-button>
		</el-header>
		<el-container>
			<ImageAside ref="imageAsideRef" @change="handleChange" />
			<ImageMain ref="imageMainRef" />
		</el-container>
	</el-container>
</template>
<script>
export default {
	name: "ImageList"
}
</script>
<script setup>
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
import { ref } from "vue";

let windowHeight = window.innerHeight || document.body.clientHeight
let h = windowHeight - 64 - 44 - 44
const imageAsideRef = ref(null)
const handleOpenCreate = () => {
	imageAsideRef.value.handleCreate()
}

const imageMainRef = ref(null)
const handleChange = (id) => {
	imageMainRef.value.getDataById(id);
}
const handleOpenUpload = () => {
	imageMainRef.value.openUploadDrawer();
}
</script>

<style scoped>
.image-header {
	border-bottom: 1px solid #eee;
	@apply flex items-center;
}
</style>