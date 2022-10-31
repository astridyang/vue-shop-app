<template>
  <div class="" v-if="modelValue">
    <el-image v-if="typeof modelValue === 'string'" :src="modelValue" fit="cover"
      class="w-[100px] h-[100px] border rounded mr-3"></el-image>
    <div class="flex flex-wrap" v-else>
      <div class="relative mx-1 mb-2 w-[100px] h-[100px]" v-for="(url, index) in modelValue" :key="index">
        <el-icon @click="removeUrl(url)" class="absolute top-[5px] right-[5px] bg-white rounded-full cursor-pointer"
          style="z-index:10;">
          <CircleClose />
        </el-icon>
        <el-image :src="url" fit="cover" class="w-[100px] h-[100px] border rounded mr-3"></el-image>
      </div>
    </div>
  </div>
  <div class="choose-image-btn" @click="open">
    <el-icon :size="25" class="text-gray-500">
      <Plus />
    </el-icon>
  </div>
  <el-dialog title="Choose Image" v-model="dialogVisible" width="80%" top="5vh">
    <el-container style="height:70vh;">
      <ImageAside ref="imageAsideRef" @change="handleChange" />
      <ImageMain ref="imageMainRef" @choose="handleChoose" openChoose :limit="limit" />
    </el-container>
    <template #footer>
      <span>
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="submit">OK</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
export default {
  name: 'ChooseImage'
}
</script>
<script setup>
import { ref } from 'vue';
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
import { toast } from '~/composables/util';
const dialogVisible = ref(false)
const open = () => dialogVisible.value = true
const close = () => dialogVisible.value = false

const imageAsideRef = ref(null)


const imageMainRef = ref(null)
const handleChange = (id) => {
  imageMainRef.value.getDataById(id);
}
let urls = []
const handleChoose = (item) => {
  urls = item.map(o => o.url)
}
const props = defineProps({
  modelValue: [String, Array],
  limit: {
    type: Number,
    default: 1
  }
})
const emits = defineEmits(["update:modelValue"])
const submit = () => {
  let value = []
  if (props.limit === 1) {
    value = urls[0]
  } else {
    value = [...urls, ...props.modelValue]
    if (value.length > props.limit) {
      return toast(`you can only choose ${props.limit - props.modelValue.length} more images`,'error')
    }
  }
  if (value.length) {
    emits("update:modelValue", value)
  }
  close()
}
const removeUrl = (url) => {
  emits("update:modelValue", props.modelValue.filter(u => u !== url))
}
</script>

<style scoped>
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
}
</style>