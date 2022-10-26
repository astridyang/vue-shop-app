<template>
  <el-result
        icon="warning"
        title="404"
        sub-title="Not Found"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">Back Home</el-button>
        </template>
      </el-result>
</template>

<script>
export default {
  name: 'NotFound'
} 
</script>
<script setup>
</script>

<style scoped lang='scss'>
</style>