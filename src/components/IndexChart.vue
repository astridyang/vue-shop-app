<template>
  <el-card shadow="never" class="border-0">
    <template #header>
      <div class="flex justify-between text-sm">
        <span>订单统计</span>
        <div>
          <el-check-tag @click="handleChoose(item.value)" v-for="(item, index) in options" :key="index"
            :checked="current===item.value" style="margin-right: 8px">{{ item.text }}
          </el-check-tag>
        </div>
      </div>
    </template>
    <!-- card body -->
    <div ref="el" id="chart" style="width:100%;height:300px;"></div>
  </el-card>

</template>

<script>
export default {
  name: 'IndexChart'
}
</script>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts';
import { getStatistics3 } from "~/api/index"
import { useResizeObserver } from '@vueuse/core'

const current = ref("week")
const options = [
  {
    text: "Monthly",
    value: "month"
  },
  {
    text: "Weekly",
    value: "week"
  },
  {
    text: "24hour",
    value: "hour"
  }
]
const handleChoose = (type) => {
  current.value = type
  getData()
}
let myChart = null
onMounted(() => {
  var chartDom = document.getElementById('chart');
  if (chartDom) {
    myChart = echarts.init(chartDom);
    getData()
  }
})

onBeforeUnmount(() => {
  if (myChart) echarts.dispose(myChart)
})

function getData() {
  let option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  myChart.showLoading()
  // option && myChart.setOption(option);
  getStatistics3(current.value).then(res => {
    option.xAxis.data = res.x;
    option.series[0].data = res.y;
    myChart.setOption(option);
  }).finally(() => {
    myChart.hideLoading();
  })

}
const el = ref(null)
useResizeObserver(el, (entries) => myChart.resize())

</script>

<style scoped lang='scss'>

</style>