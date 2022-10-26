<template>
	<el-aside width="220px" class="image-aside" v-loading="loading">
		<div class="top">
			<AsideList @edit="handleEdit(item)" :active="activeId === item.id" v-for="(item, index) in classList"
			           :key="index" @delete="handleDelete(item.id)" @click="handleChange(item.id)">{{ item.name }}
			</AsideList>
		</div>
		<div class="bottom">
			<el-pagination @current-change="getData" :current-page="currentPage" :page-size="limit" layout=" prev, next"
			               background :total="total">
			</el-pagination>
		</div>
	</el-aside>
	<FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
		<el-form :model="form" ref="formRef" :rules="rules" label-width="100px" :inline="false" size="default">
			<el-form-item label="class name" prop="name">
				<el-input v-model="form.name"/>
			</el-form-item>
			<el-form-item label="order" prop="order">
				<el-input-number v-model="form.order" :min="0" :max="100"/>
			</el-form-item>
		</el-form>
	</FormDrawer>
</template>

<script>
export default {
	name: 'ImageAside'
}
</script>
<script setup>
import {computed, reactive, ref} from 'vue';
import AsideList from './AsideList.vue';
import FormDrawer from "~/components/FormDrawer.vue";
import {getImageClassList, createImageClass, updateImageClass, deleteImageClass} from '~/api/image_class'
import {toast} from "~/composables/util";

const classList = ref([])
const activeId = ref(0)

// pagination
const loading = ref(false)
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

function getData(p = null) {
	if (typeof p === 'number') {
		currentPage.value = p
	}
	loading.value = true
	getImageClassList(currentPage.value).then(res => {
		total.value = res.totalCount
		classList.value = res.list;
		const item = res.list[0]
		if (item) {
			handleChange(item.id)
		}
	}).finally(() => {
		loading.value = false
	})
}

getData()

const formDrawerRef = ref(null)

const form = reactive({
	name: "",
	order: 50,
})
const rules = {
	name: [{
		required: true,
		message: "image class name can't be empty",
		trigger: "blur",
	}]
}
const formRef = ref(null)

const handleCreate = () => {
	form.name = ""
	form.order = 0
	formDrawerRef.value.open()
}

const editId = ref(0)
const handleEdit = (item) => {
	form.name = item.name
	form.order = item.order
	formDrawerRef.value.open()
}
const drawerTitle = computed(() => editId.value ? "Update" : "Create")
const handleSubmit = () => {
	formRef.value.validate((valid) => {
		if (!valid) return;
		formDrawerRef.value.showLoading()
		const fun = editId.value ? updateImageClass(editId.value, form) : createImageClass(form);
		fun.then(res => {
			toast(drawerTitle.value + " success")
			getData(editId.value ? currentPage.value : 1)
			formDrawerRef.value.close()
		}).finally(() => {
			formDrawerRef.value.hideLoading()
		})
	})
}

const handleDelete = (id) => {
	loading.value = true
	deleteImageClass(id).then(res => {
		getData(currentPage.value)
		toast("Delete success")
	}).finally(() => {
		loading.value = false
	})
}

const emits = defineEmits(["change"])

const handleChange = (id) => {
	activeId.value = id
	emits("change", id)
}

defineExpose({
	handleCreate
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
</style>