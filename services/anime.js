import axios from "axios"

export const addAnime = (data) => {
  return axios.post("api/animes", data).then((res) => res.data)
}

export const updateAnime = (data, id) => {
  return axios.put(`../../api/animes/${id}`, data)
}

export const deleteAnime = (id) => {
  return axios.delete(`../../api/animes/${id}`)
}
