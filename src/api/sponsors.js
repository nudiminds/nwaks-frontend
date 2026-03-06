import API from "../api/axios"

export const getSponsors = () =>
  API.get("/sponsors")

export const createSponsor = (data) =>
  API.post("/sponsors", data)

export const updateSponsor = (id, data) =>
  API.put(`/sponsors/${id}`, data)

export const deleteSponsor = (id) =>
  API.delete(`/sponsors/${id}`)

export const getSponsorById = (id) =>
  API.get(`/sponsors/${id}`)