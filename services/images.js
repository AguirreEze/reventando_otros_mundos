import axios from "axios"

export const uploadImage = (file) => {
  return axios.post("api/images", { data: file }).then((res) => res.data.url)
}
