import * as yup from "yup"

const Review = yup.object().shape({
  score: yup.number().required(),
  state: yup.string().required(),
  watched: yup.number().min(0).required(),
  comentary: yup.string().required(),
})

export default Review
