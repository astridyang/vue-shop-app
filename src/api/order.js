import axios from "~/axios";
import { queryFormat } from "~/composables/util";

export function getOrderList(page = 1, query) {
  const str = queryFormat(query);
  return axios.get(`/admin/order/${page}${str}`);
}

export function deleteOrder(ids) {
  return axios.post(`/admin/order/delete_all`, { ids });
}

export function exportOrder(query) {
  const str = queryFormat(query);
  return axios.post(
    `/admin/order/excelexport${str}`,
    {},
    {
      responseType: "blob",
    }
  );
}

export function getShipInfo(id) {
  return axios.get(`/admin/order/${id}/get_ship_info`);
}

export function refundOrder(id, data) {
  return axios.post(`/admin/order/${id}/handle_refund`, data);
}
