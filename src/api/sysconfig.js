import axios from "~/axios";

export function getSysConfig() {
  return axios.get(`/admin/sysconfig`);
}

export function setSysConfig(data) {
  return axios.post(`/admin/sysconfig`, data);
}
export const uploadAction = "/api/admin/sysconfig/upload"