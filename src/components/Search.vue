<template>
  <el-form :model="model" label-width="80px" size="small">
    <el-row :gutter="20">
      <slot />
      <template v-if="showSearch">
        <slot name="show" />
      </template>
     
      <el-col :span="8" :offset="showSearch ? 0 : 8">
        <div class="flex items-center justify-end">
          <el-button type="primary" @click="$emit('search')">Search</el-button>
          <el-button @click="$emit('reset')">Reset</el-button>
          <el-button type="primary" @click="showSearch = !showSearch" text v-if="hasShowSlot">
            {{ showSearch ? '收起' : '展开' }}
            <el-icon>
              <ArrowUp v-if="showSearch" />
              <ArrowDown v-else />
            </el-icon>
          </el-button>
        </div>
      </el-col>

    </el-row>

  </el-form>
</template>

<script>
import { defineProps } from '@vue/runtime-core'
export default {
  name: 'SearchForm'
}
</script>
<script setup>
import { ref, useSlots } from 'vue'
defineProps({
  model: Object
})
defineEmits(["search", "reset"])
const showSearch = ref(false)
const slots = useSlots()
const hasShowSlot = ref(!!slots.show)
</script>

<style scoped lang='scss'>

</style>