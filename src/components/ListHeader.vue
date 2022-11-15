<template>
	<div class="flex items-center mb-4">
		<div>
			<el-button v-if="btns.includes('create')" type="primary" size="small" @click="$emit('create')">New</el-button>
			<el-popconfirm v-if="btns.includes('delete')" title="Are you sure to delete this?" @confirm="$emit('delete')">
				<template #reference>
					<el-button size="small" text type="danger">Delete Select
					</el-button>
				</template>
			</el-popconfirm>
			<slot />
		</div>
		<div class="ml-auto">
			<el-tooltip v-if="btns.includes('refresh')" effect="dark" content="Refresh data" placement="top">
			<el-button text @click="$emit('refresh')">
				<el-icon>
					<Refresh />
				</el-icon>
			</el-button>
		</el-tooltip>
		<el-tooltip v-if="btns.includes('download')" effect="dark" content="download data" placement="top">
			<el-button text @click="$emit('download')">
				<el-icon><Download /></el-icon>
			</el-button>
		</el-tooltip>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ListHeader'
}
</script>
<script setup>
import { computed } from "vue";

const props = defineProps({
	layout: {
		type: String,
		default: "create,refresh"
	}
})
const btns = computed(() => props.layout.split(","))
defineEmits(["create", "refresh", "delete", "download"])
</script>

<style scoped lang='scss'>

</style>