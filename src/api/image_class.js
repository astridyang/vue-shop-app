import axios from '~/axios'

export const getImageClassList = (page) => {
    return axios.get(`/admin/image_class/${page}`)
}

export const createImageClass = (data) => {
    return axios.post(`/admin/image_class`, data)
}

export const updateImageClass = (id, data) => {
    return axios.post(`/admin/image_class/${id}`, data)
}

export const deleteImageClass = (id) => {
    return axios.post(`/admin/image_class/${id}/delete`)
}