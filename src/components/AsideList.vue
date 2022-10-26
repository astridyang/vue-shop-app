<template>
  <div class="aside-list" :class="{ 'active': active }">
    <span class="truncate">
      <slot />
    </span>
    <el-button class="ml-auto px-1" text type="primary" size="small" @click="emits('edit')">
      <el-icon :size="16">
        <Edit />
      </el-icon>
    </el-button>
    <span @click.stop="() => { }">
      <el-popconfirm title="Are you sure to delete this?" @confirm="emits('delete')">
        <template #reference>
          <el-button class="px-1" text type="primary" size="small">
            <el-icon :size="16">
              <Close />
            </el-icon>
          </el-button>
        </template>
      </el-popconfirm>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ImageAsideList'
}
</script>
<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(["edit", 'delete'])
</script>

<style scoped>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  @apply flex items-center p-3 text-sm text-gray-600;
}

.aside-list:hover,
.active {
  @apply bg-blue-50;
}
</style>