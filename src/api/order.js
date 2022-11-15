import axios from "~/axios";
import { queryFormat } from "~/composables/util";

export function getOrderList(page = 1, query) {
  const str = queryFormat(query);
  return axios.get(`/admin/order/${page}${str}`);
}

export function deleteOrder(ids) {
  return axios.post(`/admin/order/delete_all`, { ids });
}
