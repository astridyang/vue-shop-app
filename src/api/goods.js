import axios from "~/axios";
import { queryFormat } from "~/composables/util";

export function getGoodsList(page = 1, query) {
  const str = queryFormat(query);
  return axios.get(`/admin/goods/${page}${str}`);
}

export function updateStatus(ids, status) {
  return axios.post(`/admin/goods/changestatus`, { ids, status });
}

export function createGoods(data) {
  return axios.post(`/admin/goods`, data);
}
export function updateGoods(id, data) {
  //admin/goods/:id
  return axios.post(`/admin/goods/${id}`, data);
}
export function deleteGoods(ids) {
  return axios.post(`/admin/goods/delete_all`, { ids });
}
export function readGoods(id) {
  return axios.get(`/admin/goods/read/${id}`);
}
export function setBanners(id, data) {
  return axios.post(`/admin/goods/banners/${id}`, data);
}
