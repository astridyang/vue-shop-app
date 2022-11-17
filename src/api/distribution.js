import axios from "~/axios";
import { queryFormat } from "~/composables/util";

export function getAgentList(page = 1, query) {
  const str = queryFormat(query);
  return axios.get(`/admin/agent/${page}${str}`);
}
export function getAgentOrderList(page = 1, query) {
  const str = queryFormat(query);
  return axios.get(`/admin/user_bill/${page}${str}`);
}
export function getAgentStatistics() {
  return axios.get(`/admin/agent/statistics`);
}
export function getConfig() {
  return axios.get(`/admin/distribution_setting/get`);
}

export function setConfig(data) {
  return axios.post(`/admin/distribution_setting/set`, data);
}