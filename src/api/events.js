import API from "./axios"

export const getUpcomingEvents = () =>
  API.get("/events/upcoming")

export const getPastEvents = () =>
  API.get("/events/past")