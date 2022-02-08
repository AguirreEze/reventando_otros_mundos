import * as yup from "yup"

const gameValidation = yup.object().shape({
  name: yup.string().required(),
  completed: yup.string().required(),
  studio: yup.string().required(),
  gameYear: yup.number().required().positive().integer(),
  steamLink: yup.string().url(),
})

export default gameValidation
