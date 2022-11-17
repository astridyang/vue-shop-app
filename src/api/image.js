import axios from "~/axios";

export const getImageList = (id, page = 1) => {
  return axios.get(`/admin/image_class/${id}/image/${page}`);
};

export const updateImage = (id, name) => {
  return axios.post(`/admin/image/${id}`, { name });
};

export const deleleImages = (ids) => {
  return axios.post("/admin/image/delete_all", { ids });
};

export const uploadAction = import.meta.env.VITE_APP_BASE_API + "/admin/image/upload"