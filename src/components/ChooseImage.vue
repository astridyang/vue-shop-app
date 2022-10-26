<template>
  <div class="" v-if="modelValue">
    <el-image :src="modelValue" fit="cover" class="w-[100px] h-[100px] border rounded mr-3"></el-image>
  </div>
  <div class="choose-image-btn" @click="open">
    <el-icon :size="25" class="text-gray-500">
      <Plus />
    </el-icon>
  </div>
  <el-dialog title="Choose Image" v-model="dialogVisible" width="80%" top="5vh">
    <el-container style="height:70vh;">
      <ImageAside ref="imageAsideRef" @change="handleChange" />
      <ImageMain ref="imageMainRef" @choose="handleChoose" openChoose />
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
  modelValue: [String, Array]
})
const emits = defineEmits(["update:modelValue"])
const submit = () => {
  if (urls.length) {
    emits("update:modelValue", urls[0])
  }
  close()
}
</script>

<style scoped>
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
}
</style>