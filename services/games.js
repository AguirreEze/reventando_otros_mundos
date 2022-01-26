import axios from "axios"

export const addGame = (data) => {
  const request = axios.post("/api/games", data)
  return request.then((res) => res.data)
}

export const updateGame = (data, id) => {
  const request = axios.put(`/api/games/${id}`, data)
  return request.then((res) => res.data)
}
