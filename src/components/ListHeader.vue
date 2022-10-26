<template>
  <div class="flex items-center justify-between mb-4">
    <el-button type="primary" size="small" @click="$emit('create')">New</el-button>
    <el-tooltip effect="dark" content="Refresh data" placement="top">
      <el-button text @click="$emit('refresh')">
        <el-icon>
          <Refresh />
        </el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ListHeader'
}
</script>
<script setup>
defineEmits(["create", "refresh"])
</script>

<style scoped lang='scss'>

</style>