import axios from "axios"

export const addGame = (data) => {
  const request = axios.post("/api/games", data)
  return request.then((res) => res.data)
}
