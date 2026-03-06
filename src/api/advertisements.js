import API from "./axios"

export const getAdvertisements = () =>
  API.get("/advertisements")

export const getAllAdvertisements = () =>
  API.get("/advertisements/admin")

export const createAdvertisement = (data) =>
  API.post("/advertisements", data)

export const updateAdvertisement = (id, data) =>
  API.put(`/advertisements/${id}`, data)

export const deleteAdvertisement = (id) =>
  API.delete(`/advertisements/${id}`)

export const getAdvertisementById = (id) =>
  API.get(`/advertisements/${id}`)