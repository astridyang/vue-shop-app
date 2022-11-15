<template>
  <el-card shadow="never">
    <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
      <SearchItem label="Username">
        <el-input v-model="searchForm.keyword" clearable class="w-[150px]"></el-input>
      </SearchItem>
    </Search>


    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" default-expand-all>
      <el-table-column type="expand">
        <template #default="{ row }">
          <div class="flex pl-18">
            <el-avatar class="mr-3" shape="circle" :src="row.user.avatar" style="width:60px;height:60px;" fit="fill">
            </el-avatar>
            <div class="flex-1">
              <h6 class="flex">
                {{ row.user.nickname || row.user.username }}
                <small class="text-gray-400 ml-2">{{ row.review_time }}</small>
                <el-button size="small" class="ml-auto" v-if="!row.showEdit && !row.extra">Reply</el-button>
              </h6>
              <p>
                {{ row.review.data }}
              </p>
              <p>
                <el-image v-for="(item, index) in row.review.image" style="width:50px;height:50px;" :key="index"
                  :src="item" fit="fill" :lazy="true"></el-image>
              </p>
              <div v-if="row.showEdit">
                <el-input v-model="textarea" placeholder="input your comment" type="textarea"></el-input>
                <div class="py-2">
                  <el-button type="primary" size="small" @click="handleReview(row)">Confirm</el-button>
                  <el-button type="primary" size="small" @click="row.showEdit = false" class="ml-2">Cancel</el-button>
                </div>
              </div>
              <template v-else>
                <div class="mt-3 bg-gray-100 p-3 rounded" v-for="(item, index) in row.extra" :key="index">
                  <h6 class="font-bold flex">客服 <el-button type="info" size="small" class="ml-auto"
                      @click="openTextarea(row, item.data)">修改</el-button>
                  </h6>
                  {{ item.data }}
                </div>
              </template>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" width="70" />
      <el-table-column label="Comment" width="250">
        <template #default="{ row }">
          <div class="flex items-center">
            <el-image :src="row.goods_item ? row.goods_item.cover : ''" class="rounded" style="width:80px;height:80px;"
              fit="fill" :lazy="true" />

            <div class="ml-3">
              <p>{{ row.goods_item?.title ?? "Goods has been deleted" }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Rating" align="center" width="200">
        <template #default="{ row }">
          <el-rate v-model="row.rating" disabled show-score text-color="#ff9900" />
        </template>
      </el-table-column>
      <el-table-column label="Comment Time" prop="review_time" width="200" />
      <el-table-column label="Status">
        <template #default="{ row }">
          <el-switch :modelValue="row.status" :disabled="row.super === 1" :loading="row.statusLoading" :active-value="1"
            :inactive-value="0" @change="handleUpdateStatus($event, row)" />
        </template>
      </el-table-column>

    </el-table>

    <div class="flex items-center justify-center mt-5">
      <el-pagination @current-change="getData" :current-page="currentPage" :page-size="limit" layout=" prev,pager, next"
        background :total="total">
      </el-pagination>
    </div>


  </el-card>

</template>

<script>
export default {
  name: 'CommentList'
}
</script>
<script setup>
import { ref } from 'vue';
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';
import { getCommentList, updateStatus, reviewComment } from '~/api/comment';
import { useInitTable } from '~/composables/useCommon'
import { toast } from '~/composables/util';
const roles = ref([])
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
    keyword: ""
  },
  getList: getCommentList,
  onGetListSuccess(res) {
    total.value = res.totalCount;
    tableData.value = res.list.map((item) => {
      item.statusLoading = false;
      item.showEdit = false;
      return item;
    });
  }
})

const textarea = ref("")
const openTextarea = (row, data = "") => {
  textarea.value = data
  row.showEdit = true
}
const handleReview = (row) => {
  reviewComment(row.id, textarea.value).then(res => {
    toast("reviewed success")
    row.showEdit = false
    getData()
  })
}

</script>

<style scoped lang='scss'>

</style>