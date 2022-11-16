<template>
  <div class="bg-white p-2 rounded" v-loading="loading">
    <el-form :model="form" label-width="160px">
      <el-form-item label="物流查询key">
        <el-input v-model="form.ship" style="width:200px;"></el-input>
        <small class="flex text-gray-500 mt-1">用于查询物流信息，
          接口申请（仅供参考）</small>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "ShipSetting"
}
</script>
<script setup>
import { reactive, ref } from 'vue'
import { getSysConfig, setSysConfig } from '~/api/sysconfig';
import { toast } from '~/composables/util';

const loading = ref(false)

const form = reactive({
  "ship": ""
})
function getData() {
  loading.value = true
  getSysConfig().then(res => {
    for (const key in form) {
      form[key] = res[key]
    }
  }).finally(() => {
    loading.value = false
  })
}
getData()
const onSubmit = () => {
  loading.value = true
  setSysConfig(form).then(res => {
    toast("config success")
    getData()
  }).finally(() => {
    loading.value = false
  })
}

</script>

<style scoped>
.flex-basis {
  flex-basis: 100%;
}
</style>