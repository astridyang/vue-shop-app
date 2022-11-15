import axios from "~/axios";
import {queryFormat} from "~/composables/util"

export function getUserList(page = 1, query) {
  const str = queryFormat(query);
  return axios.get(`/admin/user/${page}${str}`);
}

export function updateStatus(id, status) {
  return axios.post(`/admin/user/${id}/update_status`, { status });
}

export function createUser(data) {
  return axios.post(`/admin/user`, data);
}
export function updateUser(id, data) {
  return axios.post(`/admin/user/${id}`, data);
}
export function deleteUser(id) {
  return axios.post(`/admin/user/${id}/delete`);
}
