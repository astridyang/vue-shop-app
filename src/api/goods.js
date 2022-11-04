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
export function restoreGoods(ids) {
  return axios.post(`/admin/goods/restore`, { ids });
}
export function destroyGoods(ids) {
  return axios.post(`/admin/goods/destroy`, { ids });
}
export function readGoods(id) {
  return axios.get(`/admin/goods/read/${id}`);
}
export function setBanners(id, data) {
  return axios.post(`/admin/goods/banners/${id}`, data);
}
export function updateskus(id, data) {
  return axios.post(`/admin/goods/updateskus/${id}`, data);
}
export function createGoodsSkuCard(data) {
  return axios.post(`/admin/goods_skus_card`, data);
}
export function updateskusCard(id, data) {
  return axios.post(`/admin/goods_skus_card/${id}`, data);
}
export function deleteSkuCard(id) {
  return axios.post(`/admin/goods_skus_card/${id}/delete`);
}
export function sortGoodsSkuCard(data) {
  return axios.post(`/admin/goods_skus_card/sort`, data);
}
export function createGoodsSkuCardValue(data) {
  return axios.post(`/admin/goods_skus_card_value`, data);
}
export function updateskusCardValue(id, data) {
  return axios.post(`/admin/goods_skus_card_value/${id}`, data);
}
export function deleteSkuCardValue(id) {
  return axios.post(`/admin/goods_skus_card_value/${id}/delete`);
}
export function setGoodsSkusCard(id, data) {
  return axios.post(`/admin/goods_skus_card/${id}/set`, data);
}