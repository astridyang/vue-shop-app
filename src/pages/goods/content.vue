<template>
	<FormDrawer title="Set Content" destroy-on-close ref="formDrawerRef" @submit="onSubmit">
		<el-form :model="form" >
			<el-form-item>
				<Editor v-model="form.content"/>
			</el-form-item>
		</el-form>
	</FormDrawer>

</template>

<script>
export default {
	name: 'GoodsContent'
}
</script>
<script setup>
import {ref, reactive} from 'vue'
import FormDrawer from "~/components/FormDrawer.vue";
import Editor from "~/components/Editor.vue";
import {readGoods, updateGoods} from '~/api/goods';
import {toast} from '~/composables/util';

const formDrawerRef = ref(null)
const form = reactive({
	content: ""
})


const goodsId = ref(0)
const open = (row) => {
	goodsId.value = row.id
	row.conentLoading = true
	readGoods(goodsId.value).then(res => {
		form.content = res.content
		formDrawerRef.value.open()
	}).finally(() => {
		row.conentLoading = false
	})
}
const emits = defineEmits(["reloadData"])
const onSubmit = () => {
	formDrawerRef.value.showLoading()
	updateGoods(goodsId.value, form).then(res => {
		toast("set content success")
		emits("reloadData")
		formDrawerRef.value.close()
	}).finally(() => {
		formDrawerRef.value.hideLoading()
	})
}
defineExpose({
	open,
})
</script>

<style scoped lang='scss'>

</style>