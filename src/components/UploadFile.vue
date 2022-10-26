<template>
  <el-upload class="upload-demo" drag name="img" :action="uploadAction" multiple :headers="{ token }" :on-success="uploadSuccess"
    :on-error="uploadFail">
    <el-icon class="el-icon--upload">
      <upload-filled />
    </el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<script>
export default {
  name: 'UploadFile'
}
</script>
<script setup>
import { uploadAction } from '~/api/image'
import { getToken } from '~/composables/auth'
import { toast } from '~/composables/util'
const token = getToken()

const emits = defineEmits(["success"])

function uploadSuccess(response, uploadFile, uploadFiles) {
  console.log(response);
  emits("success", { response, uploadFile, uploadFiles })
}

function uploadFail(error, uploadFile, uploadFiles) {
  const msg = JSON.parse(error.message).msg || 'Upload fail.'
  toast(msg, "error")
}
</script>

<style scoped lang='scss'>

</style>