import axios from "axios"

export const addAnime = (data) => {
  return axios.post("api/animes", data).then((res) => res.data)
}
