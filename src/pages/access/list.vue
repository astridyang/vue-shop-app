<template>
  <el-card shadow="never" class="border-0">
    <ListHeader @refresh="getData" @create="handleCreate" />
    <el-tree :data="tableData" :props="{ children: 'child', label: 'name' }" node-key="id" v-loading="loading"
      :default-expanded-keys="defaultExpandedKeys">
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <el-tag :type="data.menu ? '' : 'info'" size="small" class="mr-2">{{ data.menu ? 'Menu' : 'Rule' }}</el-tag>
          <el-icon v-if="data.icon">
            <component :is="data.icon" />
          </el-icon>
          <span class="ml-2">{{ data.name }}</span>
          <div class="ml-auto">
            <el-switch :model-value="data.status" :active-value="1" :inactive-value="0">
            </el-switch>
            <el-button type="primary" size="small" text @click="handleEdit(data)">Update</el-button>
            <el-button type="primary" size="small" text>Add</el-button>
            <el-button type="primary" size="small" text>Delete</el-button>
          </div>
        </div>
      </template>
    </el-tree>
    <form-drawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="120px" :inline="false">
        <el-form-item label="Parent Menu" prop="rule_id">
          <el-cascader v-model="form.rule_id" :options="options"
            :props="{ value: 'id', children: 'child', label: 'name', checkStrictly: true, emitPath: false }" clearable
            placeholder="Please select parent menu" />
        </el-form-item>
        <el-form-item label="Menu or Rule" prop="menu">
          <el-radio-group v-model="form.menu" class="ml-4">
            <el-radio :label="1">Menu</el-radio>
            <el-radio :label="0">Rule</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="Back Condition" prop="condition" v-if="form.menu === 0">
          <el-input v-model="form.condition"  style="width:50%;"></el-input>
        </el-form-item>
        <el-form-item label="Method" prop="method" v-if="form.menu === 0">
          <el-select v-model="form.method">
            <el-option v-for="item in ['GET', 'POST', 'PUT', 'DELETE']" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Order" prop="order">
          <el-input-number v-model="form.order" :min="0" :max="100" />
        </el-form-item>
        <el-form-item label="Icon" prop="icon" v-if="form.menu === 1">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="FrontPath" prop="frontpath" v-if="form.menu === 1 && form.rule_id > 0">
          <el-input v-model="form.frontpath"></el-input>
        </el-form-item>
      </el-form>
    </form-drawer>
  </el-card>

</template>

<script>
export default {
  name: 'AccessList'
}
</script>
<script setup>
import { ref } from 'vue';
import ListHeader from '~/components/ListHeader.vue';
import FormDrawer from '~/components/FormDrawer.vue';
import { useInitTable, useInitForm } from '~/composables/useCommon';
import { createRule, updateRule } from '~/api/rule';
import { getRuleList } from '~/api/rule'
const tableData = ref([])
const defaultExpandedKeys = ref([])
const options = ref([])
const { loading, getData, currentPage } = useInitTable({
  getList: getRuleList,
  onGetListSuccess(res) {
    console.log(res);
    options.value = res.rules;
    tableData.value = res.list
    defaultExpandedKeys.value = res.list.map(item => item.id)
  }
})
const { formDrawerRef,
  formRef,
  form,
  rules,
  handleCreate,
  drawerTitle,
  handleEdit,
  handleSubmit,
  handleDelete
} = useInitForm({
  form: {
    rule_id: 0,
    menu: 0,
    name: "",
    condition: "",
    method: 'GET',
    status: 1,
    order: 0,
    icon: "",
    frontpath: ""
  },
  rules: {
  },
  getData,
  currentPage,
  update: updateRule,
  create: createRule,
})
</script>

<style scoped>
:deep(.el-tree-node__label) {
  flex: 1;
}

.custom-tree-node {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}

:deep(.el-tree-node__content) {
  padding: 20px 0;
}
</style>