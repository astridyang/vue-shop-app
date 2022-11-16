<template>
  <div class="bg-white p-2 rounded" v-loading="loading">
    <el-form :model="form" label-width="160px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="支付设置" name="first">
          <el-table :data="tableData" border stripe>
            <el-table-column label="支付方式" align="left">
              <template #default="{ row }">
                <div class="flex items-center">
                  <el-image :src="row.src" fit="fill" :lazy="true" style="width:40px;height:40px;" class="rounded mr-2">
                  </el-image>
                  <div>
                    <h6>{{ row.name }}</h6>
                    <small class="flex text-gray-500 mt-1">{{ row.desc }}</small>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Operations" align="center" width="150">
              <template #default="{ row }">
                <el-button type="primary" size="small" text @click="handleConfig(row.key)">配置</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="购物设置" name="second">
          <el-form-item label="未支付订单">
            <div>
              <el-input v-model="form.close_order_minute" type="number" style="width:300px;">
                <template #append>
                  分钟后自动关闭
                </template>
              </el-input>
              <small class="flex text-gray-500 mt-1">订单下单未付款，n分钟后自动关闭，设置0不自动关闭</small>
            </div>
          </el-form-item>
          <el-form-item label="已发货订单">
            <div>
              <el-input v-model="form.auto_received_day" type="number" style="width:300px;">
                <template #append>
                  天后自动确认收货
                </template>
              </el-input>
              <small class="flex text-gray-500 mt-1">如果在期间未确认收货，系统自动完成收货，设置0不自动收货</small>
            </div>
          </el-form-item>
          <el-form-item label="已完成订单">
            <div>
              <el-input v-model="form.after_sale_day" type="number" style="width:300px;">
                <template #append>
                  天内允许申请售后
                </template>
              </el-input>
              <small class="flex text-gray-500 mt-1">订单完成后 ，用户在n天内可以发起售后申请，设置0不允许申请售后</small>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Save</el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <FormDrawer ref="FormDrawerRef" title="Config" @submit="onSubmit">
      <el-form :model="form" label-width="100px" v-if="configKey === 'alipay'">
        <el-form-item label="app_id">
          <el-input v-model="form.alipay.app_id"></el-input>
        </el-form-item>
        <el-form-item label="ali_public_key">
          <el-input v-model="form.alipay.ali_public_key" type="textarea" :row="4"></el-input>
        </el-form-item>
        <el-form-item label="private_key">
          <el-input v-model="form.alipay.private_key" type="textarea" :row="4"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" label-width="100px" v-else>
        <el-form-item label="app_id">
          <el-input v-model="form.wxpay.app_id"></el-input>
        </el-form-item>
        <el-form-item label="miniapp_id">
          <el-input v-model="form.wxpay.miniapp_id"></el-input>
        </el-form-item>
        <el-form-item label="secret">
          <el-input v-model="form.wxpay.secret"></el-input>
        </el-form-item>
        <el-form-item label="appid">
          <el-input v-model="form.wxpay.appid"></el-input>
        </el-form-item>
        <el-form-item label="mch_id">
          <el-input v-model="form.wxpay.mch_id"></el-input>
        </el-form-item>
        <el-form-item label="key">
          <el-input v-model="form.wxpay.key"></el-input>
        </el-form-item>
        <el-form-item label="cert_client">
          <el-upload :headers="{ token }" :action="uploadAction" :limit="1" :on-success="handleClientUpload"
            accept=".pem">
            <el-button type="primary">Click to upload</el-button>
            <template #tip>
              <p class="text-red-500">
                {{ form.wxpay.cert_client ? form.wxpay.cert_client : "unConfig" }}
              </p>
              <div class="el-upload__tip">
                例如：apiclient_cert.pem
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="cert_key">
          <el-upload :headers="{ token }" :action="uploadAction" :limit="1" :on-success="handleKeyUpload" accept=".pem">
            <el-button type="primary">Click to upload</el-button>
            <template #tip>
              <p class="text-red-500">
                {{ form.wxpay.cert_key ? form.wxpay.cert_key : "unConfig" }}
              </p>
              <div class="el-upload__tip">
                例如：apiclient_cert.pem
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
    </FormDrawer>

  </div>
</template>
<script>
export default {
  name: "SetPayment"
}
</script>
<script setup>
import { reactive, ref } from 'vue'
import { getSysConfig, setSysConfig, uploadAction } from '~/api/sysconfig';
import { toast } from '~/composables/util';
import FormDrawer from '~/components/FormDrawer.vue';
import { getToken } from '~/composables/auth'
const token = getToken()
const loading = ref(false)
const activeName = ref("first")
const tableData = ref([
  {
    name: "支付宝支付",
    desc: "该系统支持即时到账接口",
    src: "/alipay.png",
    key: "alipay"
  },
  {
    name: "微信支付",
    desc: "该系统支持微信网页支付和扫码支付",
    src: "/wepay.png",
    key: "wxpay"
  }
])
const form = reactive({
  "close_order_minute": 0, //未支付订单自动关闭时间：分钟，0不自动关闭
  "auto_received_day": 0, //已发货订单自动确认时间：天，0不自动收货
  "after_sale_day": 0, //已完成订单允许申请售后：天
  "alipay": {
    "app_id": "",
    "ali_public_key": "",
    "private_key": ""
  }, //支付宝支付配置 { app_id:"", ali_public_key:"", private_key:""}
  "wxpay": {
    "app_id": "",
    "miniapp_id": "",
    "secret": "",
    "appid": "",
    "mch_id": "",
    "key": "",
    "cert_client": "",
    "cert_key": ""
  } //微信支付配置 { app_id:'', // 公众号 APPID miniapp_id:'', // 小程序 APPID secret:"", // 小程序secret appid:'', // appid mch_id:'', // 商户号 key:'', // API 密钥 cert_client:'', cert_key:'' }
})
function getData() {
  loading.value = true
  getSysConfig().then(res => {
    for (const key in form) {
      form[key] = res[key]
    }
  }).finally(() => {
    loading.value = false
  })
}
getData()
const onSubmit = () => {
  loading.value = true
  setSysConfig(form).then(res => {
    toast("config success")
    getData()
  }).finally(() => {
    loading.value = false
  })
}

const configKey = ref("alipay")
const FormDrawerRef = ref(null)
const handleConfig = (key) => {
  configKey.value = key
  FormDrawerRef.value.open()
}
function handleClientUpload(res) {
  form.wxpay.cert_client = res.data
}
function handleKeyUpload(res) {
  form.wxpay.cert_key = res.data
}
</script>

<style scoped>
.flex-basis {
  flex-basis: 100%;
}
</style>