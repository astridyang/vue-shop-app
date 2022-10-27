import { computed,reactive, ref } from "vue";
import { toast } from '~/composables/util';
import {deleteSkus} from "~/api/skus";


export const useInitTable = (opt = {}) => {
  let searchForm = null;
  let resetSearchForm = null;
  if (opt.searchForm) {
    searchForm = reactive({ ...opt.searchForm });
    resetSearchForm = () => {
      for (const key in searchForm) {
        searchForm[key] = opt.searchForm[key];
      }
      getData();
    };
  }

  const tableData = ref([]);
  const loading = ref(false);
  const currentPage = ref(1);
  const total = ref(0);
  const limit = ref(10);
  function getData(p = null) {
    if (typeof p === "number") {
      currentPage.value = p;
    }
    loading.value = true;
    opt
      .getList(currentPage.value, searchForm)
      .then((res) => {
        if (
          opt.onGetListSuccess &&
          typeof opt.onGetListSuccess === "function"
        ) {
          opt.onGetListSuccess(res);
        } else {
          total.value = res.totalCount;
          tableData.value = res.list;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
  getData();
  function handleDelete(id) {
    loading.value = true
    opt.delete(id).then(res => {
      toast("delete success")
      getData()
    }).finally(() => {
      loading.value = false
    })
  }
  
  function handleUpdateStatus(status, row) {
    row.statusLoading = true
    opt.updateStatus(row.id, status).then(res => {
      row.status = status
    }).finally(() => {
      row.statusLoading = false
    })
  }
  const tableRef = ref(null)
  const selectIds = ref([])

  function handleMultiDelete() {
    loading.value = true
    opt.delete(selectIds.value).then(res => {
      toast("delete success")
      if (tableRef.value) {
        tableRef.value.clearSelection()
      }
      getData()
    }).finally(() => {
      loading.value = false
    })
  }

  function handleSelectionChange(e) {
    selectIds.value = e.map(o => o.id);
  }
  return {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,
    handleUpdateStatus,
    tableRef,
    handleSelectionChange,
    handleMultiDelete
  };
};

export function useInitForm(opt = {}) {
  const formDrawerRef = ref(null);
  const formRef = ref(null);
  const defaultForm = opt.form
  const form = reactive({});

  const rules = opt.rules || {};
  function resetForm(row) {
    if (formRef.value) formRef.value.clearValidate();
    for (let key in row) {
      form[key] = row[key];
    }
  }
  function handleCreate() {
    resetForm(defaultForm);
    formDrawerRef.value.open();
  }

  const editId = ref(0);
  const drawerTitle = computed(() =>
    editId.value ? "Update " : "Create "
  );
  function handleEdit(row) {
    editId.value = row.id;
    resetForm(row);
    formDrawerRef.value.open();
  }
  function handleSubmit() {
    formRef.value.validate((valid) => {
      if (!valid) return;
      formDrawerRef.value.showLoading();
      const fun = editId.value
        ? opt.update(editId.value, form)
        : opt.create(form);
      fun
        .then((res) => {
          toast(drawerTitle.value + " success.");
          formDrawerRef.value.close();
          opt.getData(editId.value ? opt.currentPage.value : 1);
        })
        .finally(() => {
          formDrawerRef.value.hideLoading();
        });
    });
  }
  return {
    formDrawerRef,
    formRef,
    form,
    rules,
    resetForm,
    handleCreate,
    drawerTitle,
    handleEdit,
    handleSubmit,
  };
}
