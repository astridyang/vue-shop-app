<template>
  <el-drawer :title="drawerTitle" v-model="drawerVisible" size="70%">
    <el-form :model="searchForm" size="small">
      <el-form-item label="Time Span">
        <el-radio-group v-model="searchForm.type">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="today">今天</el-radio-button>
          <el-radio-button label="yesterday">昨天</el-radio-button>
          <el-radio-button label="last7days">最近7天</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Start Time">
        <el-date-picker v-model="searchForm.starttime" type="date" placeholder="Pick a day" value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="End Time">
        <el-date-picker v-model="searchForm.endtime" type="date" placeholder="Pick a day" value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="Level">
        <el-radio-group v-model="searchForm.level">
          <el-radio-button :label="0">全部</el-radio-button>
          <el-radio-button :label="1">一级推广</el-radio-button>
          <el-radio-button :label="2">二级推广</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">Search</el-button>
        <el-button @click="resetSearchForm">Reset</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <template v-if="type === 'user'">
        <el-table-column label="UID" prop="id" width="70" />
        <el-table-column label="Avatar" width="80">
          <template #default="{ row }">
            <el-avatar :size="40" :src="row.avatar">
              <img :src="row.avatar" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="Level">
          <template #default="{ row }">
            <p>{{ row.username }}</p>
          </template>
        </el-table-column>
        <el-table-column label="推广用户数量" prop="share_num" align="center" />
        <el-table-column label="订单数量" prop="share_order_num" align="center" />
        <el-table-column label="订单金额" prop="order_price" align="center" />
        <el-table-column label="绑定时间" prop="create_time" align="center" />
      </template>
      <template v-else>
        <el-table-column label="Order No.">
          <template #default="{ row }">
            <p>{{ row.order.no }}</p>
          </template>
        </el-table-column>
        <el-table-column label="username|nickname|phone">
          <template #default="{ row }">
            <div v-if="!row.order.user">
              This user has been deleted.
            </div>
            <div v-else>
              {{ row.order.user.username }}|{{ row.order.user.nickname }}|{{ row.order.user.phone }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="create_time" align="center" />
        <el-table-column label="返佣金额" prop="commission" align="center" />
      </template>
    </el-table>

    <div class="flex items-center justify-center mt-5">
      <el-pagination @current-change="getData" :current-page="currentPage" :page-size="limit" layout=" prev,pager, next"
        background :total="total">
      </el-pagination>
    </div>
  </el-drawer>

</template>

<script>
export default {
  name: 'dataDrawer'
}
</script>
<script setup>
import { computed, ref } from 'vue';
import { getAgentList, getAgentOrderList } from '~/api/distribution';
import { useInitTable } from '~/composables/useCommon'

const props = defineProps({
  type: {
    type: String,
    default: "user"
  },
})

const { searchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
} = useInitTable({
  searchForm: {
    type: "all",
    starttime: "",
    endtime: "",
    level: 0,
    user_id: ""
  },
  getList: (() => {
    return props.type === 'order' ? getAgentOrderList : getAgentList
  })(),
})
const drawerTitle = computed(() => props.type === 'user' ? "推广人列表" : "推广人订单列表")
const resetSearchForm = () => {
  searchForm.type = "all"
  searchForm.starttime = ""
  searchForm.endtime = ""
  searchForm.level = 0
  getData()
}
const drawerVisible = ref(false)
const open = (id) => {
  drawerVisible.value = true
  searchForm.user_id = id;
  getData()
}
defineExpose({
  open
})
</script>

<style scoped lang='scss'>

</style>