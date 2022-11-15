<template>
  <el-drawer v-model="drawerVisible" title="Export Order" size="40%">
    <el-form :model="form" ref="formRef" label-width="80px">
      <el-form-item label="Order Type">
        <el-select v-model="form.tab" clearable>
          <el-option v-for="item in tabs" :key="item.key" :label="item.name" :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Time">
        <el-date-picker v-model="form.time" type="daterange" range-separator="To" start-placeholder="Start date"
          end-placeholder="End date" value-format="YYYY-MM-DD"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Export</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>

  </el-drawer>

</template>

<script>
export default {
  name: 'ExportExcel'
}
</script>
<script setup>
import { ref, reactive } from 'vue';
defineProps({
  tabs: Array
})
const drawerVisible = ref(false)
const open = () => drawerVisible.value = true
const close = () => drawerVisible.value = false
const form = reactive({
  tab: "",
  time: ""
})
const onSubmit = () => {

}
defineExpose({
  open
})
</script>

<style scoped lang='scss'>

</style>