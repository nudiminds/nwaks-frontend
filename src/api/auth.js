import API from "./axios"

export const loginAdmin = (credentials) =>
    API.post("./auth/login", credentials)