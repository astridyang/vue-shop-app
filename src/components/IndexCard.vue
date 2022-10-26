<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span>{{ title }}</span>
        <el-tag type="danger" effect="plain">
          {{ tip }}
        </el-tag>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0" v-for="(item, index) in data" :key="index">
        <el-card shadow="hover" class="border-0 bg-light-400">
          <div class="flex flex-col items-center justify-center">
            <span class="text-xl">{{ item.value }}</span>
            <span class="text-sm mt-2">{{ item.label }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'IndexCard'
}
</script>
<script setup>
defineProps({
  title: String,
  tip: String,
  data: Array
})
</script>

<style scoped lang='scss'>

</style>