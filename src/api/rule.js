import axios from "~/axios";

export function getRuleList(){
  return axios.get(`/admin/rule/1`)
}

export function createRule(data) {
  return axios.post(`/admin/rule`, data);
}

export function updateRule(id, data) {
  return axios.post(`/admin/rule/${id}`, data);
}
