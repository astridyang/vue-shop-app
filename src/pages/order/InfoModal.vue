<template>
  <el-drawer title="Goods Info" v-model="infoVisible" size="40%">
    <el-card shadow="never" class="mb-3">
      <template #header>
        <b class="text-sm">Order Info</b>
      </template>
      <!-- card body -->
      <el-form label-width="100px" :inline="false">
        <el-form-item label="Order No.">
          {{ info.no }}
        </el-form-item>
        <el-form-item label="Pay Method">
          {{ info.payment_method }}
        </el-form-item>
        <el-form-item label="Pay Time">
          {{ payTime }}
        </el-form-item>
        <el-form-item label="Create Time">
          {{ info.create_time }}
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" class="mb-3">
      <template #header>
        <b class="text-sm">Goods Info</b>
      </template>
      <!-- card body -->
      <div v-for="(item, index) in info.order_items" :key="index">
        <div class="flex">
          <el-image :src="item.goods_item?.cover ?? ''" fit="cover" :lazy="true" style="width:60px;height:60px;"
            class="mr-2 rounded"></el-image>
          <div>
            <p>{{ item.goods_item?.title ?? 'Goods has been deleted.' }}</p>
            <small class=" text-sm bg-gray-300 py-1 px-2 my-2" v-if="item.sku">
              {{ item.sku }}
            </small>
            <p><span class="text-rose-600">￥{{ item.price }}</span> <span>x{{ item.num }}</span></p>
          </div>
        </div>
        <el-form label-width="100px" :inline="false">
          <el-form-item label="成交价">
            <span class="text-rose-600">￥{{ info.total_price }}</span>
          </el-form-item>
        </el-form>
      </div>

    </el-card>
    <el-card shadow="never" class="mb-3" v-if="info.ship_data">
      <template #header>
        <b class="text-sm">Ship Info</b>
      </template>
      <!-- card body -->
      <el-form label-width="100px" :inline="false">
        <el-form-item label="Company">
          {{ info.ship_data.express_company }}
        </el-form-item>
        <el-form-item label="No.">
          {{ info.ship_data.express_no }}
          <el-button type="primary" class="ml-3" size="small" @click="openShipInfoModal(info.id)">Ship Data</el-button>
        </el-form-item>
        <el-form-item label="Express Time">
          {{ expressTime }}
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" class="mb-3" v-if="info.address">
      <template #header>
        <b class="text-sm">Receiver Info</b>
      </template>
      <!-- card body -->
      <el-form label-width="100px" :inline="false">
        <el-form-item label="Receiver">
          {{ info.address.name }}
        </el-form-item>
        <el-form-item label="Contact">
          {{ info.address.phone }}
        </el-form-item>
        <el-form-item label="Address">
          {{ info.address.province + info.address.city + info.address.district + info.address.address }}
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" class="mb-3" v-if="info.refund_status !== 'pending'">
      <template #header>
        <b class="text-sm">Refund Info</b>
        <el-button class="float-right" type="info" text size="default" disabled>{{ refundText }}</el-button>

      </template>
      <!-- card body -->
      <el-form label-width="100px" :inline="false">
        <el-form-item label="Reason">
          {{ info.extra.refund_reason }}
        </el-form-item>
      </el-form>
    </el-card>
  </el-drawer>
  <ShipInfoModal ref="ShipInfoModalRef" />
</template>

<script>
export default {
  name: 'GoodsInfoModal'
}
</script>
<script setup>
import { ref, computed } from 'vue'
import { useDateFormat } from '@vueuse/core'
import ShipInfoModal from './ShipInfoModal.vue';
// const props = defineProps({
//   info: Object
// })
const infoVisible = ref(false)
const info = ref(null)
const open = (row) => {
  infoVisible.value = true
  row.order_items.map(o => {
    if (o.skus_type === 1 && o.goods_skus) {
      let sku = []
      for (let key in o.goods_skus.skus) {
        sku.push(o.goods_skus.skus[key].value)
      }
      o.sku = sku.join(",")
    }
    return o;
  })
  info.value = row
  // console.log(info.value)
}

const refundText = computed(() => {
  const status = {
    applied: "applied,wait audit",
    processing: "refunding",
    success: "refund success",
    failed: "refund fail"
  }
  return status[info.value.refund_status]
})

const payTime = computed(() => {
  if (info.value.paid_time) {
    let time = info.value.paid_time * 1000
    const s = useDateFormat(time, 'YYYY-MM-DD HH:mm:ss')
    return s.value
  }
  return ""
})
const expressTime = computed(() => {
  if (info.value.ship_data) {
    let time = info.value.ship_data.express_time * 1000
    const s = useDateFormat(time, 'YYYY-MM-DD HH:mm:ss')
    return s.value
  }
  return ""
})

let loading = ref(false)
const ShipInfoModalRef = ref(null)
const openShipInfoModal = (id) => {
  loading.value = true
  ShipInfoModalRef.value.open(id).finally(() => {
    loading.value = false
  })
}

defineExpose({
  open
})
</script>

<style scoped lang='scss'>

</style>