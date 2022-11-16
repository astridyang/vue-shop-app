<template>
  <el-drawer title="Ship Info" v-model="dialogVisible" size="30%">
    <el-card shadow="never" class="border-0 mb-3">
      <div class="flex items-center">
        <el-image :src="info.logo" fit="cover" style="width:60px;height:60px;" :lazy="true"></el-image>
        <div class="ml-3">
          <p>company: {{ info.typename }}</p>
          <p>&ensp;number: {{ info.number }}</p>
        </div>
      </div>
    </el-card>
    <el-card shadow="never" class="border-0 border-t">
      <el-timeline class="ml-[-40px]">
        <el-timeline-item v-for="(item, index) in info.list" :key="index" :timestamp="item.time">
          {{ item.status }}
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </el-drawer>

</template>

<script>
export default {
  name: 'ShipInfoModal'
}
</script>
<script setup>
import { ref } from 'vue'
import { getShipInfo } from '~/api/order'
import { toast } from '~/composables/util'
const dialogVisible = ref(false)
const info = ref({})
const open = (id) => {
  return getShipInfo(id).then(res => {
    if (res.status !== 0) {
      return toast("invalid ship no.", "error")
    }
    info.value = res.result
    dialogVisible.value = true
  })
}

defineExpose({
  open
})
</script>

<style scoped lang='scss'>

</style>