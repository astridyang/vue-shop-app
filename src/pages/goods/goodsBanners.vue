<template>
  <el-drawer title="Set Banners" v-model="drawerVisible" size="50%" destroy-on-close>
    <el-form :model="form" label-width="80px">
      <el-form-item label="Banners">
        <ChooseImage v-model="form.banners" :limit="9" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">submit</el-button>
      </el-form-item>
    </el-form>

  </el-drawer>

</template>

<script>
export default {
  name: 'GoodsBanners'
}
</script>
<script setup>
import { ref, reactive } from 'vue'
import ChooseImage from '~/components/ChooseImage.vue';
import { readGoods, setBanners } from '~/api/goods';
import { toast } from '~/composables/util';
const drawerVisible = ref(false)
const form = reactive({
  banners: []
})



const goodsId = ref(0)
const open = (row) => {
  goodsId.value = row.id
  row.bannerLoading = true
  readGoods(goodsId.value).then(res => {
    form.banners = res.goodsBanner.map(o => o.url)
    drawerVisible.value = true
  }).finally(() => {
    row.bannerLoading = false
  })
}
const emits = defineEmits(["reloadData"])
const loading = ref(false)
const onSubmit = () => {
  loading.value = true
  setBanners(goodsId.value, form).then(res => {
    toast("set banner success")
    emits("reloadData")
    drawerVisible.value = false
  }).finally(() => {
    loading.value = false
  })
}
defineExpose({
  open,
})
</script>

<style scoped lang='scss'>

</style>