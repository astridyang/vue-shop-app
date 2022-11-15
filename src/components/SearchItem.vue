<template>
   <el-col :span="8" :offset="0">
        <el-form-item :label="label">
          <slot/>
        </el-form-item>
      </el-col>
</template>

<script>
import { defineProps } from '@vue/runtime-core'
export default {
  name: 'SearchItem'
}
</script>
<script setup>
defineProps({
  label:String
})
</script>

<style scoped lang='scss'>
</style>