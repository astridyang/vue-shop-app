<template>
  <el-row :gutter="20" class="mt-5">
    <el-col :span="3" :offset="0" v-for="(item,index) in indexNavs" :key="index">
      <el-card shadow="hover" @click="$router.push(item.path)">
        <!-- card body -->
        <div class="flex flex-col justify-center items-center cursor-pointer">
          <el-icon :size="16" :class="item.color">
            <component :is="item.icon"/>
          </el-icon>
          <span class="text-sm mt-2">{{item.title}}</span>
        </div>
      </el-card>
      
    </el-col>
  </el-row>
  
</template>

<script>
export default {
  name: 'IndexNavs'
}
</script>
<script setup>
const indexNavs = [
  {
    icon:"user",
    color:"text-light-blue-500",
    title:"User",
    path:"/user/list"
  },
  {
    icon:"shopping-cart",
    color:"text-violet-500",
    title:"Goods",
    path:"/goods/list"
  },
  {
    icon:"tickets",
    color:"text-fuchsia-500",
    title:"Order",
    path:"/order/list"
  },
  {
    icon:"chat-dot-square",
    color:"text-teal-500",
    title:"Comment",
    path:"/comment/list"
  },
  {
    icon:"picture",
    color:"text-rose-500",
    title:"Image",
    path:"/image/list"
  },
  {
    icon:"bell",
    color:"text-green-500",
    title:"Notice",
    path:"/notice/list"
  },
  {
    icon:"set-up",
    color:"text-gray-500",
    title:"Setting",
    path:"/setting/base"
  },
  {
    icon:"files",
    color:"text-yellow-500",
    title:"Coupon",
    path:"/coupon/list"
  },
]
</script>

<style scoped lang='scss'>
</style>