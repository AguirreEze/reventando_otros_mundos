import * as yup from "yup"

const animeValidation = yup.object().shape({
  name: yup.string().required(),
  cover: yup.string().url().required(),
  studio: yup.string().required(),
  state: yup.string().required(),
  genres: yup.array().required().min(1),
  year: yup.number().required().positive().integer(),
  season: yup.string().required(),
  sinopsis: yup.string().required(),
  episodes: yup.number().positive().integer().nullable(true),
})

export default animeValidation
