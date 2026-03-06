import API from "../api/axios"

export const getMedia = () =>
  API.get("/media")

export const getMediaById = (id) =>
  API.get(`/media/${id}`)

export const createMedia = (data) =>
  API.post("/media", data)

export const updateMedia = (id, data) =>
  API.put(`/media/${id}`, data)

export const deleteMedia = (id) =>
  API.delete(`/media/${id}`)