import axios from "~/axios";

export function getSysConfig() {
  return axios.get(`/admin/sysconfig`);
}

export function setSysConfig(data) {
  return axios.post(`/admin/sysconfig`, data);
}
export const uploadAction = import.meta.env.VITE_APP_BASE_API + "/admin/sysconfig/upload"