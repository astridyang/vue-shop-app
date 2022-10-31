<template>
	<el-main class="image-main" v-loading="loading">
		<div class="top p-3">
			<el-row :gutter="10">
				<el-col :span="6" :offset="0" v-for="(item, index) in list" :key="index">
					<el-card shadow="hover" :body-style="{ padding: 0 }" class="mb-3" :class="{ 'border-blue-500': item.checked }">
						<div class="relative">
							<el-image :src="item.url" fit="cover" :lazy="true" class="w-full h-[150px]" :preview-src-list="[item.url]"
								:initial-index="0"></el-image>
							<div class="image-name">{{ item.name }}</div>
							<div class="flex items-center justify-center p-2">
								<el-checkbox v-if="openChoose" v-model="item.checked" @change="handleChoose(item)" />

								<el-button type="primary" size="small" text @click="handleEdit(item)">Rename</el-button>
								<el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(item.id)">
									<template #reference>
										<el-button type="primary" size="small" text>Delete</el-button>
									</template>
								</el-popconfirm>
							</div>
						</div>
					</el-card>

				</el-col>
			</el-row>

		</div>
		<div class="bottom">
			<el-pagination @current-change="getData" :current-page="currentPage" :page-size="limit" layout=" prev,pager, next"
				background :total="total">
			</el-pagination>
		</div>
		<el-drawer v-model="drawer" title="Upload">
			<upload-file @success="handleSuccess" :data="{ image_class_id: imageClassId }" />
		</el-drawer>
	</el-main>
</template>

<script>
export default {
	components: { UploadFile },
	name: 'ImageMain'
}
</script>
<script setup>
import { getImageList, updateImage, deleleImages } from "~/api/image";
import { computed, ref } from "vue";
import { showPrompt, toast } from '~/composables/util';
import UploadFile from './UploadFile.vue';

const props = defineProps({
	openChoose:{
		type:Boolean,
		default: false
	},
	limit:{
		type:Number,
		default:1
	}
})

// pagination
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
const loading = ref(false)
const list = ref([])
const imageClassId = ref(0)

function getData(p = null) {
	if (typeof p === 'number') {
		currentPage.value = p
	}
	loading.value = true
	getImageList(imageClassId.value, currentPage.value).then(res => {
		total.value = res.totalCount
		list.value = res.list.map(item => {
			item.checked = false
			return item
		});

	}).finally(() => {
		loading.value = false
	})
}

function getDataById(id) {
	imageClassId.value = id
	getData()
}

const handleEdit = (item) => {
	showPrompt("Rename", item.url)
		.then(({ value }) => {
			loading.value = true
			updateImage(item.id, value)
				.then(res => {
					getData()
				}).finally(() => {
					loading.value = false
				})
		})
}

const handleDelete = id => {
	loading.value = true
	deleleImages([id])
		.then(res => {
			toast("Delete success")
			getData()
		}).finally(() => {
			loading.value = false
		})
}
const drawer = ref(false)
const openUploadDrawer = () => drawer.value = true
function handleSuccess() {
	getData(1)
}
const emits = defineEmits(["choose"])
const checkedImage = computed(() => list.value.filter(item => item.checked))
function handleChoose(item) {
	if (item.checked && checkedImage.value.length > props.limit) {
		item.checked = false
		toast(`You can only choose ${props.limit} image(s)`, "error")
		return
	}
	emits("choose", checkedImage.value)
}
defineExpose({
	getDataById,
	openUploadDrawer
})

</script>

<style scoped>
.image-main {
	position: relative;
}

.image-main .top {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 50px;
	overflow-y: auto;
}

.image-main .bottom {
	position: absolute;
	bottom: 0;
	height: 50px;
	left: 0;
	right: 0;
	@apply flex items-center justify-center;
}

.image-name {
	position: absolute;
	left: -1px;
	right: -1px;
	top: 122px;
	@apply px-1 text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>