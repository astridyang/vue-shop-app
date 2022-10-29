import axios from "~/axios";

export const getCouponList = (page = 1) => {
  return axios.get(`/admin/coupon/${page}`);
};

export function createCoupon(data) {
  return axios.post(`/admin/coupon`, data);
}

export function updateCoupon(id, data) {
  return axios.post(`/admin/coupon/${id}`, data);
}

export function deleteCoupon(id) {
  return axios.post(`/admin/coupon/${id}/delete`);
}
export function updateCouponStatus(id, status) {
  return axios.post(`/admin/coupon/${id}/update_status`, { status });
}
