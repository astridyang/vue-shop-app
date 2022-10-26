import axios from "~/axios";

export const getNoticeList = (page = 1) => {
  return axios.get(`/admin/notice/${page}`);
};

export function createNotice(data) {
  return axios.post(`/admin/notice`, data);
}

export function updateNotice(id, data) {
  return axios.post(`/admin/notice/${id}`, data);
}

export function deleteNotice(id) {
  return axios.post(`/admin/notice/${id}/delete`);
}
