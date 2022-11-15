import axios from "~/axios";
import {queryFormat} from "~/composables/util"

export function getCommentList(page = 1, query) {
  const str = queryFormat(query);
  return axios.get(`/admin/goods_comment/${page}${str}`);
}

export function updateStatus(id, status) {
  return axios.post(`/admin/goods_comment/${id}/update_status`, { status });
}


export function reviewComment(id, data) {
  return axios.post(`/admin/goods_comment/review/${id}`, { data });
}