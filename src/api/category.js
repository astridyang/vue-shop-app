import axios from '~/axios'

export const getCategoryList = () => {
    return axios.get(`/admin/category`)
}
export const getCategoryGoodsList = (id) => {
    return axios.get(`/admin/app_category_item/list?category_id=${id}`)
}
export function createCategory(data) {
    return axios.post(`/admin/category`, data);
}

export function updateCategory(id, data) {
    return axios.post(`/admin/category/${id}`, data);
}
export function updateCategoryStatus(id, status) {
    return axios.post(`/admin/category/${id}/update_status`, { status });
}

export function deleteCategory(id) {
    return axios.post(`/admin/category/${id}/delete`);
}
export function deleteCategoryGoods(id) {
    return axios.post(`/admin/app_category_item/${id}/delete`);
}

export function connectCategoryGoods(data) {
    return axios.post(`/admin/app_category_item`, data);
}