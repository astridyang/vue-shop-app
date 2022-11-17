<template>
  <div>
    <panel />
    <el-card shadow="never">
      <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
        <SearchItem label="Time Span">
          <el-radio-group v-model="searchForm.type">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="today">今天</el-radio-button>
            <el-radio-button label="yesterday">昨天</el-radio-button>
            <el-radio-button label="last7days">最近7天</el-radio-button>
          </el-radio-group>
        </SearchItem>
        <template #show>
          <SearchItem label="Start Time">
            <el-date-picker v-model="searchForm.starttime" type="date" placeholder="Pick a day"
              value-format="YYYY-MM-DD" />
          </SearchItem>
          <SearchItem label="End Time">
            <el-date-picker v-model="searchForm.endtime" type="date" placeholder="Pick a day"
              value-format="YYYY-MM-DD" />
          </SearchItem>
          <SearchItem label="Keyword">
            <el-input v-model="searchForm.keyword" clearable class="w-[150px]" placeholder="keyword">
            </el-input>
          </SearchItem>
        </template>
      </Search>

      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="ID" prop="id" width="70" />
        <el-table-column label="Avatar" width="80">
          <template #default="{ row }">
            <el-avatar :size="40" :src="row.avatar">
              <img :src="row.avatar" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="Level">
          <template #default="{ row }">
            <p>用户：{{ row.username }}</p>
            <p>昵称：{{ row.nickname }}</p>
            <p>姓名：{{ row.user_info.name }}</p>
            <p>电话：{{ row.phone }}</p>
          </template>
        </el-table-column>
        <el-table-column label="推广用户数量" prop="share_num" align="center" />
        <el-table-column label="订单数量" prop="share_order_num" align="center" />
        <el-table-column label="订单金额" prop="order_price" align="center" />
        <el-table-column label="账户佣金" prop="commission" align="center" />
        <el-table-column label="已提现金额" prop="cash_out_price" align="center" />
        <el-table-column label="提现次数" prop="cash_out_time" align="center" />
        <el-table-column label="未体现金额" prop="no_cash_out_price" align="center" />
        <el-table-column label="Operations" fixed="right" width="180">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="openDataDrawer(row.id, 'user')" text>推广人</el-button>
            <el-button size="small" type="primary" @click="openDataDrawer(row.id, 'order')" text>推广订单</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex items-center justify-center mt-5">
        <el-pagination @current-change="getData" :current-page="currentPage" :page-size="limit"
          layout=" prev,pager, next" background :total="total">
        </el-pagination>
      </div>

    </el-card>
    <dataDrawer ref="dataDrawerRef" />
    <dataDrawer ref="orderDataDrawerRef" type="order" />
  </div>
</template>

<script>
export default {
  name: 'Distribution'
}
</script>
<script setup>
import panel from './panel.vue';
import { ref } from 'vue';
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';
import { getAgentList } from '~/api/distribution';
import { useInitTable } from '~/composables/useCommon'
import dataDrawer from './dataDrawer.vue'
const { searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
} = useInitTable({
  searchForm: {
    keyword: "",
    type: "all",
    starttime: "",
    endtime: ""
  },
  getList: getAgentList,
})
const dataDrawerRef = ref(null)
const orderDataDrawerRef = ref(null)
const openDataDrawer = (id, type) => {
  (type === 'order' ? orderDataDrawerRef : dataDrawerRef).value.open(id)
}
</script>

<style scoped lang='scss'>

</style>