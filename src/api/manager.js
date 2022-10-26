import axios from "~/axios";

export function login(username, password) {
  return axios.post("/admin/login", {
    username,
    password,
  });
}

export function getInfo() {
  return axios.post("/admin/getinfo");
}

export function logout() {
  return axios.post("/admin/logout");
}

export function updatePassword(data) {
  return axios.post("/admin/updatepassword", data);
}

export function getManagerList(page = 1, query) {
  let q = [];
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`);
    }
  }
  let str = q.join("&");
  if (str.length > 0) {
    str = "?" + str;
  }
  return axios.get(`/admin/manager/${page}${str}`);
}

export function updateStatus(id, status) {
  return axios.post(`/admin/manager/${id}/update_status`, { status });
}

export function createManger(data) {
  return axios.post(`/admin/manager`, data);
}
export function updateManger(id, data) {
  return axios.post(`/admin/manager/${id}`, data);
}
export function deleteManger(id) {
  return axios.post(`/admin/manager/${id}/delete`);
}
